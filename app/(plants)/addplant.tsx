import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import CustomBackButton from '../../components/CustomBackButton'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view'
import { useFonts } from 'expo-font'
import axios, { AxiosResponse } from 'axios'
import { config } from '../api/config'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useUserContext } from '../contexts/userContext'
import { IAvailablePlant, SigninType, UserPlantType } from '../types'
import AvailablePlant from '../../components/AvailablePlant'
import { GestureHandlerRootView, RefreshControl, ScrollView } from 'react-native-gesture-handler'
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView, BottomSheetTextInput, BottomSheetView, useBottomSheetInternal } from '@gorhom/bottom-sheet'
import AuthTextBox from '../../components/AuthTextBox'
import CustomButton from '../../components/CustomButton'
import { TextField } from 'react-native-ui-lib';
import { runOnUI } from 'react-native-reanimated';
import BottomSheetInput from '../../components/BottomSheetInput';
import { Controller, useForm } from 'react-hook-form';
import Toast from 'react-native-toast-message';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons'
import api from '../api/api'

const AddPlant = () => {
    const [fontsLoaded] = useFonts({
        'Nunito-VariableFont_wght': require('../../assets/fonts/Nunito-VariableFont_wght.ttf')
        // 'SpaceMono-Regular': require('@/assets/fonts/SpaceMono-Regular.ttf')
    });
    
    const [availablePlants, setAvailablePlants] = useState<IAvailablePlant[]>([]);

    const { user } = useUserContext();

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const snapPoints = useMemo(() => ["60%"], []);

    const renderBackdrop = useCallback(
    (props) => (
        <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1} // Hides when sheet is closed
            appearsOnIndex={0} // Shows when sheet is opened
            opacity={0.7} // Adjust dim effect
        />
        ), []);
    
    const [selectedPlant, setSelectedPlant] = useState<IAvailablePlant>(null);

    const { handleSubmit, control, reset, formState: { errors, isDirty, isValid } } = useForm<UserPlantType>({
        defaultValues: {
            plantid: '',
            humidity: Number(''),
            light_exposure: Number(''),
            season: '',
            placement: '',
            username: ''
        },
        mode: "onChange"
    });

    const onSubmit = (async (data: UserPlantType) => {
        AsyncStorage.getItem('Authorization')
            .then((auth) => {
                axios.post(`${config.backendURL}/api/plants/addPlant`, data, {
                    headers: {
                        Authorization: auth
                    }
                })
                    .then((res: AxiosResponse) => {
                        Toast.show({
                            type: 'success',
                            text1: `Added ${selectedPlant.name} to your garden successfully!`,
                            visibilityTime: 1000,
                            onHide: async () => {
                                axios.get(`${config.backendURL}/api/plants/getUserPlants`, {
                                    headers: {
                                        Authorization: await AsyncStorage.getItem('Authorization')
                                    },
                                    params: {
                                        username: user.username
                                    }
                                }).then((res: AxiosResponse) => {
                                    user.plants = res.data.data[0].plants;
                                    router.navigate('/(tabs)/plants');
                                });
                            }
                        });
                    }).catch((error) => {
                        Toast.show({
                            type: 'error',
                            text1: `Adding ${selectedPlant.name} to your garden failed!`,
                            text2: error
                        });
                    });
            });
    });

    const onChange = ((arg) => {
        return {
            value: arg.nativeEvent.text,
        }
    });

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            axios.get(`${config.backendURL}/api/plants/getAvailablePlants`, {
                headers: {
                    Authorization: await AsyncStorage.getItem('Authorization')
                },
                params: {
                    username: user.username
                }
            }).then((res: AxiosResponse) => {
                setAvailablePlants(res.data);
                Toast.show({
                    type: 'success',
                    text1: 'Refreshed available plants successfully!',
                });
                setRefreshing(false);
            });
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Failed to refresh available plants',
                text2: error
            });
        }
    };

    useEffect(() => {
        api.get(`/api/plants/getAvailablePlants`, {
            params: {
                username: user.username
            }
        })
        .then((res: AxiosResponse) => {
            setAvailablePlants(res.data);
        });
    }, []);

    return (
        <SafeAreaView style={styles.addViewWrapper} edges={['top']}>
            <GestureHandlerRootView>
                <BottomSheetModalProvider>
                    <ScrollView refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
                    }>
                        <View style={styles.addHeader}>
                            <CustomBackButton onPress={() => router.back()} />
                            <Text style={styles.addHeaderText}>Add Plant</Text>
                        </View>
                        <View style={styles.addPlantView}>
                            {
                                availablePlants.length === 0 ? (
                                    <Text style={{color: 'white'}}>You've added all the available plants 😊</Text>
                                ) : (
                                    availablePlants.map((avPlant) => {
                                        return (
                                            <AvailablePlant plant={avPlant} key={avPlant.id} onPress={() => {
                                                bottomSheetModalRef.current?.present();
                                                setSelectedPlant(avPlant);
                                                reset({ plantid: avPlant.id, humidity: avPlant.default_humidity, light_exposure: avPlant.default_light_exposure, season: avPlant.default_season, placement: avPlant.default_placement, username: user.username });
                                            }}/>
                                        )
                                    })  
                                )
                            }
                        </View>
                        <BottomSheetModal ref={bottomSheetModalRef} index={1} backgroundStyle={styles.detailsView} backdropComponent={renderBackdrop}  handleIndicatorStyle={styles.detailsHandle} snapPoints={snapPoints}>
                            <BottomSheetView>
                                <BottomSheetScrollView>
                                    <View style={styles.detailsHeader}>
                                        <Text style={styles.detailsHeaderText}>Add {selectedPlant?.name}</Text>
                                        <TouchableOpacity>
                                            <FontAwesomeIcon icon={faCircleQuestion} color='white' size={24} style={styles.detailsHeaderInfo}/>
                                        </TouchableOpacity>
                                    </View>
                                    <Controller rules={{ required: true }} control={control} render={({ field: { onChange, value } }) => {
                                        return <BottomSheetInput bottomSheetRef={bottomSheetModalRef} placeholder='Humidity' defaultValue={String(selectedPlant?.default_humidity)} onChangeData={(value) => onChange(value)} value={String(value)}/>
                                    }} name='humidity' />
                                    <Controller rules={{ required: true }} control={control} render={({ field: { onChange, value } }) => {
                                        return <BottomSheetInput bottomSheetRef={bottomSheetModalRef} placeholder='Light Exposure' defaultValue={String(selectedPlant?.default_light_exposure)} onChangeData={(value) => onChange(value)} value={String(value)}/>
                                    }} name='light_exposure' />
                                    <Controller rules={{ required: true }} control={control} render={({ field: { onChange, value } }) => {
                                        return <BottomSheetInput bottomSheetRef={bottomSheetModalRef} placeholder='Season' defaultValue={String(selectedPlant?.default_season)} onChangeData={(value) => onChange(value)} value={String(value)}/>
                                    }} name='season' />
                                    <Controller rules={{ required: true }} control={control} render={({ field: { onChange, value } }) => {
                                        return <BottomSheetInput bottomSheetRef={bottomSheetModalRef} placeholder='Placement' defaultValue={String(selectedPlant?.default_placement)} onChangeData={(value) => onChange(value)} value={String(value)}/>
                                    }} name='placement' />
                                    <CustomButton text='Add Plant To Garden' style={styles.addPlantButton} onPress={handleSubmit(onSubmit)}/>
                                </BottomSheetScrollView>
                            </BottomSheetView>
                        </BottomSheetModal>
                    </ScrollView>
                </BottomSheetModalProvider>
            </GestureHandlerRootView>
            <Toast/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    addViewWrapper: {
        height: '100%'
    },
    addHeader: {
        flex: 1,
        flexDirection: 'row',
        margin: 20,
        alignItems: 'center',
    },
    addHeaderText: {
        color: 'white',
        fontFamily: 'Nunito',
        fontWeight: '700',
        fontSize: 30,
        marginLeft: 15,
    },
    addPlantView: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    detailsView: {
        backgroundColor: '#121212',
        // color: 'white'
        // backgroundColor: '#4e4e4ece3'
    },
    detailsHeader: {
        marginLeft: 15,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    detailsHeaderText: {
        color: 'white',
        fontFamily: 'Nunito',
        fontWeight: '700',
        fontSize: 30,
    },
    detailsHeaderInfo: {
        marginRight: 20,
    },
    detailsHandle: {
        backgroundColor: '#918f8f',
        // width: '50%'
    },
    addPlantButton: {
        backgroundColor: '#96d36f',
        padding: 15,
        borderRadius: 15,
        flex: 1,
        justifyContent: 'center',
        width: '50%',
        margin: 'auto',
        fontSize: 10
        // textAlign: 'center'
        // height: '50%'
    },
    plantSpecTextField: {

    }
})

export default AddPlant
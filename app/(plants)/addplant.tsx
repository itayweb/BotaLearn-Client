import { View, Text, StyleSheet, TouchableOpacity, Platform, StatusBar } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import CustomBackButton from '../../components/CustomBackButton'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFonts } from 'expo-font'
import  { AxiosResponse } from 'axios'
import { config } from '../api/config'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useUserContext } from '../contexts/userContext'
import { IAvailablePlant, UserPlantType } from '../types'
import AvailablePlant from '../../components/AvailablePlant'
import { GestureHandlerRootView, NativeViewGestureHandler, RefreshControl, ScrollView } from 'react-native-gesture-handler'
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView, BottomSheetView, TouchableWithoutFeedback } from '@gorhom/bottom-sheet'
import CustomButton from '../../components/CustomButton'
import { useForm } from 'react-hook-form';
import Toast from 'react-native-toast-message';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons'
import api from '../api/api'
import { faBookOpen, faGripVertical, faList } from '@fortawesome/free-solid-svg-icons'
import { LatLng, LeafletView, MapMarker } from 'react-native-leaflet-view'
import { Callout, Camera, MapView, PointAnnotation } from '@maplibre/maplibre-react-native'
import Tooltip from 'react-native-walkthrough-tooltip';

const AddPlant = () => {
    const [fontsLoaded] = useFonts({
        'Nunito-VariableFont_wght': require('../../assets/fonts/Nunito-VariableFont_wght.ttf')
        // 'SpaceMono-Regular': require('@/assets/fonts/SpaceMono-Regular.ttf')
    });

    const [isListMode, setIsListMode] = useState(false);
    const [isGridMode, setIsGridMode] = useState(true);

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

    const { handleSubmit, reset, setValue } = useForm<UserPlantType>({
        defaultValues: {
            plant_id: '',
            planting_position: {}
        },
        mode: "onChange"
    });

    const onSubmit = (async (data: UserPlantType) => {
        AsyncStorage.getItem('Authorization')
            .then((auth) => {
                api.post('/api/plants/addPlant', data, {
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
                                api.get(`${config.backendURL}/api/plants/getUserPlants`, {
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

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            api.get(`${config.backendURL}/api/plants/getAvailablePlants`, {
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

    const DEFAULT_COORDINATE: LatLng = {
        lat: 32.109333,
        lng: 34.855499,
    };

    const [markers, setMarkers] = useState<MapMarker[]>([]);
    
    const handleMapClick = (event: any) => {
        if (event.event === "onMapClicked") {
            const { lat, lng } = event.payload.touchLatLng;

            // Create a new marker at the clicked location
            const newMarker: MapMarker = {
                id: `marker-${lat}-${lng}`,
                position: { lat, lng },
                icon: "📍", // You can use an image URL instead
                iconAnchor: [5,20]
            };

            setMarkers([newMarker]); // Replace existing markers or use [...markers, newMarker] to keep previous ones
            setValue("planting_position", newMarker.position);
        }
    };

    const [marker, setMarker] = useState<{lat: number; lng: number} | null>({lat: 32.109333, lng: 34.855499});
    
    const onMapPress = (event: any) => {
        console.log(event);
        const {geometry} = event;
        setMarker({lat: geometry.coordinates[1], lng: geometry.coordinates[0]});
        setValue("planting_position", {lat: geometry.coordinates[0], lng: geometry.coordinates[1]});
    }

    const [toolTipVisible, setToolTipVisible] = useState(false);

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
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }>
                        <View style={styles.addHeader}>
                            <CustomBackButton onPress={() => router.back()} />
                            <Text style={styles.addHeaderText}>Add Plant</Text>
                            <View style={styles.plantsViewDisplayModes}>
                                <TouchableOpacity onPress={() => {
                                    setIsGridMode(true);
                                    setIsListMode(false);
                                }}>
                                    <FontAwesomeIcon icon={faGripVertical} color={isGridMode ? '#96d36f' : 'white'} size={24} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    setIsGridMode(false);
                                    setIsListMode(true);
                                }}>
                                    <FontAwesomeIcon icon={faList} color={isListMode ? '#96d36f' : 'white'} size={24} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[styles.addPlantView, isGridMode ? {
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            padding: 10,
                            gap: 5
                        } : {}]}>
                            {
                                availablePlants.length === 0 ? (
                                    <Text style={{ color: 'white' }}>You've added all the available plants 😊</Text>
                                ) : (
                                    availablePlants.map((avPlant) => {
                                        return (
                                            <AvailablePlant plant={avPlant} key={avPlant.pid} onPress={() => {
                                                bottomSheetModalRef.current?.present();
                                                setSelectedPlant(avPlant);
                                                reset({ plant_id: avPlant.pid, planting_position: markers.length ? markers[0].position : {}});
                                            }} displayMode={isListMode ? 'list' : 'grid'} />
                                        )
                                    })
                                )
                            }
                        </View>
                        <BottomSheetModal ref={bottomSheetModalRef} index={1} backgroundStyle={styles.detailsView} backdropComponent={renderBackdrop} handleIndicatorStyle={styles.detailsHandle} snapPoints={snapPoints}>
                            <BottomSheetView>
                                <BottomSheetScrollView style={{
                                    height: '100%'
                                }}>
                                    <View style={styles.detailsHeader}>
                                        <Text style={styles.detailsHeaderText}>Add {selectedPlant?.name}</Text>
                                        <TouchableOpacity style={{
                                            borderStyle: 'solid',
                                            borderWidth: 3,
                                            borderColor: 'white',
                                            borderRadius: '50%',
                                            // alignSelf: 'baseline'
                                            // alignSelf: 'center'
                                            padding: 7
                                        }}>
                                            <FontAwesomeIcon icon={faBookOpen} color='white' size={24} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.detailsDescriptionContainer}>
                                        <Text style={{
                                            color: 'white',
                                            fontFamily: 'Nunito',
                                            fontWeight: '500',
                                            fontSize: 15,
                                            marginVertical: 7
                                        }}>Choose planting location</Text>
                                        <Tooltip
                                            isVisible={toolTipVisible}
                                            content={<Text>For better plant tracking select where do you going to plant this {selectedPlant?.name}</Text>}
                                            placement="top"
                                            onClose={() => setToolTipVisible(false)}
                                        >
                                            <TouchableOpacity onPress={() => setToolTipVisible(true)}>
                                                <FontAwesomeIcon icon={faCircleQuestion} color='white' size={24} />
                                            </TouchableOpacity>
                                        </Tooltip>
                                    </View>
                                    {/* <TouchableWithoutFeedback onPress={() => {}}> */}
                                    {/* <NativeViewGestureHandler disallowInterruption={true}> */}
                                        {/* <View style={{
                                            // height: 'auto'
                                            height: 300
                                        }}> */}
                                            {/* <Controller name='planting_position' rules={{required: true}} control={control} render={({field: {onChange, value}}) => {
                                                return <LeafletView
                                                    zoom={15}
                                                    onMessageReceived={handleMapClick}
                                                    mapMarkers={markers}
                                                    mapCenterPosition={markers.length ? markers[0].position : DEFAULT_COORDINATE}
                                                />
                                            }}/> */}
                                            <MapView
                                                onPress={onMapPress}
                                                style={styles.map}
                                                // mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json" // OpenStreetMap-based tiles
                                                mapStyle="https://tiles.openfreemap.org/styles/liberty" // OpenStreetMap-based tiles
                                            >
                                                <Camera zoomLevel={12} centerCoordinate={[marker.lng, marker.lat]}/>
                                                <PointAnnotation id='m1' coordinate={[marker.lng, marker.lat]}>
                                                    <Callout>
                                                        <Text>test</Text>
                                                    </Callout>
                                                    <View style={{
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        position: 'absolute',
                                                    }}>
                                                        <Text style={{fontSize: 24}}>📍</Text>
                                                    </View>
                                                </PointAnnotation>
                                            </MapView>
                                        {/* </View> */}
                                    {/* </NativeViewGestureHandler> */}
                                    {/* </TouchableWithoutFeedback> */}
                                    <CustomButton text='Add Plant To Garden' style={styles.addPlantButton} onPress={handleSubmit(onSubmit)} />
                                </BottomSheetScrollView>
                            </BottomSheetView>
                        </BottomSheetModal>
                    </ScrollView>
                </BottomSheetModalProvider>
            </GestureHandlerRootView>
            <Toast />
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
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    detailsView: {
        backgroundColor: '#121212',
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
    detailsDescriptionContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 15
    },
    detailsHandle: {
        backgroundColor: '#918f8f',
    },
    addPlantButton: {
        backgroundColor: '#96d36f',
        padding: 15,
        borderRadius: 15,
        flex: 1,
        justifyContent: 'center',
        width: '50%',
        margin: 'auto',
        fontSize: 10,
        marginTop: 10
    },
    plantsViewDisplayModes: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10
    },
    map: {
        height: 300
    }
})

export default AddPlant
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
import { useFonts } from 'expo-font'
import Plant from '../../components/Plant'
import { useUserContext } from '../contexts/userContext'
import { IPlant } from '../types'
import CustomButton from '../../components/CustomButton'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { router } from 'expo-router'
import { GestureHandlerRootView, RefreshControl } from 'react-native-gesture-handler'
import axios, { AxiosResponse } from 'axios'
import { config } from '../api/config'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message'

const Plants = () => {
    const [fontsLoaded] = useFonts({
            'Nunito-VariableFont_wght': require('../../assets/fonts/Nunito-VariableFont_wght.ttf')
            // 'SpaceMono-Regular': require('@/assets/fonts/SpaceMono-Regular.ttf')
    });
    
    const { user } = useUserContext();

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            axios.get(`${config.backendURL}/api/plants/getUserPlants`, {
                headers: {
                    Authorization: await AsyncStorage.getItem('Authorization')
                },
                params: {
                    username: user.username
                }
            }).then((res: AxiosResponse) => {
                user.plants = res.data.data[0].plants;
                Toast.show({
                    type: 'success',
                    text1: 'Refreshed garden plants successfully!',
                    visibilityTime: 1000,
                });
                setRefreshing(false);
            });
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Failed to refresh garden plants',
                text2: error
            });
        }
    };

    return (
        <SafeAreaView style={[styles.plantsViewWrapper]} edges={["top"]}>
            <GestureHandlerRootView>
                <ScrollView refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
                } >
                    <View style={styles.gardenHeader}>
                        <Text style={styles.title}>My Garden</Text>
                        <CustomButton style={styles.addPlantButton} icon={<FontAwesomeIcon icon={faPlus}/>} onPress={() => {router.navigate('/(plants)/addplant')}}/>
                    </View>
                    <View style={styles.plantsViewContainer}>
                        <View style={styles.plantsContainer}>
                            {refreshing ? (
                                <ActivityIndicator size={"large"} color={"#96d36f"}/>
                            ) : user.plants.length === 0 ? (
                                    <>
                                        <Text style={{ color: 'white' }}>You don't have any plants in your garden.</Text>
                                        <Text style={{ color: 'white' }}>Maybe add one?</Text>
                                    </>
                                ) : (
                                    user.plants.map((plant: IPlant) => {
                                        return <Plant plant={plant} key={plant.plantid + user.username}/>
                                    })
                                )
                            }
                        </View>
                    </View>
                </ScrollView>
                <Toast />
            </GestureHandlerRootView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
        // flex: 1,
        // justifyContent: 'flex-start',
        fontSize: 36,
        color: 'white',
        fontFamily: 'Nunito',
        margin: 10
    },
    plantsViewContainer: {
        margin: 10
    },
    plantsViewWrapper: {
        height: '100%',
        // backgroundColor: 'white'
    },
    plantsContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        // margin: 'auto'
    },
    gardenHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        alignItems: 'center'
        // backgroundColor: '#121212'
        // maxHeight: '100%'
    },
    addPlantButton: {
        backgroundColor: '#96d36f',
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // width: '75%',
        // margin: 'auto',
        // marginTop: 25,
        padding: 15,
        borderRadius: 15,
        margin: 10,
        height: '50%'
        // fontSize: 50
    }
})

export default Plants
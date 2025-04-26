import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, RefreshControl, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomBackButton from '../../components/CustomBackButton'
import { router, useLocalSearchParams } from 'expo-router'
import { Image } from 'expo-image'
import { IPlant, PlantManageType } from '../types'
import CustomButton from '../../components/CustomButton'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBookOpen, faCircleQuestion, faDroplet, faSun, faTemperature2 } from '@fortawesome/free-solid-svg-icons'
import Tooltip from 'react-native-walkthrough-tooltip'
import api from '../api/api'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Toast from 'react-native-toast-message'

// Add interface for care tips
interface CareTips {
    temperature: {
        status: string;
        tips: string[];
        emoji: string;
    };
    humidity: {
        status: string;
        tips: string[];
        emoji: string;
    };
    sunlight: {
        status: string;
        tips: string[];
        emoji: string;
    };
}

const Manage = () => {
    const { plant } = useLocalSearchParams();
    let parsedPlant: IPlant | null = null;

    if (typeof plant === 'string') {
        try {
            parsedPlant = JSON.parse(plant) as IPlant;
        } catch (err) {
            console.error('Failed to parse plant:', err);
        }
    }

    const [toolTipVisible, setToolTipVisible] = useState(false);
    const [loading, setLoading] = useState(true);

    const [currentSunlight, setCurrentSunlight] = useState(0);
    const [measuredSunlight, setMeasuredSunlight] = useState(0);
    const [currentTemperature, setCurrentTemperature] = useState(0);
    const [currentHumidity, setCurrentHumidity] = useState(0);

    const [refreshing, setRefreshing] = useState(false);
    
    const [careTips, setCareTips] = useState<CareTips | null>(null);

    useEffect(() => {
        setLoading(true);
        api.post('/api/plants/getLatestWeather', {
            params: {
                lat: parsedPlant.planting_position.coordinates[0],
                lng: parsedPlant.planting_position.coordinates[1],
                measuredLux: parsedPlant.avg_light_exposure
            }
        }).then((res) => {
            console.log(res.data.weatherData);
            setCurrentSunlight(Math.round(res.data.weatherData.sunHours.sun_hours));
            setMeasuredSunlight(Math.round(res.data.weatherData.sunHours.sun_exposure.measured_lux_in_sun_hours));
            setCurrentTemperature(Math.round(res.data.weatherData.temperature));
            setCurrentHumidity(Math.round(res.data.weatherData.humidity));
            api.post('/api/plants/generatePlantCareTips', {
                plantName: parsedPlant.name,
                currentTemp: Math.round(res.data.weatherData.temperature),
                avgTemp: parsedPlant.avg_temp,
                currentHumidity: Math.round(res.data.weatherData.humidity),
                avgHumidity: parsedPlant.avg_humidity,
                currentSunHours: Math.round(res.data.weatherData.sunHours.sun_hours),
                avgSunHours: Math.round(res.data.weatherData.sunHours.sun_exposure.measured_lux_in_sun_hours)
            }).then((res) => {
                console.log(res.data);
                setCareTips(res.data.tips);
                setLoading(false);
            }).catch((err) => {
                console.log(err.response.data);
                setLoading(false);
            });
        }).catch((err) => {
            console.log(err.response.data);
            setLoading(false);
        });
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            api.post('/api/plants/getLatestWeather', {
                params: {
                    lat: parsedPlant.planting_position.coordinates[0],
                    lng: parsedPlant.planting_position.coordinates[1],
                    measuredLux: parsedPlant.avg_light_exposure
                }
            }).then((res) => {
                setCurrentSunlight(Math.round(res.data.weatherData.sunHours.sun_hours));
                setMeasuredSunlight(Math.round(res.data.weatherData.sunHours.sun_exposure.measured_lux_in_sun_hours));
                setCurrentTemperature(Math.round(res.data.weatherData.temperature));
                setCurrentHumidity(Math.round(res.data.weatherData.humidity));
                Toast.show({
                    type: 'success',
                    text1: 'Refreshed weather data successfully!',
                    visibilityTime: 1000,
                });
                setRefreshing(false);
            }).catch((err) => {
                Toast.show({
                    type: 'error',
                    text1: 'Failed to refresh weather data',
                    text2: err.response.data,
                    visibilityTime: 1000,
                });
                setRefreshing(false);
            });
        } catch (err) {
            Toast.show({
                type: 'error',
                text1: 'Failed to refresh weather data',
                text2: err,
                visibilityTime: 1000,
            });
            setRefreshing(false);
        }
    }

    return (
        <SafeAreaView style={styles.manageViewWrapper} edges={['top']}>
            <View style={{flex: 1}}>
                <ScrollView 
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
                    } 
                    contentContainerStyle={styles.scrollViewContent}
                >
                    <View style={styles.manageHeader}>
                        <CustomBackButton onPress={() => router.back()} />
                        {/* <Text style={styles.addHeaderText}>Add Plant</Text> */}
                        <Image style={{
                            // maxWidth: '100%',
                            width: '50%',
                            height: 156,
                            // objectFit: 'contain'
                        }} source={parsedPlant.base_image} contentFit='cover' />
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
                    <View style={styles.manageBodyContainer}>
                        <View style={styles.manageBodyHeader}>
                            <Text style={styles.manageBodyTitle}>{parsedPlant.name}</Text>
                            <Tooltip
                                isVisible={toolTipVisible}
                                content={<Text>Here shown the current weather details according the position you've chose compared the average optimal weather details for {parsedPlant.name.toLowerCase()}</Text>}
                                placement="top"
                                onClose={() => setToolTipVisible(false)}
                            >
                                <TouchableOpacity onPress={() => setToolTipVisible(true)}>
                                    <FontAwesomeIcon icon={faCircleQuestion} color='white' size={24} />
                                </TouchableOpacity>
                            </Tooltip>
                        </View>
                        
                        {loading ? (
                            <View style={styles.loaderContainer}>
                                <ActivityIndicator size="large" color="#96d36f" />
                                <Text style={styles.loaderText}>Loading weather data...</Text>
                            </View>
                        ) : (
                            <>
                                <View style={styles.infoWrapper}>
                                    <View style={styles.infoContainer}>
                                        <Text style={styles.infoText}>Humidity</Text>
                                        <View style={styles.infoDetailsContainer}>
                                            <FontAwesomeIcon icon={faDroplet} color='white' size={20}/>
                                            <Text style={[styles.infoDataText, currentHumidity-parsedPlant.avg_humidity<10? {color: '#83D560'} : currentHumidity-parsedPlant.avg_humidity<20 ? {color: '#F5A524'} : {color: '#fc2b6d'}]}>{currentHumidity}</Text>
                                            <Text style={styles.infoDataText}>/ {parsedPlant.avg_humidity}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.infoContainer}>
                                        <Text style={styles.infoText}>Temperature</Text>
                                        <View style={styles.infoDetailsContainer}>
                                            <FontAwesomeIcon icon={faTemperature2} color='white' size={20}/>
                                            <Text style={[styles.infoDataText, currentTemperature-parsedPlant.avg_temp<3? {color: '#83D560'} : currentTemperature-parsedPlant.avg_temp<6 ? {color: '#F5A524'} : {color: '#fc2b6d'}]}>{currentTemperature}</Text>
                                            <Text style={styles.infoDataText}>/ {parsedPlant.avg_temp}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.infoContainer}>
                                        <Text style={styles.infoText}>Hours In Sun</Text>
                                        <View style={styles.infoDetailsContainer}>
                                            <FontAwesomeIcon icon={faSun} color='white' size={20}/>
                                            <Text style={[styles.infoDataText, currentSunlight-measuredSunlight<1? {color: '#83D560'} : currentSunlight-measuredSunlight<2 ? {color: '#F5A524'} : {color: '#fc2b6d'}]}>{currentSunlight}</Text>
                                            <Text style={styles.infoDataText}>/ {measuredSunlight}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.separator} />
                                <View style={styles.careTipsContainer}>
                                    <Text style={styles.careTipsTitle}>Care Tips</Text>
                                    
                                    {careTips && (
                                        <>
                                            <View style={styles.careTipSection}>
                                                <Text style={styles.careTipSectionTitle}>
                                                    {careTips.temperature.emoji} Temperature ({careTips.temperature.status})
                                                </Text>
                                                {careTips.temperature.tips.map((tip, index) => (
                                                    <Text key={`temp-${index}`} style={styles.careTipsText}>• {tip}</Text>
                                                ))}
                                            </View>
                                            
                                            <View style={styles.careTipSection}>
                                                <Text style={styles.careTipSectionTitle}>
                                                    {careTips.humidity.emoji} Humidity ({careTips.humidity.status})
                                                </Text>
                                                {careTips.humidity.tips.map((tip, index) => (
                                                    <Text key={`humid-${index}`} style={styles.careTipsText}>• {tip}</Text>
                                                ))}
                                            </View>
                                            
                                            <View style={styles.careTipSection}>
                                                <Text style={styles.careTipSectionTitle}>
                                                    {careTips.sunlight.emoji} Sunlight ({careTips.sunlight.status})
                                                </Text>
                                                {careTips.sunlight.tips.map((tip, index) => (
                                                    <Text key={`sun-${index}`} style={styles.careTipsText}>• {tip}</Text>
                                                ))}
                                            </View>
                                        </>
                                    )}
                                </View>
                                <View style={styles.infoDetailsFooter}>
                                    <CustomButton style={styles.moreDetailsBtn} text='More Details'/>
                                </View>
                            </>
                        )}
                    </View>
                </ScrollView>
                <Toast />
            </View>
        </SafeAreaView>
    )
}

export default Manage

const styles = StyleSheet.create({
    manageViewWrapper: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    manageHeader: {
        flexDirection: 'row',
        margin: 20,
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    manageBodyContainer: {
        flex: 1,
        backgroundColor: '#333333',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingBottom: 30,
        overflow: 'hidden'
    },
    manageBodyTitle: {
        color: 'white',
        fontFamily: 'Nunito',
        fontWeight: '700',
        fontSize: 30,
    },
    manageBodyHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 15,
    },
    infoWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 10
    },
    infoText: {
        color: 'white',
        fontFamily: 'Nunito',
        fontWeight: '700',
        fontSize: 15,
        textAlign: 'center'
    },
    infoDetailsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        gap: 5
    },
    infoContainer: {
        backgroundColor: '#464646',
        borderRadius: 10,
        padding: 10,
        width: '30%'
    },
    infoDataText: {
        color: 'white',
        fontFamily: 'Nunito',
        fontWeight: '500',
        fontSize: 15,
    },
    separator: {
        height: 1,
        backgroundColor: '#555555',
        marginHorizontal: 20,
        marginTop: 30,
    },
    infoDetailsFooter: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 45
    },
    moreDetailsBtn: {
        backgroundColor: '#96d36f',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%',
        padding: 15,
        borderRadius: 15,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loaderText: {
        color: 'white',
        fontFamily: 'Nunito',
        fontWeight: '600',
        fontSize: 16,
        marginTop: 10
    },
    careTipsContainer: {
        padding: 15,
        marginHorizontal: 20,
        backgroundColor: '#444444',
        borderRadius: 10,
        marginVertical: 20,
        overflow: 'hidden'
    },
    careTipsTitle: {
        color: 'white',
        fontFamily: 'Nunito',
        fontWeight: '700',
        fontSize: 18,
        marginBottom: 10
    },
    careTipsText: {
        color: 'white',
        fontFamily: 'Nunito',
        fontSize: 15,
        fontWeight: '500',
        marginBottom: 5,
        flexShrink: 1
    },
    careTipSection: {
        marginBottom: 15
    },
    careTipSectionTitle: {
        color: 'white',
        fontFamily: 'Nunito',
        fontWeight: '700',
        fontSize: 16,
        marginBottom: 5
    }
})
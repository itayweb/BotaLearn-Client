import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
import { useFonts } from 'expo-font'
import Plant from '../../components/Plant'
import { useUserContext } from '../contexts/userContext'
import { IPlant } from '../types'
import CustomButton from '../../components/CustomButton'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

const Plants = () => {
    const [fontsLoaded] = useFonts({
            'Nunito-VariableFont_wght': require('../../assets/fonts/Nunito-VariableFont_wght.ttf')
            // 'SpaceMono-Regular': require('@/assets/fonts/SpaceMono-Regular.ttf')
    });
    
    const { user } = useUserContext();

    return (
        <SafeAreaView style={[styles.plantsViewWrapper]}>
            <ScrollView>
                <View style={styles.title}>
                    <View style={styles.gardenHeader}>
                        <Text style={styles.title}>My Garden</Text>
                        <CustomButton style={styles.addPlantButton} icon={<FontAwesomeIcon icon={faPlus}/>}/>
                    </View>
                    <View style={styles.plantsContainer}>
                        {user.plants.map((plant:IPlant) => {
                            return <Plant plant={plant} key={plant.id + user.username}/>
                        })}
                    </View>
                </View>
            </ScrollView>
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
    plantsViewWrapper: {
        height: '100%'
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
        marginBottom: 10
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
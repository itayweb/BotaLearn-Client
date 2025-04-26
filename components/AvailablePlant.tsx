import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { AvailablePlantType } from '../app/types'
import { Image } from 'expo-image';

const Plant:React.FC<AvailablePlantType> = ({
    plant,
    onPress,
    displayMode
}) => {

    useEffect(() => {
        console.log(plant)
    }, [])

    return (
        <View style={displayMode=='grid' ? styles.plantWrapperGrid : styles.plantWrapperList}>
            <TouchableOpacity onPress={onPress}>
                <FontAwesomeIcon icon={faPlusCircle} color='white' size={24} style={styles.addIcon}/>
                <Image style={displayMode=='grid' ? styles.plantImageGrid: styles.plantImageList} source={plant.image} alt='test'  />
                <View style={styles.plantFooter}>
                    <View style={styles.plantInfo}>
                        <Text style={styles.plantInfoTitle}>{plant.name}</Text>
                        <Text style={styles.plantGrowthLevelTitle}>Beginner</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    plantWrapperGrid: {
        backgroundColor: '#333333',
        borderRadius: 15,
        width: '48%',
        marginBottom: 10,
    },
    plantWrapperList: {
        backgroundColor: '#333333',
        borderRadius: 15,
        width: '80%',
        marginBottom: 10,
    },
    plantImageGrid: {
        maxWidth: '100%',
        height: 78,
        objectFit: 'contain'
    },
    plantImageList: {
        maxWidth: '100%',
        height: 156,
        objectFit: 'contain'
    },
    plantFooter: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        marginTop: -30,
        borderEndEndRadius: 15,
        borderEndStartRadius: 15,
        paddingBottom: 20,
        backgroundColor: '#3d3d3de1'
    },
    plantInfo: {
        marginLeft: 5,
        marginBottom: 5
    },
    plantInfoTitle: {
        color: 'white',
        fontWeight: '700',
        fontSize: 20
    },
    plantGrowthLevelTitle: {
        color: 'white',
        marginBottom: 5,
        fontWeight: '300',
    },
    addIcon: {
        marginLeft: -10,
        marginTop: -10
    }
})

export default Plant
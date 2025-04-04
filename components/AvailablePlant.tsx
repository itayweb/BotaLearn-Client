import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { faAngleRight, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { BlurView } from 'expo-blur';
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
                {/* <TouchableOpacity> */}
                <FontAwesomeIcon icon={faPlusCircle} color='white' size={24} style={styles.addIcon}/>
                {/* </TouchableOpacity> */}
                <Image style={displayMode=='grid' ? styles.plantImageGrid: styles.plantImageList} source={plant.image} alt='test'  />
                {/* <BlurView intensity={30} style={styles.plantFooter}> */}
                <View style={styles.plantFooter}>
                    <View style={styles.plantInfo}>
                        <Text style={styles.plantInfoTitle}>{plant.name}</Text>
                        <Text style={styles.plantInfoStageTitle}>Beginner</Text>
                    </View>
                </View>
            </TouchableOpacity>
            {/* </BlurView> */}
        </View>
    )
}

const styles = StyleSheet.create({
    plantWrapperGrid: {
        backgroundColor: '#333333',
        borderRadius: 15,
        width: '48%',
        // width: '80%',
        marginBottom: 10,
    },
    plantWrapperList: {
        backgroundColor: '#333333',
        borderRadius: 15,
        // width: '48%',
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
        // margin: 15,
        padding: 15,
        marginTop: -30,
        borderEndEndRadius: 15,
        borderEndStartRadius: 15,
        paddingBottom: 20,
        // borderTopLeftRadius: 15,
        // borderTopRightRadius: 15
        backgroundColor: '#3d3d3de1'
    },
    plantManage: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderColor: 'white',
        borderWidth: 2,
        maxWidth: '35%',
        borderRadius: 10,
        // marginTop: 15
        // padding: 10
    },
    plantManageTitle: {
        color: 'white',
        flex: 1,
        justifyContent: 'flex-start',
        marginLeft: 10
    },
    plantManageIcon: {
        marginRight: 10
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
    plantInfoStageTitle: {
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
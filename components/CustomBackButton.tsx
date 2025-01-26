import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { BackButtonType } from '../app/types'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faCaretLeft } from '@fortawesome/free-solid-svg-icons'

const CustomBackButton:React.FC<BackButtonType> = ({onPress, style}) => {
    return (
        <View>
            <TouchableOpacity style={[style && styles.disabledButton]} onPress={onPress}>
                {/* <Text style={styles.buttonText}></Text> */}
                <FontAwesomeIcon icon={faArrowLeft} color='white' size={24}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonText: {
        fontFamily: 'Nunito',
        fontWeight: '700'
        // fontSize: 15
    },
    disabledButton: {
        backgroundColor: '#333333'
    }
})

export default CustomBackButton
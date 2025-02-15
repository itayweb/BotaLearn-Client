import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { BackButtonType } from '../app/types'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faCaretLeft } from '@fortawesome/free-solid-svg-icons'

const CustomBackButton:React.FC<BackButtonType> = ({onPress, style}) => {
    return (
        <View>
            <TouchableOpacity style={[style]} onPress={onPress}>
                {/* <Text style={styles.buttonText}></Text> */}
                <FontAwesomeIcon icon={faArrowLeft} color='white' size={24} style={styles.btnIcon}/>
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
    btnIcon: {
        // height: '50%'
    }
})

export default CustomBackButton
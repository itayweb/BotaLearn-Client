import { View, Text, Button, Pressable, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { CustomButtonType } from '../app/types'

const CustomButton: React.FC<CustomButtonType> = ({style, text, isDisable, onPress, icon}) => {
    return (
        <View>
            <TouchableOpacity style={[style, isDisable && styles.disabledButton]} disabled={isDisable} onPress={onPress}>
                {icon}
                <Text style={styles.buttonText}>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonText: {
        fontFamily: 'Nunito',
        fontWeight: '700',
        textAlign: 'center'
        // fontSize: 15
    },
    disabledButton: {
        backgroundColor: '#333333'
    }
})

export default CustomButton
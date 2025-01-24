import { View, Text, Button, Pressable, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { CustomButtonType } from '../types'

const CustomButton: React.FC<CustomButtonType> = ({style, text, isDisable, onPress}) => {
    return (
        <View>
            <TouchableOpacity style={[style, isDisable && styles.disabledButton]} disabled={isDisable} onPress={onPress}>
                <Text style={styles.buttonText}>{text}</Text>
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

export default CustomButton
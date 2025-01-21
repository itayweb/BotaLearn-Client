import { View, Text, Button, Pressable, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { CustomButtonType } from '@/types'

const CustomButton: React.FC<CustomButtonType> = ({style, text, isDisable}) => {
    return (
        <View>
            <TouchableOpacity style={[style, isDisable && styles.disabledButton]} disabled={isDisable}>
                <Text style={styles.buttonText}>{text}</Text>
            </TouchableOpacity>
            {/* <Text>CustomButton</Text> */}
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
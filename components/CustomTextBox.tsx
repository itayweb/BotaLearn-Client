import { GestureResponderEvent, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AuthTextBoxType } from '../app/types'
import { Entypo } from '@expo/vector-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

const AuthTextBox:React.FC<AuthTextBoxType> = ({
    placeHolder,
    iconName,
    style,
    type,
    onChangeData,
    value
}) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [text, setText] = useState<string>('');
    const [isPasswordNotVisible, setIsPasswordNotVisible] = useState<boolean>(type == 'password'? true : false);

    function togglePasswordVisibilty(): void {
        setIsPasswordNotVisible(!isPasswordNotVisible);
    }

    return (
        <View style={[styles.container, style]}>
            {iconName && 
                <FontAwesomeIcon icon={iconName} color={ isFocused? 'lightgrey' : 'grey'} />
            }
            <TextInput placeholder={placeHolder} placeholderTextColor={isFocused ? 'lightgrey' : 'grey'} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} style={[styles.input, isFocused ? styles.focusedInput : styles.unfocusedInput]} onChangeText={onChangeData} value={value} textContentType={type} secureTextEntry={isPasswordNotVisible} />
            {type == 'password' &&
                <TouchableOpacity onPress={togglePasswordVisibilty}>
                    <FontAwesomeIcon icon={isPasswordNotVisible ? faEyeSlash : faEye} color='white' size={24}/>
                </TouchableOpacity>
            }
        </View>
    )
}

export default AuthTextBox

const styles = StyleSheet.create({
    input: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        fontSize: 25,
        padding: 10,
        height: 60,
        borderBottomWidth: 2,
        // borderBottomColor: 'black'
        // margin: 12,
        color: 'white'
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // borderWidth: 1,
        // borderColor: 'lightgrey',
        // borderRadius: 5,
        padding: 15
        // width: '50%',
        // backgroundColor: 'white',
        // margin: 10
    },
    focusedInput: {
        borderBottomColor: 'lightgrey'
    },
    unfocusedInput: {
        borderBottomColor: 'grey'
    }
})
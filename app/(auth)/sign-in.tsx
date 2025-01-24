import { View, Text, Image, StyleSheet, ScrollView, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Entypo } from '@expo/vector-icons'
import {useFonts} from 'expo-font'
import AuthTextBox from '../../components/AuthTextBox'
import {faEnvelope} from '@fortawesome/free-regular-svg-icons';
import {faLock} from '@fortawesome/free-solid-svg-icons';
import CustomButton from '../../components/CustomButton'
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view'
import { router } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import { SigninType, SignupType } from '../../types'


const SignIn = () => {
    const [fontsLoaded] = useFonts({
        'Nunito-VariableFont_wght': require('../../assets/fonts/Nunito-VariableFont_wght.ttf')
        // 'SpaceMono-Regular': require('@/assets/fonts/SpaceMono-Regular.ttf')
    });

    const { handleSubmit, control, reset, formState: { errors, isDirty, isValid } } = useForm<SigninType>({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: "onChange"
    });

    const onSubmit = ((data) => {
        console.log(data);
    });

    const onChange = ((arg) => {
        return {
            value: arg.nativeEvent.text,
        }
    });

    return (
        <SafeAreaView style={styles.loginPage}>
            <KeyboardAwareScrollView>
                <Image source={require('../../assets/images/loginImg.png')}/>
                <Text style={styles.loginTitle}>Login</Text>
                <View style={styles.inputsContainer}>
                    <Controller rules={{ required: true }} control={control} render={({ field: { onChange, value } }) => {
                        return <AuthTextBox placeHolder="Email" iconName={faEnvelope} style={styles.emailInput} type='emailAddress' onChangeData={(value) => onChange(value)} value={value}/>
                    }} name='email' />
                    <Controller rules={{ required: true }} control={control} render={({ field: { onChange, value } }) => {
                        return <AuthTextBox placeHolder="Password" iconName={faLock} style={styles.emailInput} type="password" onChangeData={(value) => onChange(value)} value={value}/>
                    }} name='password'/>
                </View>
                <View style={styles.forgotPassBtn}>
                    <Button title='Forgot Password?' color="#96d36f"/>
                </View>
                <CustomButton style={styles.loginButton} text='Login' isDisable={!isValid} />
                <View style={styles.toSignupContainer}>
                    <Text style={styles.toSignup}>New to BotaLearn? </Text>
                    <Button title='Signup' onPress={() => router.navigate('/(auth)/sign-up')}/>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    loginTitle: {
        paddingLeft: 10,
        fontWeight: 'bold',
        fontFamily: 'Nunito',
        fontSize: 30,
        color: 'white'
    },
    emailInput: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center'
        padding: 10
    },
    inputsContainer: {
        // flex: 1,
        // flexDirection: 'column',
        padding: 10,
        // gap: 
    },
    passwordInput: {
        padding: 10,
        
    },
    loginButton: {
        backgroundColor: '#96d36f',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '75%',
        margin: 'auto',
        marginTop: 25,
        padding: 15,
        borderRadius: 15,
        
    },
    forgotPassBtn: {
        flex: 1,
        alignItems: 'flex-end',
        paddingRight: 15
    },
    loginPage: {
        backgroundColor: '#121212',
        height: '100%'
    },
    toSignup: {
        color: 'white',
        marginRight: 10
    },
    toSignupContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 5,
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default SignIn
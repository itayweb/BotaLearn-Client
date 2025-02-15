import { View, Text, Image, Button, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import AuthTextBox from '../../components/AuthTextBox';
import CustomButton from '../../components/CustomButton';
import { useFonts } from 'expo-font';
import { faAddressCard, faCircleUser, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { Controller, useForm } from 'react-hook-form';
import { SignupType } from '../types';
import { router } from 'expo-router';
import CustomBackButton from '../../components/CustomBackButton';
import axios, { AxiosResponse } from 'axios';
import Toast from 'react-native-toast-message';
import { config } from '../api/config';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignUp = () => {
    const [fontsLoaded] = useFonts({
        'Nunito-VariableFont_wght': require('../../assets/fonts/Nunito-VariableFont_wght.ttf')
        // 'SpaceMono-Regular': require('@/assets/fonts/SpaceMono-Regular.ttf')
    });
    const { handleSubmit, control, reset, formState: { errors, isDirty, isValid } } = useForm<SignupType>({
        defaultValues: {
            email: '',
            username: '',
            password: '',
        },
        mode: "onChange"
    });

    const onSubmit = ((data) => {
        axios.post(`${config.backendURL}/api/auth/register`, data)
        .then((res: AxiosResponse) => {
            Toast.show({
                type: 'success',
                text1: 'Signed up succcessfully',
                text2: 'Your user has been signed up!',
                visibilityTime: 500,
                onHide: () => {
                    router.navigate('/(auth)/sign-in')
                }
            })
        })
        .catch((error) => {
            if (axios.isAxiosError(error)) {
            const statusCode = error.response?.status; // Get status code
            const errorMessage = error.response?.data.message || "An error occurred";

            switch (statusCode) {
                case 400:
                    Toast.show({
                        type: 'error',
                        text1: 'Failed to signup',
                        text2: errorMessage
                    });
                break;
                case 401:
                    Toast.show({
                        type: 'error',
                        text1: 'Failed to signup',
                        text2: errorMessage
                    });
                break;
                case 404:
                    Toast.show({
                        type: 'error',
                        text1: 'Failed to signup',
                        text2: errorMessage
                    });
                break;
                case 500:
                    Toast.show({
                        type: 'error',
                        text1: 'Failed to signup',
                        text2: 'Server Error: Please try again later.'
                    });
                break;
                default:
                    Toast.show({
                        type: 'error',
                        text1: 'Failed to signup',
                        text2: errorMessage
                    });
                break;
            }
            } else {
            // Handle other errors
                console.error("An unexpected error occurred.");
            }
        });
    });

    const onChange = ((arg) => {
        return {
            value: arg.nativeEvent.text,
        }
    });

    return (
        <SafeAreaView style={styles.signupPage} edges={['top']}>
            <KeyboardAwareScrollView>
                <CustomBackButton onPress={() => router.navigate('/(auth)/sign-in')}/>
                <Image source={require('../../assets/images/signupImg.png')} style={styles.signupImage} />
                <Text style={styles.signupTitle}>Sign up</Text>
                <View style={styles.inputsContainer}>
                    <Controller rules={{required: true}} control={control} render={({ field: { onChange, value } }) => {
                        return <AuthTextBox placeHolder="Full Name" iconName={faAddressCard} style={styles.input} type='name' onChangeData={(value) => onChange(value)} value={value} />;
                    }} name='fullName' />
                    <Controller rules={{required: true}} control={control} render={({ field: { onChange, value } }) => {
                        return <AuthTextBox placeHolder="Email" iconName={faEnvelope} style={styles.input} type='emailAddress' onChangeData={(value) => onChange(value)} value={value}/>
                    }} name='email' />
                    <Controller rules={{required: true}} control={control} render={({ field: { onChange, value } }) => {
                        return <AuthTextBox placeHolder="Username" iconName={faCircleUser} style={styles.input} type='username' onChangeData={(value) => onChange(value)} value={value}/>
                    }} name='username' />
                    <Controller rules={{required: true}} control={control} render={({ field: { onChange, value } }) => {
                        return <AuthTextBox placeHolder="Password" iconName={faLock} style={styles.input} type="password" onChangeData={(value) => onChange(value)} value={value}/>    
                    }} name='password' />
                </View>
                <CustomButton style={styles.signupButton} text='Signup' isDisable={!isValid} onPress={handleSubmit(onSubmit)} />
                <View style={styles.alreadySignedContainer}>
                    <Text style={styles.alreadySigned}>Joined us before? </Text>
                    <Button title='Login' onPress={() => router.navigate('/(auth)/sign-in')}/>
                </View>
            </KeyboardAwareScrollView>
            <Toast />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    signupTitle: {
        paddingLeft: 10,
        fontWeight: 'bold',
        fontFamily: 'Nunito',
        fontSize: 30,
        color: 'white',
        marginTop: -5
    },
    input: {
        padding: 10
    },
    inputsContainer: {
        padding: 10,
    },
    signupButton: {
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
    signupPage: {
        backgroundColor: '#121212',
        height: '100%'
    },
    signupImage: {
        // height: '75%',
        // width: '75%',
        // margin: 'auto'
        width: '100%',
        height: undefined,
        aspectRatio: 1,
    },
    alreadySigned: {
        color: 'white',
        marginRight: 10
    },
    alreadySignedContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 5,
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default SignUp
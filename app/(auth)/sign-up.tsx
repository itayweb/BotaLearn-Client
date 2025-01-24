import { View, Text, SafeAreaView, Image, Button, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import AuthTextBox from '../../components/AuthTextBox';
import CustomButton from '../../components/CustomButton';
import { useFonts } from 'expo-font';
import { faAddressCard, faCircleUser, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { Controller, useForm } from 'react-hook-form';
import { SignupType } from '../../types';
import { router } from 'expo-router';
import CustomBackButton from '../../components/CustomBackButton';

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
        console.log(data);
    });

    const onChange = ((arg) => {
        return {
            value: arg.nativeEvent.text,
        }
    });

    return (
        <SafeAreaView style={styles.signupPage}>
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
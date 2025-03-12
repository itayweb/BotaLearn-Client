import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Slot, Stack } from 'expo-router'

const AuthLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="sign-in" options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="sign-up" options={{ headerShown: false, gestureEnabled: false }} />
        </Stack>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default AuthLayout
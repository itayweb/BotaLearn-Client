import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUserContext } from '../app/contexts/userContext'
import { Redirect, Stack, useSegments } from 'expo-router';

const AuthHandler = () => {
    const { isAuthenticated } = useUserContext();
    const [isLoading, setIsLoading] = useState(true);
    
    const segments = useSegments();
    const isOnAuthScreen = segments[0] === "(auth)";

    useEffect(() => {
        console.log(isAuthenticated);
        setIsLoading(false);
    }, [isAuthenticated]);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
                <Text style={{color: 'cyan'}}>Test</Text>
            </View>
        );
    }

    if (!isAuthenticated && !isOnAuthScreen) {
        return <Redirect href={"/(auth)/sign-in"}/>
    }

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="index" options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="search/[query]" options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="(plants)" options={{ headerShown: false }} />
        </Stack>
    )
}

export default AuthHandler
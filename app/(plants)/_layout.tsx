import React from 'react'
import { Redirect, Stack } from 'expo-router'
import { useUserContext } from '../contexts/userContext';
import { LoaderScreen } from 'react-native-ui-lib';

const PlantsLayout = () => {
    const { isAuthenticated, user, loading } = useUserContext();
    
    if (loading) {
        return (
            <LoaderScreen/>
        );
    }

    if (!user) {
        return <Redirect href={"/(auth)/sign-in"}/>
    }

    return (
        <Stack>
            <Stack.Screen name="addplant" options={{ headerShown: false }}/>
        </Stack>
    )
}

export default PlantsLayout
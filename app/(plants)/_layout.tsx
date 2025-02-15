import React from 'react'
import { Stack } from 'expo-router'

const PlantsLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="addplant" options={{ headerShown: false }}/>
        </Stack>
    )
}

export default PlantsLayout
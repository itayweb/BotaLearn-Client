import FontAwesome5 from '@expo/vector-icons/build/FontAwesome5';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/build/MaterialCommunityIcons';
import { Redirect, router, Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { useUserContext } from '../contexts/userContext';
import axios, { AxiosResponse } from 'axios';
import { config } from '../api/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoaderScreen } from 'react-native-ui-lib';

const TabsLayout = () => {
    const { isAuthenticated, user, setUser, loading } = useUserContext();
    
    if (loading) {
        return (
            <LoaderScreen/>
        );
    }

    if (!user) {
        return <Redirect href={"/(auth)/sign-in"}/>
    }

    return (
        <Tabs screenOptions={{
            tabBarStyle: {
                backgroundColor: '#333333',
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15
            },
            tabBarInactiveTintColor: 'lightgrey',
            tabBarActiveTintColor: '#96D35F', 
        }}>
            <Tabs.Screen
                name='home'
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ focused, color }) => {
                        if (focused) {
                            return <Ionicons name='home' color={color} size={24} />
                        }
                        return <Ionicons name='home-outline' color={color} size={24} />
                    }
                }}
            />
            <Tabs.Screen
                name='plants'
                options={{
                    title: "Plants",
                    headerShown: false,
                    tabBarIcon: ({ focused, color }) => {
                        if (focused) {
                            return <MaterialCommunityIcons name='flower-tulip' color={color} size={24}/>
                        }
                        return <MaterialCommunityIcons name='flower-tulip-outline' color={color} size={24}/>
                    }
                }}
            />
            <Tabs.Screen
                name='learn'
                options={{
                    title: "Learn",
                    headerShown: false,
                    tabBarIcon: ({ focused, color }) => {
                        if (focused) {
                            return <Ionicons name='book' color={color} size={24}/>
                        }
                        return <Ionicons name='book-outline' color={color} size={24}/>
                    }
                }}
            />
            <Tabs.Screen
                name='profile'
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({ focused, color }) => {
                        if (focused) {
                            return <FontAwesome5 name='user-alt' color={color} size={24}/>
                        }
                        return <FontAwesome5 name='user' color={color} size={24}/>
                    }
                }}
            />
        </Tabs>
    )
}

export default TabsLayout
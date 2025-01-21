import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

const TabsLayout = () => {
    return (
        <Tabs>
            <Tabs.Screen
                name='home'
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ focused, color }) => {
                        if (focused) {
                            return <Ionicons name='home' color={color} size={28}/>
                        }
                        return <Ionicons name='home-outline' color={color} size={28}/>
                    }
            />
            <Tabs.Screen
                name='plants'
                options={{
                    title: "Plants",
                    headerShown: false,
                    tabBarIcon: ({ focused, color }) => {
                        if (focused) {
                            return <MaterialCommunityIcons name='flower-tulip' color={color} size={28}/>
                        }
                        return <MaterialCommunityIcons name='flower-tulip-outline' color={color} size={28}/>
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
                            return <Ionicons name='book' color={color} size={28}/>
                        }
                        return <Ionicons name='book-outline' color={color} size={28}/>
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
                            return <FontAwesome5 name='user-alt' color={color} size={28}/>
                        }
                        return <FontAwesome5 name='user' color={color} size={28}/>
                    }
                }}
            />
        </Tabs>
    )
}

export default TabsLayout
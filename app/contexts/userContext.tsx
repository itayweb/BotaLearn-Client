import { View, Text } from 'react-native'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { IUser, UserContextType } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { config } from '../api/config';
import axios from 'axios';
import { router } from 'expo-router';
import api from '../api/api';

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<IUser>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // const applyUser = (fullName: string, email: string, username: string) => {
    //     setUser({ fullName: fullName, email: email, username: username });
    // }

    useEffect(() => {
        const checkAuth = async () => {
            const token = await AsyncStorage.getItem("Authorization");
            console.log(token);
            if (token) {
                try {
                    const res = await api.get(`/api/auth/protected`);
                    if (res.data) {
                        setIsAuthenticated(true);
                        setUser(res.data);
                    } else {
                        await AsyncStorage.removeItem('Authorization');
                        setIsAuthenticated(false);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            setLoading(false);
        }
        checkAuth();
    }, []);

    const login = (userData) => {
        setUser(userData);
        router.replace("/(tabs)/home");
    }

    const logout = async () => {
        await AsyncStorage.removeItem('Authorization');
        setUser(null);
        router.replace("/(auth)/sign-in");
    }

    return (
        <UserContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated, login, logout, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);

    if (!context)
        throw new Error("useUserContext must be within a UserProvider");

    return context;
};

// export default UserContext
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";
import { config } from "./config";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
    baseURL: config.backendURL,
});

api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('Authorization');

    if (token) {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
        // Token expired, log out user
        await AsyncStorage.removeItem('Authorization');
        router.replace("/(auth)/sign-in");
        return Promise.reject("Token expired");
        }
        config.headers.Authorization = `${token}`;
    }

    return config;
});

export default api;
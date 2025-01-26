import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import React from "react";
import { useColorScheme } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { UserProvider } from "./contexts/userContext";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <UserProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name="index" options={{ headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name="search/[query]" options={{ headerShown: false, gestureEnabled: false }} />
        </Stack>
        <StatusBar style="auto"/>
      </UserProvider>
    </ThemeProvider>
  );
}

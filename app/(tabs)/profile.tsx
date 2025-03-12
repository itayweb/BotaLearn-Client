import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import { useUserContext } from '../contexts/userContext'
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
    const { user, setUser, logout } = useUserContext();

    return (
        <View style={styles.testContainer}>
            <Text style={styles.testText}>User: {user.fullname}</Text>
            <Button title='Logout' onPress={async () => {
                logout();
            }}/>
        </View>
    )
}

const styles = StyleSheet.create({
    testContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    testText: {
        color: 'white'
    }
})

export default Profile
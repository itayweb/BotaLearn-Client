import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {
    return (
        <SafeAreaView style={styles.title}>
            <Text style={styles.title}>Home</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        margin: 'auto'
    }
})

export default Home
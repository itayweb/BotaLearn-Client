import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Learn = () => {
    return (
        <View style={styles.title}>
            <Text style={styles.title}>Learn</Text>
        </View>
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

export default Learn
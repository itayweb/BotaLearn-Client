import { Text, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {

    return (
        <SafeAreaView style={styles.root}>
            <Text style={{
                color: 'white'
            }}>Home</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20
    },
    container: { flex: 1 },
    map: { flex: 1, width: 400, height: 400 },
})

export default Home
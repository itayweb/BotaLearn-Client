import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LatLng, LeafletView, MapMarker } from 'react-native-leaflet-view';
import {Callout, Camera, MapView, PointAnnotation} from '@maplibre/maplibre-react-native';

const DEFAULT_COORDINATE: LatLng = {
    lat: 32.109333,
    lng: 34.855499,
};

const Home = () => {
    const [markers, setMarkers] = useState<MapMarker[]>([]);

    const handleMapClick = (event: any) => {
        if (event.event === "onMapClicked") {
            const { lat, lng } = event.payload.touchLatLng;

            // Create a new marker at the clicked location
            const newMarker: MapMarker = {
                id: `marker-${lat}-${lng}`,
                position: { lat, lng },
                // icon: "📍", // You can use an image URL instead
                icon: "https://unpkg.com/leaflet@1.9.2/dist/images/marker-icon-2x.png",
                size: [25, 41],
                iconAnchor: [0, 41],
            };

            setMarkers([newMarker]); // Replace existing markers or use [...markers, newMarker] to keep previous ones
        }
    };

    const [marker, setMarker] = useState<{lat: number; lng: number} | null>({lat: 32.109333, lng: 34.855499});

    const onMapPress = (event: any) => {
        console.log(event);
        const {geometry} = event;
        setMarker({lat: geometry.coordinates[1], lng: geometry.coordinates[0]});
    }

    return (
        // <SafeAreaView style={styles.root}>
        //     <LeafletView
        //             zoom={10}
        //             onMessageReceived={handleMapClick}
        //             mapMarkers={markers}
        //             mapCenterPosition={DEFAULT_COORDINATE}
        //     />
        // </SafeAreaView>
        // <View style={styles.container}>
            <MapView
                onPress={onMapPress}
                style={styles.map}
                mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json" // OpenStreetMap-based tiles
            >
                <Camera zoomLevel={12} centerCoordinate={[marker.lng, marker.lat]}/>
                <PointAnnotation id='m1' coordinate={[marker.lng, marker.lat]} style={{zIndex: 10}}>
                    <Callout>
                        <Text>test</Text>
                    </Callout>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        zIndex: 10
                        // transform: [{translateX: -12}, {translateY: -12}]
                    }}>
                        <Text style={{fontSize: 24}}>📍</Text>
                    </View>
                </PointAnnotation>
            </MapView>
        // </View>
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
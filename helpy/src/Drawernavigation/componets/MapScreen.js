import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker } from 'react-native-maps';
import { GOOGLE_MAPS_APIKEY } from "@env";
import MapViewDirections from 'react-native-maps-directions';

const MapScreen = () => {

    const [state, setstate] = useState({
        pickupcords: {
            latitude: 19.7615,
            longitude: 75.7239,
            latitudeDelta: 0.004,
            longitudeDelta: 0.005,
        },
        droplocatoinCords: {
            latitude: 19.9175,
            longitude: 73.7498,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        }
    })

    const { pickupcords, droplocatoinCords } = state

    return (
        <View style={{ flex: 1 }}>
            <View style={{ padding: 5 }}>
                <GooglePlacesAutocomplete
                    placeholder='Search'
                    styles={{
                        container: {
                            flex: 0,
                        },
                        textInput: {
                            fontSize: 18,
                        },
                    }}
                    fetchDetails={true}
                    enablePoweredByContainer={false}
                    minLength={2}
                    query={{
                        key: GOOGLE_MAPS_APIKEY,
                        language: "en"
                    }}
                    nearbyPlacesAPI="GooglePlacesSearch"
                    debounce={400}
                />
            </View>

            <MapView
                style={{ flex: 1 }}
                initialRegion={pickupcords}
            >

                <Marker
                    coordinate={{
                        latitude: 19.7315,
                        longitude: 75.7149,
                    }}
                    title="origin"
                    identifier="origin" />
            </MapView>
        </View>
    )
}

export default MapScreen

const styles = StyleSheet.create({})

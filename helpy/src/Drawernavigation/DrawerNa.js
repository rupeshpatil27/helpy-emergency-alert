import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import EditScreen from './componets/EditScreen'
import FriendScreen from './componets/FriendScreen'
import HomeScreen from './componets/HomeScreen'
import MapScreen from './componets/MapScreen'

const DrawerNa = ({ currentTab ,navigation}) => {
    return (
        <>
            {currentTab == 'Home' ? <HomeScreen /> : currentTab == 'Edit' ? <EditScreen /> : currentTab == 'Friends' ? <FriendScreen navigation={navigation} /> : <MapScreen/>}
        </>
    
    );
};

export default DrawerNa



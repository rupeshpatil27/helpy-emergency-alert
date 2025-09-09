import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import firebases from '../../firebase'

const SplashScreen = ({ navigation }) => {

    const { auth } = firebases();
    const [user, setuser] = useState('')

    useEffect(() => {
        const unregister = auth().onAuthStateChanged((userExist) => {
            if (userExist) setuser(userExist)
            else setuser('')
        })
        return () => {
            unregister()
        }
    }, [])

    if(user){
        setTimeout(() => {
            navigation.replace('DrawerNavigation');
        }, 2000);
    }
    else{
        setTimeout(() => {
            navigation.replace('LoginScreen');
        }, 2000);
    }

    return (
        <View style={styles.container}>
            <Image
                source={require('../images/alertlogo1.png')} style={styles.logo}>
            </Image>
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: '#F43B45',

    },
    logo: {
        width: 240,
        height: 190,
    },
})

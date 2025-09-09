import React, { useState, useRef } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, Animated } from 'react-native'

import { Icon } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';

import firebases  from "../../firebase";

import { useSelector } from "react-redux";
import { selectUsername } from "../common/slices/navSlice";

import user from '../images/user1.png';
import home from '../images/home-page.png';
import Edit from '../images/edit.png';
import Friends from '../images/frirnds.png';
import Map from '../images/map.png';
import menu from '../images/menu.png';
import close from '../images/menu-close.png';
import logout from '../images/logout.png';

import DrawerNa from './DrawerNa';
import TabButton from './TabButton';


const DrawerNav = ({ navigation }) => {
    const { auth } = firebases();
    const [currentTab, setCurrentTab] = useState('Home')
    const [showmenu, setShowMenu] = useState(false)

    const offsetvalue = useRef(new Animated.Value(0)).current
    const scaleValue = useRef(new Animated.Value(1)).current
    const closeButtonOffset = useRef(new Animated.Value(0)).current

    const username = useSelector(selectUsername);

    const SignOut =()=>{
        auth().signOut()
        navigation.replace('LoginScreen')
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 15 }}>

                <View style={tw`mt-8 rounded-full bg-gray-300 p-3 items-center justify-center h-20 w-20 `}>
                    <Image source={user} style={{ width: 50, tintColor: 'white', height: 50 }} />
                </View>

                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', marginTop: 20 }}>{username.username}</Text>

                <View style={{ flexGrow: 1, marginTop: 50 }}>
                    {TabButton(currentTab, setCurrentTab, "Home", home, setShowMenu, showmenu, scaleValue, offsetvalue, closeButtonOffset)}
                    {TabButton(currentTab, setCurrentTab, "Edit", Edit, setShowMenu, showmenu, scaleValue, offsetvalue, closeButtonOffset)}
                    {TabButton(currentTab, setCurrentTab, "Friends", Friends, setShowMenu, showmenu, scaleValue, offsetvalue, closeButtonOffset)}
                    {TabButton(currentTab, setCurrentTab, "Map", Map, setShowMenu, showmenu, scaleValue, offsetvalue, closeButtonOffset)}
                </View>
                <TouchableOpacity  onPress={SignOut}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 8,
                        backgroundColor: 'transparent',
                        borderRadius: 8,
                        paddingLeft: 13,
                        paddingRight: 35,
                        marginTop: 15
                    }}>
                        <Image source={logout}
                            style={{
                                width: 20,
                                height: 20,
                                tintColor:'white'
                            }}></Image>
                        <Text style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            paddingLeft: 15,
                            color:'white'
                        }}>logout</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <Animated.View style={{
                flexGrow: 1,
                backgroundColor: 'white',
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                borderRadius: showmenu ? 15 : 0,
                transform: [
                    {
                        scale: scaleValue
                    },
                    {
                        translateX: offsetvalue
                    }
                ]
            }}>

                <Animated.View style={[{
                    transform: 
                        {
                            translateY: closeButtonOffset
                        }
                }, { flex: 1 }]}>
                    <TouchableOpacity style={{ paddingHorizontal: 20, paddingVertical: 10 }} onPress={() => {
                        Animated.timing(scaleValue, {
                            toValue: showmenu ? 1 : 0.88,
                            duration: 300,
                            useNativeDriver: true
                        })
                            .start()

                        Animated.timing(offsetvalue, {
                            toValue: showmenu ? 0 : 200,
                            duration: 300,
                            useNativeDriver: true
                        })
                            .start()

                        Animated.timing(closeButtonOffset, {
                            toValue: !showmenu ? -30 : 0,
                            duration: 300,
                            useNativeDriver: true
                        })
                            .start()

                        setShowMenu(!showmenu)

                    }}>
                        <Image source={showmenu ? close : menu}
                            style={{
                                width: 20,
                                marginLeft: 20,
                                height: 20,
                                marginTop: 40,
                                tintColor: 'black'
                            }} />
                    </TouchableOpacity>


                    <View style={{ flex: 1}}>
                        <DrawerNa currentTab={currentTab} navigation={navigation} />
                    </View>
                </Animated.View>
            </Animated.View>
        </SafeAreaView>
    )
}

export default DrawerNav

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FF646C',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
})

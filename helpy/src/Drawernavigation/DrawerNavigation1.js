import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView, BackHandler, Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'

import Animated from "react-native-reanimated";

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';

import MainLayout from "../screens/MainLayout";

import { useSelector } from "react-redux";
import { selectUsername } from "../common/slices/navSlice";
import firebases from '../../firebase'

import { Icon } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';

import user from '../images/user1.png';
import home from '../images/home-page.png';
import Edit from '../images/edit.png';
import Friends from '../images/frirnds.png';
import Map from '../images/map.png';
import menu from '../images/menu.png';
import close from '../images/menu-close.png';

const Drawer = createDrawerNavigator()

const CustomDraweritem = ({ label, icon }) => {
    return (
        <TouchableOpacity>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 8,
                //backgroundColor:  == title ? 'white' : 'transparent',
                borderRadius: 8,
                paddingLeft: 13,
                paddingRight: 35,
                marginTop: 15
            }}>
                <Image source={icon}
                    style={{
                        width: 20,
                        height: 20,
                        tintColor: 'white'
                    }}></Image>
                <Text style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    paddingLeft: 15,
                    color: 'white'
                }}>{label}</Text>
            </View>
        </TouchableOpacity>
    )
}

const CustomDrawerContent = ({ navigation }) => {
    return (
        <DrawerContentScrollView scrollEnabled={true}
            contentContainerStyle={{ flex: 1 }}>
            <View style={{
                flex: 1,
                padding: 15
            }}>
                <View style={{ alignItems: 'flex-start', justifyContent: 'center' }}>
                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => navigation.closeDrawer()}>
                        <Image source={close}
                            style={{
                                width: 20,
                                height: 20,
                                marginLeft: 20,
                                tintColor: 'white'
                            }} />
                    </TouchableOpacity>
                </View>

                <View style={{ justifyContent: 'center' }}>
                    <TouchableOpacity style={tw`mt-8 rounded-full bg-gray-300 p-3 items-center justify-center h-20 w-20 `}>
                        <Image source={user} style={{ width: 50, tintColor: 'white', height: 50 }} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', marginTop: 10, }}>Rp</Text>
                </View>

                <View style={{ flex: 1, marginTop: 10 }}>
                    <CustomDraweritem
                        label="home"
                        icon={home} />
                    <CustomDraweritem
                        label="Edit"
                        icon={Edit} />
                    <CustomDraweritem
                        label="Friends"
                        icon={Friends} />
                    <CustomDraweritem
                        label="Map"
                        icon={Map} />
                </View>
            </View>
        </DrawerContentScrollView>
    )
}

const DrawerNavigation = () => {
    const [progress, setProgress] = useState(new Animated.Value(0))

    const scale = Animated.interpolateNode(progress, {
        inputRange: [0, 1],
        outputRange: [1, 0.8]
    })

    const borderRadius = Animated.interpolateNode(progress, {
        inputRange: [0, 1],
        outputRange: [0, 26]
    })

    const animatedStyle = { borderRadius, transform: [{ scale }] }

    return (
        <View style={{ flex: 1, backgroundColor: '#FF646C', }}>

            <Drawer.Navigator
                screenOptions={{
                    headerShown: false,
                    drawerType: 'slide',
                    overlayColor: "trasparent",
                    drawerStyle: {
                        flex: 1,
                        width: '65%',
                        paddingRight: 20,
                        backgroundColor: 'trasparent'
                    },
                    sceneContainerStyle: {
                        backgroundColor: 'trasparent'
                    },
                }}
                initialRouteName="MainLayout"
                drawerContent={props => {
                    setTimeout(() => {
                        setProgress(props.progress)
                    }, 0)
                    return (
                        <CustomDrawerContent
                            navigation={props.navigation}
                        />
                    )
                }}>
                <Drawer.Screen name='MainLayout'>
                    {props => <MainLayout {...props} drawerAnimationStyle={animatedStyle} />}
                </Drawer.Screen>
            </Drawer.Navigator>

        </View>
    )
}

export default DrawerNavigation

const styles = StyleSheet.create({})

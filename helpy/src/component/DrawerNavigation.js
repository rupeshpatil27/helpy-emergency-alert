import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView,BackHandler, Button, StyleSheet, Text, TouchableOpacity, View, Image, Animated } from 'react-native'
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

const DrawerNavigation = ({ navigation }) => {
    const [currentTab, setCurrentTab] = useState('Home')
    const [showmenu, setShowMenu] = useState(false)

    const offsetvalue = useRef(new Animated.Value(0)).current
    const scaleValue = useRef(new Animated.Value(1)).current
    const closeButtonOffset = useRef(new Animated.Value(0)).current
    // const { firestore } = firebases();
    // const { auth } = firebases();
    // //const { messaging } = firebases();

    // const username = useSelector(selectUsername);

    // const signOut = () => {
    //     auth().signOut()
    //     navigation.replace('LoginScreen');
    // }

    // const sendNoti = () => {
    //     firestore().collection('usertokens').get().then(querySnap => {
    //         const userDevicestoken = querySnap.docs.map(docSnap => {
    //             return docSnap.data().token
    //         })

    //         const udata = {
    //             'id': '1',
    //             'type': 'MapScreen',
    //             'name': 'rp'
    //         }
    //         let notidata = {
    //             'data': udata,
    //             'title': 'hey tp',
    //             'body': 'check this',
    //             'tokens': userDevicestoken
    //         }
    //         fetch('https://642e-2409-4042-e82-765f-31c2-ba27-6387-7bf0.ngrok.io/send-noti', {
    //             method: 'post',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 data: notidata
    //             })
    //         })
    //     })
    // }

    // https://519f-2409-4042-e82-765f-a827-b543-dd6d-3969.ngrok.io

    // const disableBackButton = () =>{
    //     BackHandler.exitApp()
    // }

    // useEffect(() => {
    //   BackHandler.addEventListener('hardwareBackPress',disableBackButton)
    // })

    // useEffect(() => {
    //   BackHandler.removeEventListener('hardwareBackPress',disableBackButton)
    // },[])

    // onPress={sendNoti}
    return (
        // <View style={styles.container}>
        //     <View style={styles.containerAvoidView}>
        //         <Button title="sign" onPress={signOut} />
        //         <TouchableOpacity style={styles.helpButtonStyle}>
        //             <Icon
        //                 style={[tw`mr-3 mt-5 rounded-full p-3`,styles.bdcolor]}
        //                 name="user"
        //                 type="antdesign"
        //                 color="white"
        //                 size={150} />
        //         </TouchableOpacity>
        //     </View>
        // </View>
        <SafeAreaView style={styles.container}>
            <View style={{ justifyContent: 'flex-start', padding: 15 }}>

                <View style={tw`mt-8 rounded-full bg-gray-300 p-3 items-center justify-center h-20 w-20 `}>
                    <Image source={user} style={{ width: 50,tintColor:'white', height: 50 }} />
                </View>

                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', marginTop: 20 }}>Rp</Text>

                <View style={{ flexGrow: 1, marginTop: 50 }}>
                    {TabButton(currentTab, setCurrentTab, "Home", home)}
                    {TabButton(currentTab, setCurrentTab, "Edit", Edit)}
                    {TabButton(currentTab, setCurrentTab, "Friends", Friends)}
                    {TabButton(currentTab, setCurrentTab, "Map", Map)}
                </View>

            </View>

            <Animated.View style={{
                flexGrow: 1,
                backgroundColor: 'white',
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                paddingHorizontal: 15,
                paddingVertical: 20,
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

                <Animated.View style={{
                    transform: [
                        {
                            translateY: closeButtonOffset
                        }]
                }}>
                    <TouchableOpacity onPress={() => {
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
                </Animated.View>
            </Animated.View>
        </SafeAreaView>
    )
}

const TabButton = (currentTab, setCurrentTab, title, image) => {
    return (
        <TouchableOpacity onPress={() => setCurrentTab(title)}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 8,
                backgroundColor: currentTab == title ? 'white' : 'transparent',
                borderRadius: 8,
                paddingLeft: 13,
                paddingRight: 35,
                marginTop: 15
            }}>
                <Image source={image}
                    style={{
                        width: 20,
                        height: 20,
                        tintColor: currentTab == title ? '#FF646C' : 'white'
                    }}></Image>
                <Text style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    paddingLeft: 15,
                    color: currentTab == title ? '#FF646C' : 'white'
                }}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default DrawerNavigation

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FF646C',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
})

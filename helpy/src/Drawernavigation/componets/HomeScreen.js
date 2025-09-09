import React,{useEffect} from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native'
import { Icon } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import Help from '../../images/help.png'
import user from '../../images/user1.png'

import firebases from '../../../firebase'

import { useSelector } from "react-redux";
import { selectPhoneNumber,selectMessage } from "../../common/slices/navSlice";


const HomeScreen = () => {
    const { firestore } = firebases();
    const { auth } = firebases();
    //const { messaging } = firebases();

    const defaultMsg='hey help me'
    const m = useSelector(selectMessage);
    const phonenumber = useSelector(selectPhoneNumber);
    const PhonNoo = phonenumber.codeCountry + phonenumber.phonenumber

    const sendNoti = () => {
        firestore().collection('userfriends').doc(PhonNoo).collection('friend').get().then(querySnap => {
            const userDevicestoken = querySnap.docs.map(docSnap => {
                return docSnap.data().token
            })

            const udata = {
                'id': '1',
                'type': 'MapScreen',
                'name': 'rp'
            }
            let notidata = {
                'data': udata,
                'title': !m.message ? defaultMsg : m.message,
                'body': 'check this',
                'tokens': userDevicestoken
            }
            fetch('https://7636-2409-4042-8e-db0e-a0eb-ffa-549c-1cf5.ngrok.io/send-noti', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: notidata
                })
            })
        })
    }

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

    return (
        <View style={{ flex: 1,justifyContent: 'center', alignItems: 'center', backgroundColor:'white' }}>
            <TouchableOpacity
            onPress={sendNoti} style={{
                backgroundColor: '#FF646C',
                width: 200,
                height: 200,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center'
            }}
            >
                <Text style={{ fontSize: 40, color: 'white', fontWeight: 'bold' }}>
                    Help
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})

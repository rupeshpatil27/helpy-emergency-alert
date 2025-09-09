import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import plus from '../../images/plus.png';
import AddFriend from './AddFriends/AddFriend';
import firebases from '../../../firebase'

import user from '../../images/user1.png';

import { useSelector } from "react-redux";
import { selectPhoneNumber } from "../../common/slices/navSlice";

const FriendScreen = ({ navigation }) => {

    const { firestore } = firebases();
    const { auth } = firebases();

    const [userFriends, setUserFriends] = useState(null)
    const [addModalVisible, setAddModalVisible] = useState(false);

    const phonenumber = useSelector(selectPhoneNumber);
    const PhonNoo = phonenumber.codeCountry + phonenumber.phonenumber


    const onShowHideAddFriendModal = (Boolean) => {
        setAddModalVisible(Boolean)
    }

    const getUserFriends = async () => {
        const querySnap = await firestore().collection('userfriends').doc(PhonNoo).collection('friend').get()
        const ufrind = querySnap.docs.map(docSnap => docSnap.data())
        setUserFriends(ufrind)
    }

    // const deleteFriend =async () =>{
    //     const querySnap = await firestore().collection('userfriends').doc(PhonNoo).collection('friend').doc().delete()
    // }

    useEffect(() => {
        getUserFriends()
    }, [])

    const RenderCard = ({ item }) => {
        return (
            <TouchableOpacity>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    paddingHorizontal: 15,
                    paddingVertical: 15
                }}>
                    <View style={{
                        width: 50,
                        height: 50,
                        backgroundColor: '#E2E2E2',
                        borderRadius: 25,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Image source={user} style={{ width: 25, tintColor: 'white', height: 25 }} />
                    </View>
                    <View style={{ marginLeft: 20 }}>
                        <Text style={{ fontSize: 16 }}>
                            {item.name}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>

            <FlatList
                data={userFriends}
                renderItem={({ item }) => { return <RenderCard item={item} /> }}
                keyExtractor={(item) => item.phonno} />
            <TouchableOpacity onPress={() => onShowHideAddFriendModal(true)}
                style={{
                    padding: 15,
                    borderRadius: 25,
                    backgroundColor: '#FF646C',
                    position: 'absolute',
                    bottom: 20,
                    right: 20,
                    zIndex: 1
                }}>
                <Image source={plus}
                    style={{
                        width: 25,
                        height: 25,
                        tintColor: 'white',
                    }} />
            </TouchableOpacity>

            <AddFriend
                onShowHideAddFriendModal={onShowHideAddFriendModal}
                addModalVisible={addModalVisible} />
        </View >
    )
}

export default FriendScreen

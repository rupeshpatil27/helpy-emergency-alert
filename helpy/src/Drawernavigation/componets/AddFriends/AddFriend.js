import React, { useRef, useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Image, Modal } from 'react-native'

import { Icon } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';

import { CountryCode } from "./CountryCode";
import { CountryCodes } from "../../../common/CountryCodes";

import firebases from '../../../../firebase'

import tick from '../../../images/tick.png'
import close from '../../../images/menu-close.png';

import { useSelector } from "react-redux";
import { selectPhoneNumber } from "../../../common/slices/navSlice";

const AddFriend = (props) => {

    const { firestore } = firebases();
    const { messaging } = firebases();

    let textInput = useRef(null)
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [FocusInput, setFocusInput] = useState(true)

    const defaultcodeCountry = "+91"
    const [modalVisible, setmodalVisible] = useState(false);

    const [dataCountries, setdataCountries] = useState(CountryCodes);
    const [codeCountryy, setcodeCountryy] = useState([defaultcodeCountry]);

    const phonenumber = useSelector(selectPhoneNumber);
    const PhonNoo = phonenumber.codeCountry + phonenumber.phonenumber

    const phonno = codeCountryy + number

    let userDevicesData = null;
    let verfifypn = null;

    const onShowHideModal = (Boolean) => {
        setmodalVisible(Boolean)
    }

    const onChangePhone = (name) => {
        setName(name)
    };

    const onChangePhone2 = (number) => {
        setNumber(number)
    };

    const SaveInFireStore = async () => {
        try {
            if (name && number) {
                await firestore().collection('userfriends').doc(PhonNoo).collection('friend').get().then(querySnap => {
                    verfifypn = querySnap.docs.map(docSnap => {
                        return docSnap.data().phonno
                    })
                })

                if (phonno !== verfifypn[0]) {
                    await firestore().collection('users').doc(phonno).get().then(querySnap => {
                        userDevicesData = querySnap.data().token
                    })

                    firestore().collection('userfriends').doc(PhonNoo).collection('friend').doc().set({
                        token: userDevicesData,
                        name: name,
                        phonno: phonno
                    })
                    alert("Your Profile added sucessfully")
                    props.onShowHideAddFriendModal(false)
                }
                else {
                    alert("Already added")
                }

                // await firestore().collection('users').doc(confirm._auth._user.uid).collection('user').doc(PhonNo).set({
                //     name: name,
                //     uid: confirm._auth._user.uid,
                //     number:PhonNo,
                //     token:toke

                // })

                // firestore().collection('userfriends').doc(PhonNoo).collection('friend').doc().set({
                //     token: userDevicesData,
                //     name: name,
                //     phonno: phonno
                // })


            }
            else {
                alert("please fill details")
            }
        } catch (e) {
           alert(JSON.stringify(e))
        }
    }

    const onChangeFocus = () => {
        setFocusInput(true)
    }

    const onChangeBlur = () => {
        setFocusInput(false)
    }

    return (
        <Modal transparent={false} visible={props.addModalVisible}>
            <View style={styles.container}>
                <KeyboardAvoidingView
                    behavior={'padding'}
                    style={styles.containerAvoidView}>
                    <View style={styles.HeaderButton}>
                        <TouchableOpacity style={styles.HeaderButtonlefttext}
                            onPress={() => props.onShowHideAddFriendModal(false)} >
                            <Image source={close}
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: 'black',
                                }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.HeaderButtonrighttext}
                            onPress={SaveInFireStore}>
                            <Image source={tick}
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: 'black',
                                }} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.containerInput}>
                        <TextInput style={styles.NumberInput}
                            ref={(input) => textInput = input}
                            value={name}
                            returnKeyType="done"
                            placeholder="Enter name"
                            onChangeText={onChangePhone}
                            onFocus={onChangeFocus}
                            onBlur={onChangeBlur}
                            placeholderTextColor='#707070' />
                    </View>

                    <View style={styles.containerInput2}>
                        <TouchableOpacity
                            onPress={() => onShowHideModal(true)}
                            style={{
                                backgroundColor: '#F7F8F9',
                                justifyContent: "center",
                                paddingHorizontal: 20,
                                borderRadius: 10,
                                marginRight: 2,
                                alignItems: 'center'
                            }}>
                            <Text>{codeCountryy[0]}</Text>
                        </TouchableOpacity>
                        <TextInput style={styles.NumberInput2}
                            value={number}
                            keyboardType="number-pad"
                            returnKeyType="done"
                            placeholder="Enter number"
                            onChangeText={onChangePhone2}
                            onFocus={onChangeFocus}
                            onBlur={onChangeBlur}
                            placeholderTextColor='#707070' />
                    </View>
                </KeyboardAvoidingView>

                <CountryCode
                    setData={(item) => setcodeCountryy(item)}
                    data={dataCountries}
                    extraData={dataCountries}
                    onShowHideModal={onShowHideModal}
                    modalVisible={modalVisible} />
            </View>

        </Modal>)
}

export default AddFriend

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerAvoidView: {
        flex: 1,
        backgroundColor: 'white'
    },

    containerInput: {
        marginTop: 15,
        alignSelf: 'center',
        flexDirection: 'row',
    },
    containerInput2: {
        marginTop: 15,
        alignSelf: 'center',
        flexDirection: 'row',
        width: '80%',
    },
    NumberInput: {
        width: '81%',
        paddingLeft: 10,
        color: '#707070',
        borderRadius: 10,
        backgroundColor: '#F7F8F9'
    },
    NumberInput2: {
        width: '80%',
        paddingLeft: 10,
        color: '#707070',
        borderRadius: 10,
        backgroundColor: '#F7F8F9'
    },
    HeaderButton: {
        margin: 5,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    HeaderButtonlefttext: {

    },
    HeaderButtonrighttext: {
    },
    HeaderText: {
        fontSize: 16,
        color: '#707070',
    },
})


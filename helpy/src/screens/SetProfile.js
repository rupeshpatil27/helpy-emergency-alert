import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { Icon } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import { useDispatch, useSelector } from "react-redux";
import { setUsername } from "../common/slices/navSlice";
import { selectPhoneNumber } from "../common/slices/navSlice";
import firebases from '../../firebase'

const SetProfile = ({ navigation}) => {
    const { firestore } = firebases();
    const { messaging } = firebases();
    let textInput = useRef(null)
    const [name, setname] = useState('');
    const [FocusInput, setFocusInput] = useState(true)
    const [toke, setToke] = useState(null)
    
    const phonenumber = useSelector(selectPhoneNumber);
    const PhonNo = phonenumber.codeCountry + phonenumber.phonenumber

    const dispatch = useDispatch();

    const onChangePhone = (name) => {
        setname(name)
    };

    const setDataInDb = async () => {
        try {
            await firestore().collection('users').doc(PhonNo).set({
                name: name,
                number:PhonNo,
                token:toke
            })
            alert("Your Profile added sucessfully")
            navigation.replace('DrawerNavigation')
        } catch (e) {
            console.log(e)
        }
    }

    const onPressContinue = () => {
        if (name) {
            dispatch(
                setUsername({
                    username: name,
                })
            );
            setDataInDb()
        }
        else {
            alert("Enter Username")
        }
    }

    const onChangeFocus = () => {
        setFocusInput(true)
    }

    const onChangeBlur = () => {
        setFocusInput(false)
    }

    useEffect(() => {
        messaging().getToken().then(token => {
            setToke(token)
        })
        textInput.focus();
    }, [])

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior={'padding'}
                style={styles.containerAvoidView}>
                <Text style={styles.titletext1}>Profile info </Text>
                <Text style={styles.titletext2}>Please provide your name and an optional profile photo</Text>
                <View style={{ alignItems: 'center', marginBottom: 20, marginTop: 15 }}>

                    <Icon
                        style={tw`mr-3 mt-5 rounded-full bg-gray-300 p-3`}
                        name="user"
                        type="antdesign"
                        color="white"
                        size={40}
                    />

                    <View style={styles.containerInput}>
                        <TextInput style={[styles.NumberInput,
                        {
                            borderBottomColor: name ? '#FF646C' : '#707070',
                        }]}
                            ref={(input) => textInput = input}
                            value={name}
                            returnKeyType="done"
                            placeholder="Enter your Username"
                            onChangeText={onChangePhone}
                            onFocus={onChangeFocus}
                            onBlur={onChangeBlur}
                            placeholderTextColor='#707070' />
                    </View>
                </View>

                <View style={styles.NextButtonBottom}>
                    <TouchableOpacity onPress={onPressContinue}>
                        <View style={styles.NextButton}>
                            <Text style={styles.NextButtonText}>
                                Ok
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default SetProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerAvoidView: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
    titletext1: {
        color: '#FF646C',
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 15,
    },
    titletext2: {
        marginTop: 10,
        marginBottom: 5,
        textAlign: 'center',
        fontSize: 15,
        color: '#707070',
    },
    containerInput: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    NumberInput: {
        width: '80%',
        paddingLeft: 10,
        height: 50,
        paddingLeft: 10,
        borderColor: '#707070',
        color: '#707070',
        borderBottomWidth: 1,
    },

    NextButtonBottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 30,
        marginTop: 40,
        alignItems: 'center',
    },
    NextButton: {
        width: 150,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF646C',
    },
    NextButtonText: {
        fontSize: 17,
        color: 'white',
        fontWeight: 'bold',
    }
})




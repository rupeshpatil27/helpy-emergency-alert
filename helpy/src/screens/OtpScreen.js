import React, { useState, useEffect, useRef } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import firebases from '../../firebase'
import { useSelector } from "react-redux";
import { selectPhoneNumber } from "../common/slices/navSlice";

const OtpScreen = ({ navigation }) => {
    const { auth } = firebases();
    const { messaging } = firebases();
    let textInput = useRef(null)
    let clockCall = null
    const lengthInput = 6;
    const defaultCountDown = 60;
    const [internalVal, setinternalVal] = useState("")
    const [FocusInput, setFocusInput] = useState(true)
    const [CountDown, setCountDown] = useState(defaultCountDown)
    const [EnableResend, setEnableResend] = useState(false)
    const [confirm, setConfirm] = useState(null)
    
    const phonenumber = useSelector(selectPhoneNumber);
    const PhonNo = phonenumber.codeCountry + phonenumber.phonenumber

    useEffect(() => {
        clockCall = setInterval(() => {
            decrementClock();
        }, 1000)
        return () => {
            clearInterval(clockCall)
        }
    })

    const decrementClock = () => {
        if (CountDown == 0) {
            setEnableResend(true)
            setCountDown(0)
            clearInterval(clockCall)
        } else {
            setCountDown(CountDown - 1)
        }
    }

    const confirmCode = async () => {
        try {
            const responce = await confirm.confirm(internalVal);
            if (responce) {
                navigation.replace('SetProfile')
            }
        } catch (e) {
            alert(JSON.stringify(e))
        }
    }

    useEffect(() => {
        signInWithPhoneNumber()
    }, [])

    const signInWithPhoneNumber = async () => {
        try {
            const confirmation = await auth().signInWithPhoneNumber(PhonNo);
            if (confirmation._auth._authResult) {
                setConfirm(confirmation)
            }
            else {
                alert("Otp not send");
            }
        } catch (e) {
            alert(JSON.stringify(e))
        }
    }

    const onResendOtp = () => {
        if (EnableResend) {
            setCountDown(defaultCountDown)
            signInWithPhoneNumber()
            setEnableResend(false)
            clearInterval(clockCall)
            clockCall = setInterval(() => {
                defaultCountDown(0)
            }, 1000)
        }
    }

    const onPressContinue = () => {
        confirmCode()
    }

    const onChangeText = (val) => {
        setinternalVal(val)
    }

    const onChangeFocus = () => {
        setFocusInput(true)
    }

    const onChangeBlur = () => {
        setFocusInput(false)
    }

    useEffect(() => {
        textInput.focus()
    }, [])

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                keyboardVerticalOffset={50}
                behavior={'padding'}
                style={styles.containerAvoidView}>
                <Text style={styles.titletext1}>Verify {phonenumber.codeCountry} {phonenumber.phonenumber}</Text>
                <View style={{
                    flexDirection: 'row', flexWrap: 'wrap', marginTop: 20,
                    marginBottom: 20, justifyContent: 'center'
                }}>
                    <Text style={styles.titletext2}>Waiting to automatically detect an SMS send to </Text>
                    <Text style={{ fontWeight: 'bold', color: 'black' }}>{phonenumber.codeCountry} {phonenumber.phonenumber} .</Text>
                </View>
                <View>
                    <TextInput
                        ref={(input) => textInput = input}
                        onChangeText={onChangeText}
                        onFocus={onChangeFocus}
                        onBlur={onChangeBlur}
                        style={{ width: 0, height: 0 }}
                        value={internalVal}
                        returnKeyType="done"
                        maxLength={lengthInput}
                        keyboardType="numeric" />

                    <View style={styles.containerInput}>
                        {
                            Array(lengthInput).fill().map((data, index) => (
                                <View
                                    key={index}
                                    style={[styles.cellView,
                                    {
                                        borderBottomColor: index === internalVal.length ? '#FF646C' : '#707070',
                                    }]}>
                                    <Text
                                        style={styles.cellText}
                                        onPress={() => textInput.focus()}
                                    >
                                        {internalVal && internalVal.length > 0 ? internalVal[index] : ""}
                                    </Text>
                                </View>
                            ))
                        }
                    </View>
                    <Text style={{ textAlign: 'center', marginTop: 5, fontSize: 15, color: '#707070' }}>
                        Enter 6-digit code
                    </Text>
                </View>

                <TouchableOpacity style={styles.RensendButtonContainer} onPress={onResendOtp}>
                    <View style={styles.RensendButton}>
                        <View style={styles.RensendButtonlefttext}>
                            <Text style={[styles.RensendText,
                            {
                                color: EnableResend ? '#FF646C' : '#707070'
                            }]}>Resend SMS</Text>
                        </View>
                        <View style={styles.RensendButtonrighttext}>
                            <Text style={[styles.RensendText, {
                                color: EnableResend ? '#FF646C' : '#707070'
                            }]}>{CountDown}</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <View style={styles.NextButtonBottom}>
                    <TouchableOpacity onPress={onPressContinue}>
                        <View style={styles.NextButton}>
                            <Text style={styles.NextButtonText}>
                                Next
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default OtpScreen

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
        marginTop: 10,
    },
    titletext2: {
        fontSize: 15,
        color: '#707070',
    },
    containerInput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cellView: {
        paddingHorizontal: 11,
        width: 40,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1.5
    },
    cellText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#707070'
    },
    RensendButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        padding: 5,
    },
    RensendButton: {
        paddingHorizontal: 11,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        margin: 5,
    },
    RensendButtonlefttext: {
        flex: 1
    },
    RensendButtonrighttext: {
    },
    RensendText: {
        fontSize: 16,
        color: '#707070',
    },
    NextButtonBottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 40,
        marginTop: 30,
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

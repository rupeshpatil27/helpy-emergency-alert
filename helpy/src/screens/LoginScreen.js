import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView } from 'react-native'
import { CountryCodePicker } from "../component/CountryCodePicker";
import { CountryCodes } from "../common/CountryCodes";
import { PhoneVerifyAlert } from '../component/PhoneVerifyAlert';
import { LoadingAlert } from "../component/LoadingAlert";
import { useDispatch, useSelector } from "react-redux";
import { setPhoneNumber, selectPhoneNumber } from "../common/slices/navSlice";

const LoginScreen = ({ navigation }) => {
    let textInput = useRef(null)
    const defaultcodeCountry = "+91"
    const defaultCountryName = "India"
    const defaultMaskSize = 10
    const [number, setnumber] = useState('');
    const [modalVisible, setmodalVisible] = useState(false);
    const [modalAlertVisible, setmodalAlertVisible] = useState(false);
    const [AlertLoader, setAlertLoader] = useState(false)
    const [dataCountries, setdataCountries] = useState(CountryCodes);
    const [codeCountry, setcodeCountry] = useState([defaultcodeCountry, defaultCountryName]);
    const [FocusInput, setFocusInput] = useState(true)
    
    const dispatch = useDispatch();

    const onShowHideModal = (Boolean) => {
        setmodalVisible(Boolean)
    }

    const onShowHideAlertModal = (Boolean) => {
        setmodalAlertVisible(Boolean)
    }

    const onShowHideAlertLoaderModal = (Boolean) => {
        setAlertLoader(Boolean)
    }

    const onChangePhone = (number) => {
        setnumber(number)
    };


    const onPressContinue = () => {
        if (number.length < defaultMaskSize) {
            alert('enter valid number');
        }
        else {
            onShowHideAlertModal(true);           
            dispatch(
                setPhoneNumber({
                    phonenumber: number,
                    codeCountry:codeCountry[0],
                })
            );
        }
    }

    const onChangeFocus = () => {
        setFocusInput(true)
    }

    const onChangeBlur = () => {
        setFocusInput(false)
    }

    useEffect(() => {
        textInput.focus();
    }, [])

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView style={styles.containerAvoidingView}
                keyboardVerticalOffset={50}
                behavior={'padding'}>
                <Text style={styles.titletext1}>Enter Your Number</Text>
                <Text style={styles.titletext2}>Helpy will send SMS message to verify
                    your number</Text>

                <TouchableOpacity style={styles.countryselect} onPress={() => onShowHideModal(true)} >
                    <Text style={styles.countryselectinput}>
                        {codeCountry[1]}
                    </Text>
                </TouchableOpacity>

                <View style={styles.CountryCodeNumberInput}>
                    <View style={styles.countryCodeInputContainer}>
                        <Text style={styles.countryCodeInput}>
                            {codeCountry[0]}
                        </Text>
                    </View>
                    <TextInput style={[styles.NumberInput,
                    {
                        borderBottomColor: number ? '#FF646C' : '#707070',
                    }]}
                        ref={(input) => textInput = input}
                        maxLength={defaultMaskSize}
                        placeholder="phone number"
                        keyboardType="numeric"
                        value={number}
                        onChangeText={onChangePhone}
                        onFocus={onChangeFocus}
                        onBlur={onChangeBlur}
                        placeholderTextColor='#707070'

                    />

                </View>

                <View style={styles.NextButtonBottom}>
                    <TouchableOpacity onPress={onPressContinue}>
                        <View style={styles.NextButton}>
                            <Text style={styles.NextButtonText}>
                                Next
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <CountryCodePicker
                    setData={(item) => setcodeCountry(item)}
                    data={dataCountries}
                    extraData={dataCountries}
                    onShowHideModal={onShowHideModal}
                    modalVisible={modalVisible} />


                <PhoneVerifyAlert
                    modalAlertVisible={modalAlertVisible}
                    onShowHideAlertModal={onShowHideAlertModal}
                    onShowHideAlertLoaderModal={onShowHideAlertLoaderModal}
                />

                <LoadingAlert
                    navigation={navigation}
                    AlertLoader={AlertLoader}
                    onShowHideAlertLoaderModal={onShowHideAlertLoaderModal}
                />
            </KeyboardAvoidingView>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerAvoidingView: {
        padding: 10,
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
    },
    titletext1: {
        color: '#FF646C',
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 10,
    },
    titletext2: {
        marginTop: 20,
        marginBottom: 20,
        fontSize: 15,
        color: '#707070',
    },
    countryselect: {
        width: '85%',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        padding: 10,
        borderColor: '#FF646C',
    },
    countryselectinput: {
        fontSize: 17,
        color: '#707070',
    },
    CountryCodeNumberInput: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 20,

    },
    countryCodeInputContainer: {
        width: '25%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderColor: '#FF646C',
        height: 50,
    },
    countryCodeInput: {
        color: '#707070',
    },
    NumberInput: {
        width: '65%',
        marginLeft: 10,
        height: 50,
        paddingLeft: 10,
        borderBottomWidth: 1,
        borderColor: '#707070',
        color: '#707070',
    },
    NextButtonBottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 40,
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

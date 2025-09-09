import React, { useRef, useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from "react-redux";
import { setMessage, selectMessage } from "../../common/slices/navSlice";

const EditScreen = () => {
    let textInput = useRef(null)
    const [msg, setMsg] = useState('');
    const [FocusInput, setFocusInput] = useState(true)

    const defaultMsg='hey help me'

    const m = useSelector(selectMessage);
    const dispatch = useDispatch();

    const onChangePhone = (msg) => {
        setMsg(msg)
    };

    const onPressContinue = () => {
        if (msg) {
            dispatch(
                setMessage({
                    message: msg,
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

    // useEffect(() => {
    //     textInput.focus();
    // }, [])

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior={'padding'}
                style={styles.containerAvoidView}>
                <Text style={styles.titletext1}>Add Your Message</Text>
                <Text style={styles.titletext2}>This message is send to your friends,if you don't write then default message will send.</Text>
                <Text style={styles.titletext3}>Your message is*</Text>
                <Text style={styles.titletext4}>' {!m.message ? defaultMsg : m.message} '</Text>
                <View style={styles.containerInput}>
                    <TextInput style={[styles.NumberInput,
                    {
                        borderBottomColor: msg ? '#FF646C' : '#707070',
                    }]}
                        ref={(input) => textInput = input}
                        value={msg}
                        returnKeyType="done"
                        placeholder="Enter your message"
                        onChangeText={onChangePhone}
                        onFocus={onChangeFocus}
                        onBlur={onChangeBlur}
                        placeholderTextColor='#707070' />
                </View>

                <View style={styles.NextButtonBottom}>
                    <TouchableOpacity onPress={onPressContinue}>
                        <View style={styles.NextButton}>
                            <Text style={styles.NextButtonText}>
                                Add
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default EditScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    containerAvoidView: {
        flex: 1,
        alignItems: 'center',
        backgroundColor:'white'
    },
    titletext1: {
        color: '#FF646C',
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 5,
        marginBottom: 15,
    },
    titletext2: {
        marginTop: 10,
        marginBottom: 5,
        textAlign: 'center',
        fontSize: 15,
        color: '#707070',
    },
    titletext3: {
        marginTop: 10,
        marginBottom: 5,
        textAlign: 'center',
        fontSize: 15,
        color: '#FF646C',
    },
    titletext4: {
        
        marginBottom: 5,
        textAlign: 'center',
        fontSize: 15,
        color: '#707070',
    },
    containerInput: {
        marginTop: 15,
        justifyContent: 'center',
        flexDirection: 'row',
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

import React,{useState} from 'react'
import { StyleSheet, Text, View, Modal, TouchableOpacity,Dimensions } from 'react-native'
import { useSelector } from "react-redux";
import { selectPhoneNumber } from "../common/slices/navSlice";

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const PhoneVerifyAlert = (props) => {

    const phonenumber = useSelector(selectPhoneNumber);
    
    const onOkNavigate= () =>{
        props.onShowHideAlertModal(false)
        props.onShowHideAlertLoaderModal(true)      
    }

    const onEditNavigate= () =>{
        props.onShowHideAlertModal(false)
    }
    return (
        <Modal transparent={true} visible={props.modalAlertVisible}>
            <View style={styles.modalContainer}>
                <View style={styles.AlertContainer}>
                    <View style={styles.AlertTilte} >
                        <Text style={{ fontSize: 17, color: '#707070' }}>We will be verifying the phone number:</Text>
                    </View>
                    <View style={styles.AlertCentermessage} >
                        <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{phonenumber.codeCountry}</Text>
                        <Text style={{ fontSize: 17, fontWeight: 'bold' }}> {phonenumber.phonenumber}</Text>
                    </View>
                    <View style={styles.AlertBottommessage} >
                        <Text style={{ fontSize: 17, color: '#707070' }}>Is this OK, or would you like to edit the number?</Text>
                    </View>
                    <View style={styles.AlertButtonStyle}>
                        <View style={styles.AlertButtonContainer}>
                            <TouchableOpacity style={styles.EditAlertButton}  onPress={onEditNavigate} >
                                <Text style={{ fontSize: 17, color: '#FF646C', fontWeight: 'bold' }}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.OkAlertButton} onPress={onOkNavigate}>
                                <Text style={{ fontSize: 17, color: '#FF646C', fontWeight: 'bold' }}>Ok</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )

}

export { PhoneVerifyAlert }

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000099',
    },
    AlertContainer: {
        width: WIDTH-35,
        height: HEIGHT < 645 ? HEIGHT-415 : '28%',
        backgroundColor: 'white',
        padding: 20
    },
    AlertTilte: {
        justifyContent: 'flex-start',
    },
    AlertCentermessage: {
        marginTop: 15,
        marginBottom: 15,
        flexDirection:'row'
    },
    AlertBottommessage: {
        marginBottom: 15
    },
    AlertButtonStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    AlertButtonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'flex-end'
    },
    EditAlertButton: {
       
    },
   
    OkAlertButton: {
       
    },

})
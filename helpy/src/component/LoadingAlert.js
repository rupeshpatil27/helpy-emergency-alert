import React,{useState} from 'react'
import { Modal, StyleSheet, Text, View, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native'

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const LoadingAlert = (props) => {

    if(props.AlertLoader)
    {
        setTimeout(() => {
            props.onShowHideAlertLoaderModal(false)
            props.navigation.replace('OtpScreen')
        }, 2000);
    }

    return (
        <Modal transparent={true} visible={props.AlertLoader} >
            <View style={styles.modalContainer}>
                <View style={styles.AlertContainer}>
                    <View style={styles.LodingContainer}>
                        <ActivityIndicator color='#FF646C' size='large' />
                        <Text style={{ fontSize: 17, color: '#707070', paddingLeft: 10 }}>Verifying</Text>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export { LoadingAlert }

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000099',
    },
    AlertContainer: {
        width: WIDTH - 35,
        height: HEIGHT < 645 ? '10%' : '10%',
        backgroundColor: 'white',
        padding: 15
    },
    LodingContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    }
})

import React from 'react'
import { StyleSheet, Text, View, Modal, FlatList, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'

const CountryCode = (props) => {

    const onCountryChange = (item) => {
        props.setData([item.dialCode]);
        props.onShowHideModal(false);
    }

    const renderItemView = (item) => {
        return (
            <TouchableWithoutFeedback onPress={() => onCountryChange(item)}>
                <View style={styles.CountryModalStyle}>
                    <View style={styles.modalItemContainer}>
                        <Text style={styles.modalItemDialCode}>{item.dialCode}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    return (
        <Modal transparent={true} visible={props.modalVisible}>
            <View style={{
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                backgroundColor: '#00000099',
            }}>
                <View style={styles.modalContainer}>
                    <View style={styles.AlertContainer}>
                        <FlatList maxToRenderPerBatch={10}
                            updateCellsBatchingPeriod={50}
                            style={{ flex: 1 }}
                            data={props.data}
                            extraData={props.extraData}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => renderItemView(item)}
                        />
                    </View>
                </View>

            </View>
        </Modal>
    )

}

export { CountryCode }

const styles = StyleSheet.create({
    AlertContainer: {
        width: '50%',
        height: '95%',
        backgroundColor: 'white',
        padding: 15,
        marginLeft:50

    },
    modalContainer: {
        paddingTop: 15,
        paddingLeft: 25,
        paddingRight: 25,
        flex: 1,
    },
    CountryModalStyle: {
        flex: 1,
        padding: 12,
        alignItems: 'center',
    },
    modalItemContainer: {
        flex: 1,
        paddingLeft: 5,
        flexDirection: 'row',
    },
    modalItemName: {
        flex: 1,
        fontSize: 16,
    },
    modalItemDialCode: {
        fontSize: 16,
    },
    closeButtonStyle: {
        padding: 12,
        alignItems: 'center',
    },
    closeTextStyle: {
        padding: 5,
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
    },
})
import React from 'react'
import { StyleSheet, Text, View, Modal, FlatList, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'

const CountryCodePicker = (props) => {

    const onCountryChange = (item) => {
        props.setData([item.dialCode, item.en]);
        props.onShowHideModal(false);
    }

    const renderItemView = (item) => {
        return (
            <TouchableWithoutFeedback onPress={() => onCountryChange(item)}>
                <View style={styles.CountryModalStyle}>
                    <View style={styles.modalItemContainer}>
                        <Text style={styles.modalItemName}>{item.en}</Text>
                        <Text style={styles.modalItemDialCode}>{item.dialCode}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    return (
        <Modal transparent={false} visible={props.modalVisible}>
            <View style={{ flex: 1 }}>
                <View style={styles.modalContainer}>
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
        </Modal>
    )

}

export { CountryCodePicker }

const styles = StyleSheet.create({
    modalContainer: {
        paddingTop: 15,
        paddingLeft: 25,
        paddingRight: 25,
        flex: 1,

    },
    CountryModalStyle: {
        flex: 1,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

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
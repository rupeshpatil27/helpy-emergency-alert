import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity,Animated ,Image} from 'react-native'


const TabButton = (currentTab, setCurrentTab, title, image, setShowMenu, showmenu, scaleValue, offsetvalue, closeButtonOffset) => {

    const closedr = () => {
        setCurrentTab(title)
        Animated.timing(scaleValue, {
            toValue: showmenu ? 1 : 0.88,
            duration: 300,
            useNativeDriver: true
        })
            .start()

        Animated.timing(offsetvalue, {
            toValue: showmenu ? 0 : 200,
            duration: 300,
            useNativeDriver: true
        })
            .start()

        Animated.timing(closeButtonOffset, {
            toValue: !showmenu ? -30 : 0,
            duration: 300,
            useNativeDriver: true
        })
            .start()
        setShowMenu(!showmenu)
    }

    return (
        <TouchableOpacity onPress={
            closedr}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 8,
                backgroundColor: currentTab == title ? 'white' : 'transparent',
                borderRadius: 8,
                paddingLeft: 13,
                paddingRight: 35,
                marginTop: 15
            }}>
                <Image source={image}
                    style={{
                        width: 20,
                        height: 20,
                        tintColor: currentTab == title ? '#FF646C' : 'white'
                    }}></Image>
                <Text style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    paddingLeft: 15,
                    color: currentTab == title ? '#FF646C' : 'white'
                }}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default TabButton

const styles = StyleSheet.create({})

import React from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { View, StyleSheet, Image } from 'react-native'

export const CustomDrawer = (props: any) => {
    return (
        <DrawerContentScrollView {...props} contentContainerStyle={styles.parent}>
            <View style={styles.logoContainer}>
                <Image 
                    source={(require("../../assets/logo.png"))}
                    style={styles.logo}
                    resizeMode='contain'
                />
            </View>
            <View style={styles.offsetContainer}>
                <DrawerItemList {...props} />
            </View>
    </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    offsetContainer: {
    },
    parent: {
    },
    logo:{
        width: "90%",
        alignItems: "center",
    },
    logoContainer: {
        width: "100%",
        alignItems: "center"
    }
})



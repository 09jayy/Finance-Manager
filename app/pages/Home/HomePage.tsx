import AsyncStorage from "@react-native-async-storage/async-storage"
import React, {Dispatch, SetStateAction, useContext} from "react"
import { View, Text, Pressable } from "react-native"
import {loginContext} from "../../appContext"

const logout = async (setLoggedIn: Dispatch<SetStateAction<boolean>>) => {
    await AsyncStorage.removeItem("token")
    setLoggedIn(false)
}

export const Home = () => {
    const {setLoggedIn} = useContext(loginContext)

    return (
        <View>
            <Text>
                Hello there
            </Text>
            <Pressable onPress={() => logout(setLoggedIn as Dispatch<SetStateAction<boolean>>)}>
                <Text>Logout</Text>
            </Pressable>
        </View>
    )
}
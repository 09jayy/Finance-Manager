import { TouchableOpacity, Text, Touchable, Button, Pressable } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Ionicons, AntDesign, FontAwesome6 } from '@expo/vector-icons'
import { useCallback } from 'react'

export const CustomHeaderBtn = () => {
    const navigation: any = useNavigation()
    const route = useRoute() 
    const HomeRoutes = ["Settings","Banks","Dashboard"]

    return (
        (HomeRoutes.includes(route.name)) ? 
            <Pressable onPress={useCallback(()=>{
                navigation.openDrawer() 
            },[navigation,route])}>
                <FontAwesome6 name="bars" size={22} color="black" />
            </Pressable>
        : 
            <TouchableOpacity onPress={useCallback(()=>{
                navigation.goBack()
            },[navigation,route])}>
                <Ionicons name="arrow-back" size={22} color="black"/>
            </TouchableOpacity>
    )
}
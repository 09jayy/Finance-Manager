import { TouchableOpacity, Text } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Ionicons, AntDesign } from '@expo/vector-icons'

export const CustomBackBtn = () => {
    const navigation: any = useNavigation()
    const route = useRoute() 
    const HomeRoutes = ["SettingsPage","BanksPage","Dashboard"]

    const handleBackPress = () => {
        navigation.goBack()
    }

    const handleDrawerPress = () => {
        navigation.openDrawer()
    }

    return (
        (HomeRoutes.includes(route.name)) ? 
            <TouchableOpacity onPress={handleDrawerPress}>
                <AntDesign name="bars" size={24} color="black" />
            </TouchableOpacity>
        : 
            <TouchableOpacity onPress={handleBackPress}>
                <Ionicons name="arrow-back" size={24} color="black"/>
            </TouchableOpacity>
    )
}
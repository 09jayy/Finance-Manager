import { useState } from "react"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { TextInput, View, StyleSheet } from "react-native"

type PasswordProps = {
    textStyle: any
    showOption: boolean
    placeholder: string
    password: string
    setPassword: (password: string) => void
}

export const InputPassword = ({textStyle, showOption, placeholder, password, setPassword} : PasswordProps) => {
    const [showPassword, setShowPassword] = useState(false)

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <View> 
            <TextInput style = {textStyle} placeholder={placeholder} secureTextEntry = {!showPassword} value={password} onChangeText={setPassword}/>
            {showOption && (
                <MaterialCommunityIcons name={showPassword ? "eye-off" : "eye"} onPress={toggleShowPassword} color="#aaa" style={styles.icon} size={24}/>
            )} 
        </View>
    )
}

const styles = StyleSheet.create({
    icon:{  
        position: "absolute",
        top: 10, 
        right: 15,  
    }
})
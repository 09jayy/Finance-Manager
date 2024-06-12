import { useState } from "react"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { TextInput, View, StyleSheet } from "react-native"

type PasswordProps = {
    textStyle: any
}

export const InputPassword = ({textStyle} : PasswordProps) => {
    const [showPassword, setShowPassword] = useState(false)
    const [password, setPassword] = useState("")

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <View> 
            <TextInput style = {textStyle} placeholder="Password" secureTextEntry = {!showPassword} value={password} onChangeText={setPassword}/>
            <MaterialCommunityIcons name={showPassword ? "eye-off" : "eye"} onPress={toggleShowPassword} color="#aaa" style={styles.icon} size={24}/>
        </View>
    )
}

const styles = StyleSheet.create({
    icon:{  
        position: "absolute",
        top: 10, 
        right: 10,  
    }
}); 
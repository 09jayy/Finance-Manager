import { styles } from "./StyleSheet";
import { InputEmail } from "./components/InputEmail";
import {SignTemplate} from "./components/SignTemplate"
import { View, Text, Dimensions, Pressable } from "react-native"
import {useState} from "react"
import { InputPassword } from "./components/InputPassword";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"

const screenWidth: number = Dimensions.get("window").width; 

export const SignUpForm = ({navigation} : any) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    return (
        <SignTemplate prefixLink="Already have an account?" linkText='Login' redirect={() => navigation.navigate("Login")}>
            <View style={styles.inputContainer}>
                <InputEmail style={styles.textInput} email={email} setEmail={setEmail}/>
                <InputPassword textStyle={styles.textInput} showOption={false} placeholder="Password..." password={password} setPassword={setPassword}/>
                <InputPassword textStyle={styles.textInput} showOption = {false} placeholder="Confirm Password..." password={confirmPassword} setPassword={setConfirmPassword}/>
            </View>
            <Pressable style={styles.btn} onPress={() => console.log(`Email: ${email}\npassowrd: ${password}\nconfirm: ${confirmPassword}`)}>
                <Text style={styles.btnText}>SIGN UP</Text>
            </Pressable>
        </SignTemplate>
    )
}

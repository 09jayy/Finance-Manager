import {View, Text, StyleSheet, Image, Dimensions} from "react-native"
import LoginForm from "./components/LoginForm"

const screenWidth: number = Dimensions.get("window").width; 

export default function LoginPage() {
    return (
        <View style= { styles.container }>
            <Image 
            source={require("../../assets/logo.png") }
            style = {styles.logo}
            />
            <LoginForm/> 
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        resizeMode: "contain",
        width: screenWidth * 0.7
    },
});
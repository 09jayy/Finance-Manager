import { ReactNode } from "react";
import { StyleSheet, Image, Dimensions, SafeAreaView, View, Text, Linking, TouchableOpacity} from "react-native"

const screenWidth: number = Dimensions.get("window").width; 

type SignTemplateProps = {
    children: ReactNode 
    prefixLink: string 
    linkText: string 
    redirect: () => void
    styles: any
}

export const SignTemplate = ({children, prefixLink, linkText, redirect, styles}: SignTemplateProps) => {
    console.log("SignTemplate")
    console.log(styles)
    return (
        <SafeAreaView style= { styles.container }>
            <View>
                <Image 
                source={require("../../../assets/logo.png") }
                style = {styles.logo}
                />
                {children}
            </View>
            <Text>
                {prefixLink} 
                <TouchableOpacity onPress={redirect}>
                    <Text>{linkText}</Text>
                </TouchableOpacity>
            </Text>
        </SafeAreaView>
    );
}
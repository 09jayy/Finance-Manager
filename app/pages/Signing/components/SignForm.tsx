import { ReactNode, useContext } from "react";
import { StyleSheet, Image, Dimensions, SafeAreaView, View, Text, Linking, TouchableOpacity, StyleProp, ViewStyle} from "react-native"
import { styles } from "../StyleSheet"

const screenWidth: number = Dimensions.get("window").width; 

type SignTemplateProps = {
    children: ReactNode 
    prefixLink: string 
    linkText: string 
    redirect: () => void
}

export const SignTemplate = ({children, prefixLink, linkText, redirect}: SignTemplateProps) => {
    return (
        <SafeAreaView style= { styles.container }>
            <View style={ styles.formContainer }>
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
            </View>
        </SafeAreaView>
    );
}
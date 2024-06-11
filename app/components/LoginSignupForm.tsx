import { ReactNode } from "react";
import { StyleSheet, Image, Dimensions, SafeAreaView, View, Text, Linking, TouchableOpacity} from "react-native"

const screenWidth: number = Dimensions.get("window").width; 

interface TemplateProps {
    children: ReactNode 
    prefixLink: string 
    linkText: string 
    linkURL: any
}

export const Template = ({children, prefixLink, linkText, linkURL}: TemplateProps) => {
    return (
        <SafeAreaView style= { styles.container }>
            <View>
                <Image 
                source={require("../assets/logo.png") }
                style = {styles.logo}
                />
                {children}
            </View>
            <Text>
                {prefixLink} 
                <TouchableOpacity onPress={linkURL}>
                    <Text>{linkText}</Text>
                </TouchableOpacity>
            </Text>
        </SafeAreaView>
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
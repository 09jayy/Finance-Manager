import {View, Text, StyleSheet, Image, Dimensions, SafeAreaView} from "react-native"

const screenWidth: number = Dimensions.get("window").width; 

type TemplateProps = {
    children: React.ReactNode
}

export const Template = (props: TemplateProps) => {
    return (
        <SafeAreaView style= { styles.container }>
            <Image 
            source={require("../assets/logo.png") }
            style = {styles.logo}
            />
            {props.children}
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
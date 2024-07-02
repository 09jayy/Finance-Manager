import { Dispatch, ReactNode, SetStateAction } from "react";
import { Image, SafeAreaView, View, Text, TouchableOpacity} from "react-native"
import { styles } from "../StyleSheet"

type SignTemplateProps = {
    children: ReactNode 
    prefixLink: string 
    linkText: string 
    redirect: () => void
    errorMsg: string
    setErrorMsg: Dispatch<SetStateAction<string>>
}

export const SignTemplate = ({children, prefixLink, linkText, redirect, errorMsg, setErrorMsg}: SignTemplateProps) => {
    return (
        <SafeAreaView style= { styles.container }>
            <View style={ styles.formContainer }>
                <View>
                    <Image 
                    source={require("../../../assets/logo.png") }
                    style = {styles.logo}
                    />
                </View>
                {children}
                <Text style={styles.errorMsg}>{errorMsg}</Text>
                <View style={styles.redirectContainer}>
                    <Text style={styles.redirectText}>
                        {prefixLink} 
                    </Text>
                    <TouchableOpacity onPress={redirect}>
                        <Text style={styles.redirectLink}>{linkText}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
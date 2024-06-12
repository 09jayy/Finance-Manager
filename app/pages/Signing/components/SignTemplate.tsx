import { ReactNode } from "react";
import { Image, SafeAreaView, View, Text, TouchableOpacity} from "react-native"
import { styles } from "../StyleSheet"

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
                </View>
                {children}
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
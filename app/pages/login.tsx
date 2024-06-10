import {View, Text, StyleSheet} from "react-native"

export default function LoginPage() {
    return (
        <View style= { styles.container }>
            <Text>Home Screen Lol does this work</Text>
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
});
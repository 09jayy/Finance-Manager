import {Text, View, StyleSheet} from "react-native"

type LabelProps = {
    title: string
    value: string
}

export const Label = ({title, value} : LabelProps) => {
    
    return (
        <View style={styles.textContainer}>
            <Text style={styles.label}>{title}: </Text><Text style={styles.value}>{value}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    textContainer: {
        backgroundColor: "white",
        padding: 5, 
        display: "flex",
        flexDirection: "row"
    },
    label: {
        paddingLeft: 10,
        fontSize: 16
    },
    value: {
        paddingLeft: 15,
        fontSize: 16
    }
})
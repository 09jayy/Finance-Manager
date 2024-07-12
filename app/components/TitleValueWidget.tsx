import { View, Text, StyleSheet } from "react-native"

type TitleValueWidgetProps = {
    title: string 
    value: string
}

export const TitleValueWidget = ({title,value}: TitleValueWidgetProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        paddingBottom: 10, 
        paddingTop: 10,
        flexDirection: "row",
        backgroundColor: "#f2f2f2", 
        borderRadius: 10
    },
    title: {
        flex: 1, 
        fontSize: 16
    },
    value: {
        fontSize: 16
    }
})
import { View, Text, StyleSheet } from "react-native"

type TitleValueWidgetProps = {
    title: string 
    value: string
    direction: "row" | "column"
    styleProp: {title: object, value: object}
}

export const TitleValueWidget = ({title,value, direction, styleProp}: TitleValueWidgetProps) => {
    return (
        <View style={{...styles.container, flexDirection: direction}}>
            <Text style={styleProp.title}>{title}</Text>
            <Text style={styleProp.value}>{value}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        paddingBottom: 10, 
        paddingTop: 10,
        backgroundColor: "#f2f2f2", 
        borderRadius: 10,
        margin: 2
    }
})
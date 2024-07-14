import { ReactNode } from "react"
import { TouchableOpacity, View, Text, StyleSheet } from "react-native"
import { AntDesign } from '@expo/vector-icons'

type ParentWidgetProps = {
    title: string
    showAdd: boolean
    addFunction?: () => void
    children: ReactNode
}

export const Widget = ({title, showAdd, addFunction, children}: ParentWidgetProps) => {
    return (
        <View style={styles.widget}>
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>

                { showAdd && 
                    <TouchableOpacity onPress={addFunction} style={styles.plusBtn}>
                        <AntDesign name="plus" size={18} color="black"/>
                    </TouchableOpacity> 
                }
            </View>
            <View style={styles.children}>
                {children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    widget: {
        margin: 20,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "white"
    }, 
    header: {
        flexDirection: "row"
    },
    title: {
        fontSize: 20,
        flexGrow: 1,
        fontWeight: "600"
    },
    plusBtn: {
        marginRight: 10,
        backgroundColor: "#e8e8e8",
        borderRadius: 10,
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center"
    },
    textBtn: {
        fontSize: 20
    },
    children: {

    }
})
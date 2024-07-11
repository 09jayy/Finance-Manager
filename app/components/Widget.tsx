import { ReactNode } from "react"
import { TouchableOpacity, View, Text, StyleSheet } from "react-native"

type ParentWidgetProps = {
    title: string
    showAdd: boolean
    addFunction?: () => {}
    children: ReactNode
}

export const Widget = ({title, showAdd, addFunction, children}: ParentWidgetProps) => {
    return (
        <View style={styles.widget}>
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>

                { showAdd && 
                    <TouchableOpacity onPress={() => addFunction} style={styles.plusBtn}>
                        <Text style={styles.textBtn}>+</Text>
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
        flexGrow: 1
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
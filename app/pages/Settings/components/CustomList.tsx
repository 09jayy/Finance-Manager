import {View, Text, StyleSheet} from "react-native"
import {ReactNode} from "react"

type SectionListProps = {
    title: string
    children: ReactNode
}

export const CustomList = ({title, children}: SectionListProps) => {
    return (
        <View>
            <Text style={styles.title}>{title}</Text>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18, 
        padding: 10,
        fontWeight: "bold"
    }
})


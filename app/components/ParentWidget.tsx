import { ReactNode } from "react"
import { TouchableOpacity, View, Text } from "react-native"

type ParentWidgetProps = {
    title: string
    showAdd: boolean
    addFunction?: () => {}
    children: ReactNode
}

export const ParentWidget = ({title, showAdd, addFunction, children}: ParentWidgetProps) => {
    return (
        <View>
            <View>
                <Text>{title}</Text>

                { showAdd && 
                    <TouchableOpacity onPress={() => addFunction}>
                        <Text>+</Text>
                    </TouchableOpacity> 
                }
            </View>
            <View>
                {children}
            </View>
        </View>
    )
}
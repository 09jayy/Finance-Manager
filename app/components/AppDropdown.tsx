import { Dispatch, SetStateAction } from "react"
import {StyleSheet, View, Text} from "react-native"
import SelectDropdown from "react-native-select-dropdown"

type AppDropdownProps = {
    data: Object[]
    setSelectedId: Dispatch<SetStateAction<string>>
}

export const AppDropdown = ({data, setSelectedId}: AppDropdownProps) => {
    return (
        <SelectDropdown
                    data={data}
                    onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index)
                        setSelectedId(selectedItem.id)
                    }}
                    renderButton={(selectedItem, isOpened) => {
                        return (
                            <View style={dropDownStyles.dropdownButtonStyle}>
                                <Text style={dropDownStyles.dropdownButtonTxtStyle}>
                                    {(selectedItem && selectedItem.title) || 'Select Bank'}
                                </Text>
                            </View>
                        )
                    }}
                    renderItem={(item, index, isSelected) => {
                        return (
                            <View style={{...dropDownStyles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                                <Text style={dropDownStyles.dropdownItemTxtStyle}>{item.title}</Text>
                            </View>
                        )
                    }}
                    showsVerticalScrollIndicator={false}
                    dropdownStyle={dropDownStyles.dropdownMenuStyle}
                />
    )
}

const dropDownStyles = StyleSheet.create({
    dropdownButtonStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 18,
        color: '#151E26',
    },
    dropdownMenuStyle: {
        backgroundColor: '#E9ECEF',
        borderRadius: 8,
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
    }
})
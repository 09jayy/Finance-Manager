import { Dispatch, SetStateAction } from "react"
import {StyleSheet, View, Text} from "react-native"
import SelectDropdown from "react-native-select-dropdown"

type AppDropdownProps = {
    data: Object[]
    setSelectedId: Dispatch<SetStateAction<string>>
    defaultValue?: Object
}

export const AppDropdown = ({data, setSelectedId, defaultValue}: AppDropdownProps) => {
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
            showsVerticalScrollIndicator={true}
            dropdownStyle={dropDownStyles.dropdownMenuStyle}
            defaultValue={defaultValue}
        />
    )
}

const dropDownStyles = StyleSheet.create({
    dropdownButtonStyle: {
        height: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 16,
        color: '#151E26',
    },
    dropdownMenuStyle: {
        backgroundColor: '#E9ECEF',
        borderRadius: 8,
        height: 200
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#B1BDC8',
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 18,
        color: '#151E26',
        textAlign: 'center',
    },
})
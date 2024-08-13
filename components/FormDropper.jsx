import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { Picker } from '@react-native-picker/picker'
import { Dropdown } from 'react-native-element-dropdown'


const FormDropper = ({title, value, handleValueChange, otherStyles, children, data, ...props}) => {
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

      <View className="border-2 border-black-100 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center">
        <Dropdown
          className="w-full h-full"
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Select item'}
          searchPlaceholder="Search..."
          value={value}
          onChange={item => {
            handleValueChange(item.value);
          }}
        />
      </View>
    </View>
  )
}

export default FormDropper
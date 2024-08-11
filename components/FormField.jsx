import { View, Text, TextInput } from 'react-native'
import React from 'react'

const FormField = ({title, value, handleChangeText, otherStyles, keyboardType, placeholder, ...props}) => {


  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

      <View className="border-2 border-black-100 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center">
        <TextInput 
          className="flex-1 text-white font-psemibold text-base pt-2"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={`${keyboardType == "password" ? true : false}`}
        />
      </View>
    </View>
  )
}

export default FormField
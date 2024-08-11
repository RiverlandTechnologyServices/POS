import { View, Text, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'

const Category = ({active, id, children, handlePress}) => {
  const [elementActive, setElementActive] = useState(false)
  useEffect(() => {
    if(active === id)
    {
      setElementActive(true);
    }
    else
    {
      setElementActive(false);
    }
  }, [active])
  return (
    <>
      <TouchableWithoutFeedback onPress={() => {handlePress(id)}}>
        <View className={`${elementActive ? "bg-secondary" : "bg-black-100"} w-full h-12 items-center justify-center`}>
          <Text>{children}</Text>
        </View>
      </TouchableWithoutFeedback>
    </>
  )
}

export default Category
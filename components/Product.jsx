import { View, Text, TouchableWithoutFeedback, Image } from 'react-native'
import React from 'react'

const Product = ({product, handlePress}) => {
    
    return (
      <>
        <TouchableWithoutFeedback onPress={() => {handlePress(product)}}>
          <View className={`bg-secondary w-1/5 h-48 items-center justify-center border-2 border-black-100`}>
            <Image style={{width: 64, height: 64}} source={{uri: product.image_url}} resizeMode='contain' />
            <Text>{product.name}</Text>
            <Text>${product.price/100}</Text>
          </View>
        </TouchableWithoutFeedback>
      </>
    )
}

export default Product
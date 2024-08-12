import { View, Text, ScrollView, TouchableHighlight } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../context/GlobalProvider';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'

const Cart = ({stateCart, removeFromCart}) => {
  const [cartElements, setCartElements] = useState([])

  const {cart, setCart} = useGlobalContext();


  useEffect(() => {
    var tempCartElements = []

    console.log("Cart: ")
    console.log(cart)

    for(item in cart)
    {
      if(cart[item])
        tempCartElements.push((<View key={cart[item] ? cart[item].product_id : ""} className="bg-black-100 font-pregular h-36 items-center justify-center w-full flex-row"><View className="w-2/12 h-full justify-center items-center"><View className="p-2 border-2 border-secondary rounded-md"><Text>{cart[item] ? cart[item].quantity : ""}</Text></View></View><View className="h-full justify-center items-center w-8/12"><Text>{cart[item] ? cart[item].name : ""}</Text><Text>${cart[item] ? cart[item].price/100 : ""}</Text></View><View className="w-2/12 h-full justify-center items-center"><TouchableHighlight onPress={() => {removeFromCart(cart[item])}}><View className="p-2"><FontAwesomeIcon icon={faCircleXmark} size={20}></FontAwesomeIcon></View></TouchableHighlight></View></View>))
    }
    setCartElements(tempCartElements);
  }, [cart])

  return (
    <ScrollView>
      <View className="h-full">
        {cartElements}
      </View>
    </ScrollView>
  )
}

export default Cart
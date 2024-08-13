import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Product from './Product'

const ProductsList = ({products, addToCart}) => {
  const [productElements, setProductElements] = useState([])

  function getCombn(data) {
    //const pairs = Object.keys(settings).slice(1).reduce((acc, key)=>(acc.flatMap(v=>Object.entries(settings[key]).map(s=>[...v, s]))), Object.entries(settings[Object.keys(settings)[0]]).map(v=>[v]));
    return Object.keys(data).reduce(
      (perms, key) => Object.keys(data[key]).flatMap(
          option => perms.map(perm => ({...perm, [key]: option}))
      ),
      [{}]
  ); 
    //return pairs
  
  }

  useEffect(() => {
    var productsTemp = [];
  
    for(const product in products)
    {
      if(Object.keys(products[product].variations).length !== 0)
      {
        const variations = getCombn(products[product].variations);
        for(const variation in variations)
        {
          variantName = "";
          variantPrice = 0;
          for(const variationName in variations[variation])
          {
            variantName += variations[variation][variationName] + " ";
            variantPrice += products[product].variations[variationName][variations[variation][variationName]]
          }
          console.log(variantPrice)
          console.log(variantName)
          productsTemp.push((<Product key={products[product].product_id+variantName} product={{...products[product], name: products[product].name + " " + variantName, price: products[product].price + variantPrice, variation: variations[variation], key: products[product].product_id+variantName}} handlePress={(product) => {addToCart(product)}}></Product>))

        }
      }
      else
        productsTemp.push((<Product key={products[product].product_id} product={{...products[product], key: products[product].product_id}} handlePress={(product) => {addToCart(product)}}></Product>))
    }

    setProductElements(productsTemp);
  }, [products, addToCart])
  
  return (
    <ScrollView>
      <View className="flex-wrap flex-row">
        {productElements}
      </View>
    </ScrollView>
  )
}

export default ProductsList
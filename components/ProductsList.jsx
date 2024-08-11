import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Product from './Product'

const ProductsList = ({products, addToCart}) => {
  const [productElements, setProductElements] = useState([])

  function getCombn(data) {
    //const pairs = Object.keys(settings).slice(1).reduce((acc, key)=>(acc.flatMap(v=>Object.entries(settings[key]).map(s=>[...v, s]))), Object.entries(settings[Object.keys(settings)[0]]).map(v=>[v]));
    Object.keys(data).reduce(
      (perms, key) => Object.keys(data[key]).flatMap(
          option => perms.map(
              perm => {
                  const newperm = {...perm};
                  newperm[key] = option;
                  return newperm
              }
          )
      ),
      [{}]
  ); 
  
  }

  useEffect(() => {
    var productsTemp = [];
  
    for(const product in products)
    {
      if(Object.keys(products[product].variations).length !== 0)
      {
        console.log(products[product].variations);
        console.log(getCombn(products[product].variations));
      }
      productsTemp.push((<Product key={products[product].product_id} product={products[product]} handlePress={(product) => {addToCart(product)}}></Product>))
    }

    setProductElements(productsTemp);
  }, [products])
  
  return (
    <ScrollView>
      <View className="flex-wrap flex-row">
        {productElements}
      </View>
    </ScrollView>
  )
}

export default ProductsList
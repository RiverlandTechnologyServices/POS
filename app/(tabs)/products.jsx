import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Category from '../../components/Category'
import Categories from '../../components/Categories'
import ProductsList from '../../components/ProductsList'
import { useGlobalContext } from '../../context/GlobalProvider'

const Products = () => {
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState([])
  const [products, setProducts] = useState([])

  const {cart, setCart} = useGlobalContext();

  const addToCart = (productID, value) => {
    const product = cart.find((o, i) => {
        if(o.productID === productID && deepEqual(o.variations, value.variations))
        {
            cart[i].quantity += value.quantity;
            return true;
        }
    });
    if(!product)
    {
        cart.push({productID: productID, quantity: value.quantity, variations: value.variations});
    }
    setCart(cart);
  };

  const removeFromCart = (productID, quantity) => {
    var cart = getCart();
    if(quantity > cart[productID])
    {
        cart[productID] = undefined;
    }
    else if(quantity === cart[productID])
    {
        cart[productID] = undefined;
    }
    else
    {
        cart[productID].quantity -= quantity;
    }
    setCart(cart);
  };

  const getCategories = () => {
    const requestOptions = {
      method: 'GET'
    };
    fetch('https://riverlandtech.au/api/v1/products/categories.php', requestOptions)
      .then(response => response.json())
      .then((data) => {
          setCategories(data.categories)
    });
  }

  const getProducts = (category_id) => {
    requestOptions = {
      method: 'GET'
  };
  fetch('https://riverlandtech.au/api/v1/products/products.php?order=ascending&category_id=' + category_id, requestOptions)
      .then(response => response.json())
      .then((data) => {
          setProducts(data.products);
      });
  }

  useEffect(() => {
    getCategories();
  }, [])

  useEffect(() => {
    getProducts(activeCategory)
  }, [activeCategory])

  return (
    <SafeAreaView>
      <View className="flex-row h-full bg-primary">
        <View className="w-1/12">
          <Categories categories={categories} onCategoryChange={setActiveCategory}/>
        </View>
        <View className="w-9/12">
          <ProductsList products={products} />
        </View>
        

      </View>
    </SafeAreaView>
  )
}

export default Products
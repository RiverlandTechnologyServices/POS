import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Category from '../../components/Category'
import Categories from '../../components/Categories'
import ProductsList from '../../components/ProductsList'
import { useGlobalContext } from '../../context/GlobalProvider'
import Cart from '../../components/Cart'

const Products = () => {
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState([])
  const [products, setProducts] = useState([])
  const [stateCart, setStateCart] = useState([])

  const {cart, setCart} = useGlobalContext();

  function deepEqual(x, y) {
    const ok = Object.keys, tx = typeof x, ty = typeof y;
    return x && y && tx === 'object' && tx === ty ? (
      ok(x).length === ok(y).length &&
        ok(x).every(key => deepEqual(x[key], y[key]))
    ) : (x === y);
  }

  const addToCart = (product) => {
    var tempCart = cart;
    const foundProduct = tempCart.find((o, i) => {
        if(o.product_id === product.product_id && deepEqual(o.variation, product.variation))
        {
          tempCart[i].quantity += 1;
            return true;
        }
    });
    if(!foundProduct)
    {
      tempCart.push({...product, quantity: 1});
    }
    setCart([...tempCart]);
  };

  const removeFromCart = (product) => {
    var tempCart = cart;
    const foundProduct = tempCart.find((o, i) => {
        if(o.product_id === product.product_id && deepEqual(o.variation, product.variation))
        {
            console.log("Removing Index: ", i);
            const x = tempCart.splice(i,1);
            console.log("Removed Object:")
            console.log(x);
            return true;
        }
    });
    if(!foundProduct)
    {

    }
    setCart([...tempCart]);
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
        <View className="w-8/12">
          <ProductsList products={products} addToCart={addToCart}/>
        </View>
        <View className="w-3/12 h-full">
          <Cart stateCart={stateCart} removeFromCart={removeFromCart}/>
        </View>

      </View>
    </SafeAreaView>
  )
}

export default Products
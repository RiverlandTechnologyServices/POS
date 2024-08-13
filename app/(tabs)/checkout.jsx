import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGlobalContext } from '../../context/GlobalProvider';
import Cart from '../../components/Cart';
import FormField from '../../components/FormField';
import FormDropper from '../../components/FormDropper';
import { Picker } from '@react-native-picker/picker';
import CustomButton from '../../components/CustomButton';
import { StripeTerminalProvider, useStripeTerminal } from '@stripe/stripe-terminal-react-native';

const Checkout = () => {
  const [form, setForm] = useState({
    name: "java",
    email: ""
  })

  const { initialize } = useStripeTerminal();
  const {cart, setCart, user} = useGlobalContext();

  const removeFromCart = (product) => {
    console.log(product);
    var tempCart = cart;
    tempCart.splice(product, 1)
    setCart([...tempCart])
  };

  const checkout = () => {

  }

  const fetchTokenProvider = async () => {
    var secret = "";
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: user })
    };
    await fetch('https://riverlandtech.au/api/v1/pos/connection_token.php', requestOptions)
      .then(response => response.json())
      .then(async (data) => {
        if(data.status == "success")
        {
          secret = data.token;
        }
    });
    return secret;
  };

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <StripeTerminalProvider
      logLevel="verbose"
      tokenProvider={fetchTokenProvider}
    >
      <SafeAreaView>
        <View className="flex-row h-full bg-primary">
          <View className="w-3/12 h-full">
            <Cart removeFromCart={removeFromCart}/>
          </View>

          <View className="w-9/12 h-full pt-7 px-4">
            <FormDropper title="Name" handleValueChange={(e, i) => {setForm({...form, name: e})}} value={form.name} >
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
            </FormDropper>
            <CustomButton handlePress={checkout} containerStyles="mt-4">
              Checkout
            </CustomButton>
          </View>
        </View>
      </SafeAreaView>
    </StripeTerminalProvider>
  )
}

export default Checkout
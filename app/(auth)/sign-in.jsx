import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { A } from '@expo/html-elements'
import { Redirect, router } from 'expo-router';
import ConfirmHcaptcha from '@hcaptcha/react-native-hcaptcha';
import * as SecureStore from 'expo-secure-store';

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  })
  const captchaRef = useRef(null)
  const [loading, setLoading] = useState(false);
  const [captchaCode, setCaptchaCode] = useState(null)
  const [captchaText, setCaptchaText] = useState("Show CAPTCHA")
  const [captchaState, setCaptchaState] = useState("waiting")

  const onMessage = (event) => {
    if (event && event.nativeEvent.data) {
      if (['cancel'].includes(event.nativeEvent.data)) {
        captchaRef.ref.hide();
        setCaptchaCode(event.nativeEvent.data);
      } else if (['error', 'expired'].includes(event.nativeEvent.data)) {
        captchaRef.ref.hide();
        setCaptchaCode(event.nativeEvent.data);
        setCaptchaState("error")
      } else if (event.nativeEvent.data === 'open') {
        console.log('Visual challenge opened');
        setCaptchaState("open")
      } else {
        console.log('Verified code from hCaptcha', event.nativeEvent.data);
        setCaptchaState("success")
        setCaptchaText("CAPTCHA Success!")
        captchaRef.ref.hide();
        setCaptchaCode(event.nativeEvent.data);
      }
    }
  };

  const submit = () => 
    {
      setLoading(true);
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password, hcaptcha: captchaCode })
    };
      fetch('https://riverlandtech.au/api/v1/account/login.php', requestOptions)
          .then(response => response.json())
          .then(async (data) => {
            console.log(data)
                  if(data.status == "success")
                  {
                      SecureStore.setItemAsync("sessionID", data.session_id).then((res) => {
                      router.push("/products")
                    });
                  }
                  else if(data.error == "no_account")
                  {
                    Alert.alert("Error", "Incorrect Username or Password")
                    setCaptchaState("waiting");
                    setCaptchaText("Show CAPTCHA");
                    setLoading(false);
                  }
                  else if(data.error == "general")
                  {
                    Alert.alert("Error", "Unknown Error")
                    setCaptchaState("waiting");
                    setCaptchaText("Show CAPTCHA");
                    setLoading(false);
                  }
                  else if(data.error == "captcha_failed")
                  {
                    Alert.alert("Error", "CAPTCHA Failed")
                    setCaptchaState("waiting");
                    setCaptchaText("Show CAPTCHA");
                    setLoading(false);
                  }
                  else
                  {
                    Alert.alert("Error", "Unknown Error")
                  }

              });
    }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center h-[85vh] px-4 my-6">
          <Image source={images.logo} resizeMode='contain' className="w-[115px] h-[115px]" />
          <Text className="text-2xl text-white font-psemibold pt-1 mt-10 text-semibold">Login to Riverland Technology Services</Text>

          <FormField 
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({...form, email: e})}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField 
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({...form, password: e})}
            otherStyles="mt-7"
            keyboardType="password"
          />

          <ConfirmHcaptcha
            ref={(_ref) => {captchaRef.ref = _ref}}
            siteKey="4d7c46f1-ca4d-4a11-9094-f2b82c046a82"
            baseUrl="https://hcaptcha.com"
            languageCode="en"
            onMessage={onMessage}
          />
          <CustomButton
            handlePress={() => {captchaRef.ref.show()}}
            containerStyles="mt-7"
            isLoading={captchaState === "success" ? true : false}
          >
            {captchaText}
          </CustomButton>

          <CustomButton
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={loading}
          >
            Login
          </CustomButton>

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">Don't have an account?</Text><A href="https://riverlandtech.au"><Text className="text-lg text-secondary font-pbold">Contact Us</Text></A>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn
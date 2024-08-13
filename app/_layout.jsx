import { StyleSheet, Text, View } from 'react-native'
import { Slot, Stack, SplashScreen } from 'expo-router'
import { useFonts } from 'expo-font'
import { useEffect } from 'react'
import GlobalProvider from '../context/GlobalProvider';


SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, err] = useFonts({
    "MartelSans-ExtraLight": require("../assets/fonts/MartelSans-ExtraLight.ttf"),
    "MartelSans-Light": require("../assets/fonts/MartelSans-Light.ttf"),
    "MartelSans-Regular": require("../assets/fonts/MartelSans-Regular.ttf"),
    "MartelSans-SemiBold": require("../assets/fonts/MartelSans-SemiBold.ttf"),
    "MartelSans-Bold": require("../assets/fonts/MartelSans-Bold.ttf"),
    "MartelSans-ExtraBold": require("../assets/fonts/MartelSans-ExtraBold.ttf"),
    "MartelSans-Black": require("../assets/fonts/MartelSans-Black.ttf"),
  })

  useEffect(() =>
    {
      if(err)
        throw err;
      else if(fontsLoaded) 
        SplashScreen.hideAsync();
      else
        return undefined;

    }, [fontsLoaded, err])
    
  return (
    <GlobalProvider>
      <Stack>
        <Stack.Screen name='index' options={{headerShown: false}} />
        <Stack.Screen name='(auth)' options={{headerShown: false}} />
        <Stack.Screen name='(tabs)' options={{headerShown: false}} />
        {/*<Stack.Screen name='/search/[query]' options={{headerShown: false}} />*/}
      </Stack>
    </GlobalProvider>
  )
}

export default RootLayout

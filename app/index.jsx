import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, Text, View } from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import CustomButton from '../components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider';

export default function App() {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if(!isLoading && isLoggedIn) return <Redirect href="/products"/>

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{height: "100%"}}>
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          <Image 
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode='contain'
          />

          <View className="relative mt-5">
            <Text className="text-3xl font-pbold pt-3 text-white text-center">Simplify In Person Sales with <Text className="text-secondary">RTS POS</Text></Text>
          </View>
          <CustomButton
              handlePress={() => router.push("/sign-in")}
              containerStyles="w-full mt-7"
            >
              Continue with Email
            </CustomButton>
        </View>
      </ScrollView>

      <StatusBar backgroundColor='#213018' style='light' />
    </SafeAreaView>
  );
}



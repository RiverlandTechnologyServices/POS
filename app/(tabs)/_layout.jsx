import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'
import { icons } from '../../constants'

const TabIcon = ({ icon, color, name, focused }) => {
  return ( 
    <View className="items-center justify-center gap-2 w-16">
      <Image 
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{color: color}}>
        {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#b1ec90",
        tabBarInactiveTintColor: "#adbdcc",
        tabBarStyle: {
          backgroundColor: "#213018",
          borderTopWidth: 1,
          borderTopColor: "#232533",
          height: 84,
          marginTop: 0
        }
      }}
      className=""
      >
        <Tabs.Screen
          name='products'
          options={{
            title: "Products",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
                <TabIcon 
                icon={icons.home}
                color={color}
                name="Products"
                focused={focused}
                />
          )
          }}
          />
          <Tabs.Screen
          name='checkout'
          options={{
            title: "Checkout",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
                <TabIcon 
                icon={icons.play}
                color={color}
                name="Checkout"
                focused={focused}
                />
          )
          }}
          />
      </Tabs>
    </>
  )
}

export default TabsLayout
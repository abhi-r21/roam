import { Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { AntDesign } from "@react-native-vector-icons/ant-design"
import { StatusBar } from "expo-status-bar"
import Checkbox from "expo-checkbox"
import React, { useState } from "react"


export default function Login() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#FBFBF7",
      }}
    >
      <StatusBar style="auto" animated />
      <View className="absolute top-1/3 left-1/2 z-10 w-full -translate-x-1/2 items-center">
        {/* <Image
          style={{ width: 100, height: 100 }}
          source={require("@/assets/expo.icon/Assets/yuvly_new.svg")}
          contentFit="cover"
        /> */}
        {/* <Text className="font-sans text-6xl font-semibold tracking-tight">
          Yuvly
        </Text>
        <Text className="font-sans text-3xl font-normal tracking-tight text-neutral-500">
          Your travel buddy.
        </Text> */}
      </View>
      <View className="h-full justify-end gap-2.5 px-4">
        <TouchableOpacity className="w-full flex-row items-center justify-center gap-3 rounded-full border-4 border-blue-400/80 bg-blue-500 py-5">
          <AntDesign name="google" color="#fff" size={20} />
          <Text className="text-lg font-medium text-white">
            Sign in with Google
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="w-full flex-row items-center justify-center gap-3 rounded-full border-4 border-neutral-800 bg-black py-5">
          <AntDesign name="apple" color="#fff" size={20} />
          <Text className="text-lg font-medium text-white">
            Sign in with Apple
          </Text>
        </TouchableOpacity>

        <View className="mt-10 max-w-108 flex-row items-start gap-3 px-6">
          <Checkbox value={isChecked} onValueChange={setIsChecked} />
          <Text className="text-sm text-neutral-500/90">
            I agree to Yuvly's{" "}
            <Text className="font-medium text-neutral-800">
              Terms of Service
            </Text>{" "}
            and{" "}
            <Text className="font-medium text-neutral-800">Privacy Policy</Text>
            . Your messages and data may be processed by third-party AI
            providers to deliver our service.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

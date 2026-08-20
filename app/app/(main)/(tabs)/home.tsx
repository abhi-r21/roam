import { ChatInput } from "@/components/chat/chat-input";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView className="flex-1">
      <View className="h-full relative p-3">
        <View className="flex-1"></View>
        <ChatInput />
      </View>
    </SafeAreaView>
  );
}

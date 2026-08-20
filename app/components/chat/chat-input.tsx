import { TextInput, View } from "react-native";

export function ChatInput() {
  return (
    <View className="bg-white flex-row items-center rounded-xl p-4 w-full">
      <TextInput
        placeholder="hi there"
        placeholderTextColor={"#737373"}
        className="w-full"
      />
    </View>
  );
}

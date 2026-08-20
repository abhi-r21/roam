import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
    return <SafeAreaView>
        <View className="p-4">
            <Text>Hi from Settings</Text>
        </View>
    </SafeAreaView>
}
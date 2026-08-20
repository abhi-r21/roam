import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
    return <SafeAreaView>
        <View className="p-4 ">
            <Text>Hi from Index</Text>
        </View>
    </SafeAreaView>
}
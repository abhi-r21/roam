import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
    const router = useRouter();

    return <SafeAreaView>
        <View>
            <TouchableOpacity
                onPress={() => router.push("/(auth)/login")}
            >
                <Text>
                    Login
                </Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
}
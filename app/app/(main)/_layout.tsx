import { useAuth } from "@clerk/expo";
import { Redirect, Stack } from "expo-router";

export default function MainLayout () {
    const { isLoaded, isSignedIn } = useAuth();

    if (!isLoaded) {
        return null
    }

    if (!isSignedIn) {
        return <Redirect href={"/(auth)/login"} />
    }

    return <Stack />
}
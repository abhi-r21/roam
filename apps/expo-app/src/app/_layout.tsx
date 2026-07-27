import "../globals.css"
import { Stack } from "expo-router"
import { ClerkProvider } from "@clerk/expo"
import { tokenCache } from "@clerk/expo/token-cache"

const pulishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!pulishableKey) {
  throw new Error("Add your Clerk Publishable Key to the .env file")
}

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={pulishableKey}>
      <Stack screenOptions={{ headerShown: false }} />
    </ClerkProvider>
  )
}

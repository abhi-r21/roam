import { Redirect } from "expo-router";
import { useAuth } from "@clerk/expo";

export default function Index() {

    return <Redirect href={"/(main)/home"} />
}
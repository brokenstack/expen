import { Link } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthScreen() {
  return (
    <SafeAreaView>
      <Text style={{ color: "white" }}>Auth</Text>
      <Link href="/(tabs)" style={{ color: "white" }}>
        Continue
      </Link>
    </SafeAreaView>
  );
}

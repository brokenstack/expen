import { ActivityIndicator, View } from "react-native";

export default function AuthCheck() {
  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator size={"large"} color={"white"} />
    </View>
  );
}

import { CurrentToast } from "@/components/toast";
import { APP_DATA } from "@/constants/index";
import { STRINGS } from "@/constants/strings";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, H3, Text, View, YStack } from "tamagui";

export default function AuthScreen() {
  return (
    <SafeAreaView>
      <View height={"100%"} jc={"flex-end"} pb="$10">
        <View p={20} gap={20}>
          <YStack>
            <H3>{APP_DATA.name}</H3>
            <Text color={"$gray9Light"}>{APP_DATA.tagline}</Text>
          </YStack>
          <Button w="100%">
            <Link
              href="/auth/telegram"
              style={{
                color: "white",
              }}
            >
              {STRINGS.login_telegram}
            </Link>
          </Button>
        </View>
      </View>
      <CurrentToast />
    </SafeAreaView>
  );
}

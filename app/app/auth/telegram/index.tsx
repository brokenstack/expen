import { ENDPOINTS, LINKS } from "@/constants";
import { STRINGS } from "@/constants/strings";
import { useSession } from "@/context/Authentication";
import { ToastViewport, useToastController } from "@tamagui/toast";
import { router } from "expo-router";
import { useState } from "react";
import { Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, XStack } from "tamagui";
import { Button, H3, H4, Input, Text, View } from "tamagui";

export default function TelegramAuth() {
  const [code, setCode] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isActive, setIsActive] = useState<boolean>(true);
  const toast = useToastController();

  const { saveToken } = useSession();

  async function handleContinue() {
    setIsActive(false);
    if (!code) {
      setError(STRINGS.errors.enter_valid_code);
    }

    try {
      const response = await fetch(
        `${LINKS.server_url}/${ENDPOINTS.auth.telegram}`,
        {
          method: "POST",
          body: JSON.stringify({
            code: code,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data: {
          appToken: string;
          message: string;
        } = await response.json();

        try {
          await saveToken(data.appToken);
          router.replace("(tabs)");
        } catch (e) {
          toast.show(STRINGS.errors.something_went_wrong, {
            message: STRINGS.errors.try_later,
          });
        }
      } else if (response.status === 404) {
        toast.show(STRINGS.errors.user_not_found, {
          message: STRINGS.errors.try_diff_code,
        });
      } else {
        toast.show(STRINGS.errors.something_went_wrong, {
          message: STRINGS.errors.try_later,
        });
      }
    } catch (e) {
      toast.show(STRINGS.errors.something_went_wrong, {
        message: STRINGS.errors.couldnt_connect,
      });
    }
    setIsActive(true);
  }

  return (
    <SafeAreaView>
      <View h={"100%"} w={"100%"} gap={20} p={30}>
        <View>
          <ToastViewport als={"center"} />
        </View>
        <XStack ai={"center"} gap={10}>
          <Image
            source={require("../../../assets/images/telegram.png")}
            w={28}
            h={28}
          />
          <H3>{STRINGS.screen_telegram.main_heading}</H3>
        </XStack>

        <View gap={5}>
          <H4>{STRINGS.screen_telegram.step1}</H4>
          <Text>{STRINGS.screen_telegram.step1_description}</Text>
          <Button
            onPress={() => {
              Linking.openURL(LINKS.bot);
            }}
          >
            Get Code
          </Button>
        </View>

        <View gap={5}>
          <H4>{STRINGS.screen_telegram.step2}</H4>
          <Text>{STRINGS.screen_telegram.step_2_description}</Text>
          <Input
            onChangeText={(code) => {
              setCode(code);
              setError(undefined);
            }}
            placeholder={STRINGS.placeholders.paste_code_here}
          />
          {error && <Text color="$red9">{error}</Text>}
        </View>
        <Button disabled={!isActive} onPress={handleContinue}>
          Continue
        </Button>
      </View>
    </SafeAreaView>
  );
}

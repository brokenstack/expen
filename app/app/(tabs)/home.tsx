import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { H2, Card, View, Text, H4, YStack, XStack, Button } from "tamagui";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <View height={"100%"}>
        <View py={30} gap={20}>
          <Text fontSize={20} color={"$accentColor"} fontWeight={"bold"}>
            Hello, Alok!
          </Text>
          <Card padding={20}>
            <XStack justifyContent="space-between">
              <YStack>
                <Text color={"$gray8Light"}>this month, spent</Text>
                <H2 padding="300">₹ 8395.32</H2>
              </YStack>

              <XStack alignItems="center" justifyContent="center" gap={10}>
                <Button
                  backgroundColor={"$gray5Dark"}
                  borderRadius={"$10"}
                  size={"$5"}
                  circular={true}
                  alignItems="center"
                  justifyContent="center"
                >
                  <FontAwesome name="microphone" size={24} color="white" />
                </Button>
                <Button
                  backgroundColor={"$gray5Dark"}
                  borderRadius={"$10"}
                  size={"$5"}
                  circular={true}
                  alignItems="center"
                  justifyContent="center"
                >
                  <AntDesign name="plus" size={24} color={"white"} />
                </Button>
              </XStack>
            </XStack>
          </Card>
        </View>
        <H4>Today</H4>
        <View>
          <XStack justifyContent="space-between" mt={10}>
            <XStack ai={"center"} gap={15}>
              <Text fontSize={35}>🥘</Text>
              <YStack>
                <Text fontSize={17}>Eggs</Text>
                <Text fontSize={12} color={"$gray11Dark"}>
                  Food
                </Text>
              </YStack>
            </XStack>
            <YStack alignItems="center" alignSelf="center">
              <Text fontSize={17}>₹150</Text>
              <Text fontSize={12} color={"$gray11Dark"}>
                09:30 AM
              </Text>
            </YStack>
          </XStack>
          <XStack justifyContent="space-between" mt={10}>
            <XStack ai={"center"} gap={15}>
              <Text fontSize={35}>🚍</Text>
              <YStack>
                <Text fontSize={17}>Lake View Ride</Text>
                <Text fontSize={12} color={"$gray11Dark"}>
                  Transport
                </Text>
              </YStack>
            </XStack>
            <YStack alignItems="center" alignSelf="center">
              <Text fontSize={17}>₹70</Text>
              <Text fontSize={12} color={"$gray11Dark"}>
                07:45 AM
              </Text>
            </YStack>
          </XStack>
        </View>
      </View>
    </SafeAreaView>
  );
}

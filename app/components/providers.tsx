import { SessionProvider } from "@/context/Authentication";
import tamaguiConfig from "@/tamagui.config";
import { ThemeProvider, DarkTheme } from "@react-navigation/native";
import { ToastProvider } from "@tamagui/toast";
import { ReactNode } from "react";
import {
  SafeAreaFrameContext,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import { TamaguiProvider } from "tamagui";

interface ProviderProps {
  children?: ReactNode;
}

export const Providers: React.FC<ProviderProps> = ({ children }) => {
  return (
    <SafeAreaProvider>
      <SessionProvider>
        <TamaguiProvider config={tamaguiConfig} defaultTheme={"dark"}>
          <ThemeProvider value={DarkTheme}>
            <ToastProvider>{children}</ToastProvider>
          </ThemeProvider>
        </TamaguiProvider>
      </SessionProvider>
    </SafeAreaProvider>
  );
};

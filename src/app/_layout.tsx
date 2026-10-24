import { Tabs, Slot } from "expo-router";
import { House, UserRound, Settings2 } from "lucide-react-native";
import { AppThemeProvider, useAppTheme } from "@/theme/color";
import { Settings } from "react-native";
import { Stack } from "expo-router";
import { AuthProvider } from "@/context/AuthContext";
export default function RootLayout() {
  return (
    <AuthProvider>
      <AppThemeProvider>
        <AppTabs />
      </AppThemeProvider>
     </AuthProvider>
  );
}

function AppTabs() {
  const { colors } = useAppTheme();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
      <Slot />
    </Stack>
  );
}

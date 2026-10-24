import { Tabs } from "expo-router";
import { House, UserRound ,Settings2} from "lucide-react-native";
import { AppThemeProvider, useAppTheme } from "@/theme/color";
import { Settings } from "react-native";

export default function RootLayout() {
  return (
    <AppThemeProvider>
      <AppTabs />
    </AppThemeProvider>
  );
}

function AppTabs() {
  const { colors } = useAppTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
   
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          paddingTop: 8,
          
        },
        tabBarLabelStyle: { fontSize: 12, fontWeight: "600" },
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.primary,
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, size }) => <House color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          tabBarIcon: ({ color, size }) => <UserRound color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        
        options={{
          title: "Settings",
           tabBarIcon: ({ color, size }) => <Settings2 color={color} size={size} />,
          
        }}
      />
    </Tabs>
  );
}

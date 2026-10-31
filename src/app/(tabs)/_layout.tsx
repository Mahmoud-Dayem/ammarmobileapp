import { Tabs } from "expo-router";
import { Alert, Pressable, Text } from "react-native";
import { House, LogOut, Settings2, UserRound } from "lucide-react-native";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { useAppTheme } from "@/theme/color";

function LogoutButton() {
  const { colors } = useAppTheme();
  const { setUser } = useAuth();

  const logOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      setUser(null);
    } catch (error) {
      Alert.alert(
        "Unable to log out",
        error instanceof Error ? error.message : "Please try again.",
      );
    }
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Log out"
      hitSlop={8}
      onPress={() => void logOut()}
      style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
    >
      <LogOut color={colors.primary} size={18} />
      <Text style={{ color: colors.primary, fontSize: 14, fontWeight: "600" }}>
        Log out
      </Text>
    </Pressable>
  );
}

export default function TabLayout() {
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
        headerRight: () => <LogoutButton />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
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
        name="products"
        options={{
          title: "Products",
          tabBarIcon: ({ color, size }) => <Settings2 color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}

import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { router, useLocalSearchParams,usePathname } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useAppTheme } from "@/theme/color";

export default function DynamicRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors } = useAppTheme();
  const path = usePathname()
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Go back"
        onPress={() => {
          if (router.canGoBack()) {
            router.back();
          } else {
            router.replace("/(tabs)");
          }
        }}
        style={({ pressed }) => [
          styles.backButton,
          { borderColor: colors.border, backgroundColor: colors.surface },
          pressed && styles.backButtonPressed,
        ]}
      >
        <ArrowLeft size={20} color={colors.primary} />
        <Text style={[styles.backButtonText, { color: colors.primary }]}>
          Back
        </Text>
      </Pressable>
      <View style={styles.profile}>
        <Image
          source={{ uri: `https://avatars.githubusercontent.com/u/${id}?v=4` }}
          style={styles.avatar}
          accessibilityLabel={`GitHub avatar for user ${id}`}
        />
        <Text style={{ color: colors.text }}>GitHub user ID: {id}</Text>
        <Text style={{ color: colors.text }}>path name {path}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  backButton: {
    alignSelf: "flex-start",
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 14,
  },
  backButtonPressed: {
    opacity: 0.7,
  },
  backButtonText: {
    fontSize: 15,
    fontWeight: "600",
  },
  profile: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  avatar: {
    width: 160,
    height: 160,
    borderRadius: 80,
  },
});

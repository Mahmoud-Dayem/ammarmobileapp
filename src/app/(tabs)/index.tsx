import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowDownRight,
  ArrowUpRight,
  Moon,
  Sparkles,
  Sun,
} from "lucide-react-native";
import CustomButton from "@/assets/components/CustomButton";
import { useAppTheme, type AppColors } from "@/theme/color";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";

export default function Index() {
  const { colors, mode, toggleTheme } = useAppTheme();
  const styles = createStyles(colors);
 const router  =useRouter()

const handleDynamicRoute = () => {
  const user = useAuth();
  const randomId = Math.floor(Math.random() * 100000);
  router.push({
    pathname: "/[id]",
    params: { id: String(randomId) },
  });
};

  return (
    <SafeAreaView style={styles.screen} edges={["top", "left", "right"]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.brand}>
              <View style={styles.brandMark}>
                <Text style={styles.brandLetter}>a.</Text>
              </View>
              <Text style={styles.brandName}>{process.env.EXPO_PUBLIC_MY_NAME}</Text>
            </View>
            <View style={styles.badge}>
              <View style={styles.dot} />
              <Text style={styles.badgeText}>A little space for you</Text>
            </View>
            <Pressable
              accessibilityRole="switch"
              accessibilityLabel="Dark mode"
              accessibilityState={{ checked: mode === "dark" }}
              onPress={toggleTheme}
              style={({ pressed }) => [
                styles.themeToggle,
                pressed && styles.pressed,
              ]}
            >
              {mode === "dark" ? (
                <Sun size={18} color={colors.primary} />
              ) : (
                <Moon size={18} color={colors.primary} />
              )}
              <Text style={styles.themeToggleText}>
                {mode === "dark" ? "Light mode" : "Dark mode"}
              </Text>
            </Pressable>
          </View>

          <View style={styles.hero}>
            <Text style={styles.eyebrow}>MAKE YOURSELF AT HOME</Text>
            <Text accessibilityRole="header" style={styles.title}>
              Good things{"\n"}start here<Text style={styles.titleDot}>.</Text>
            </Text>
            <Text style={styles.subtitle}>
              A fresh start, a familiar place.{"\n"}Welcome to my corner of the
              world.
            </Text>
          </View>

          <View
            style={styles.artwork}
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
          >
            <View style={styles.orbit} />
            <View style={styles.orbitInner} />
            <View style={styles.sun}>
              <Sparkles size={28} color={colors.primary} strokeWidth={1.5} />
            </View>
            <View style={styles.artCard}>
              <View style={styles.cardTop}>
                <View style={styles.smallDot} />
                <Text style={styles.cardLabel}>YOUR NEXT CHAPTER</Text>
              </View>
              <Text style={styles.artTitle}>Hello,{"\n"}possibility.</Text>
              <View style={styles.cardBottom}>
                <Text style={styles.cardCaption}>Something good is ahead</Text>
                <ArrowUpRight size={24} color={colors.artAccent} />
              </View>
            </View>
            <View style={styles.floatingLabel}>
              <View style={styles.labelIcon}>
                <ArrowDownRight size={18} color={colors.primary} />
              </View>
              <Text style={styles.floatingText}>One step at a time.</Text>
            </View>
            <Text style={styles.artNumber}>01 / A NEW BEGINNING</Text>
          </View>

          <View style={styles.actions}>
            <CustomButton
              title="Click me"
              onPress={() => Alert.alert("Button clicked")}
              containerStyle={styles.loginButton}
              textStyle={styles.loginText}
            />
            <CustomButton
              title="open dynamic route"
              onPress={handleDynamicRoute}
              containerStyle={styles.loginButton}
              textStyle={styles.loginText}
            />
            <Link href="/about" asChild>
              <Pressable
                style={({ pressed }) => [
                  styles.aboutButton,
                  pressed && styles.pressed,
                ]}
                accessibilityRole="link"
              >
                <Text style={styles.aboutText}>A little about me</Text>
                <ArrowUpRight size={18} color={colors.primary} />
              </Pressable>
            </Link>
          </View>
          <View style={styles.footer}>
            <View style={styles.footerLine} />
            <Text style={styles.footerText}>
              MADE WITH CARE. BUILT TO EXPLORE.
            </Text>
            <View style={styles.footerLine} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: AppColors) => StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  scrollContent: { flexGrow: 1, paddingHorizontal: 24, paddingVertical: 24 },
  content: { width: "100%", maxWidth: 480, alignSelf: "center", flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    flexWrap: "wrap",
  },
  brand: { flexDirection: "row", alignItems: "center", gap: 9 },
  brandMark: {
    width: 35,
    height: 35,
    backgroundColor: colors.primary,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  brandLetter: {
    color: colors.primaryLight,
    fontSize: 25,
    fontWeight: "700",
    marginTop: -3,
  },
  brandName: {
    fontSize: 22,
    color: colors.primary,
    fontWeight: "700",
    letterSpacing: -1,
  },
  badge: { flexDirection: "row", alignItems: "center", gap: 6 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.accent },
  badgeText: { fontSize: 11, color: colors.text },
  themeToggle: {
    minHeight: 42,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    backgroundColor: colors.surface,
  },
  themeToggleText: { color: colors.primary, fontSize: 13, fontWeight: "600" },
  hero: { marginTop: 48, marginBottom: 30 },
  eyebrow: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 2.2,
    color: colors.accentMuted,
    marginBottom: 16,
  },
  title: {
    fontSize: 48,
    lineHeight: 53,
    fontWeight: "600",
    letterSpacing: -2.4,
    color: colors.primaryDark,
  },
  titleDot: { color: colors.accentLight },
  subtitle: { fontSize: 15, lineHeight: 24, color: colors.textSecondary, marginTop: 17 },
  artwork: {
    height: 275,
    backgroundColor: colors.surfaceMuted,
    borderRadius: 28,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  orbit: {
    position: "absolute",
    width: 330,
    height: 330,
    borderRadius: 165,
    borderWidth: 1,
    borderColor: colors.borderMuted,
    right: -105,
    top: -85,
  },
  orbitInner: {
    position: "absolute",
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 1,
    borderColor: colors.borderMuted,
    right: -65,
    top: -45,
  },
  sun: {
    position: "absolute",
    right: 24,
    top: 22,
    width: 51,
    height: 51,
    borderRadius: 26,
    backgroundColor: colors.accentSurface,
    alignItems: "center",
    justifyContent: "center",
  },
  artCard: {
    width: "73%",
    backgroundColor: colors.primary,
    borderRadius: 19,
    padding: 22,
    transform: [{ rotate: "-7deg" }],
    marginTop: -10,
  },
  cardTop: { flexDirection: "row", alignItems: "center", gap: 7 },
  smallDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.accentBorder,
  },
  cardLabel: {
    fontSize: 8,
    letterSpacing: 1.4,
    fontWeight: "600",
    color: colors.textOnPrimaryMuted,
  },
  artTitle: {
    fontSize: 34,
    lineHeight: 39,
    letterSpacing: -1,
    fontWeight: "500",
    color: colors.textOnPrimary,
    marginTop: 18,
    marginBottom: 18,
  },
  cardBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 6,
  },
  cardCaption: { flex: 1, fontSize: 9, color: colors.textOnPrimaryMuted },
  floatingLabel: {
    position: "absolute",
    bottom: 36,
    right: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 9,
    paddingRight: 14,
    borderRadius: 13,
    backgroundColor: colors.surface,
    transform: [{ rotate: "4deg" }],
  },
  labelIcon: {
    width: 27,
    height: 27,
    borderRadius: 9,
    backgroundColor: colors.surfaceMuted,
    alignItems: "center",
    justifyContent: "center",
  },
  floatingText: { fontSize: 11, color: colors.primary, fontWeight: "600" },
  artNumber: {
    position: "absolute",
    bottom: 13,
    left: 20,
    fontSize: 8,
    letterSpacing: 1.5,
    color: colors.artTextMuted,
  },
  actions: { marginTop: 30, gap: 8 },
  loginButton: {
    backgroundColor: colors.tomato,
    borderRadius: 17,
    minHeight: 58,
    justifyContent: "center",
    width: "100%",
  },
  loginText: { fontSize: 16, fontWeight: "600", color: colors.white },
  aboutButton: {
    minHeight: 52,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 9,
    borderRadius: 16,
  },
  aboutText: { color: colors.primary, fontSize: 14, fontWeight: "500" },
  pressed: { backgroundColor: colors.surfaceMuted },
  footer: {
    marginTop: 26,
    marginBottom: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  footerLine: { flex: 1, height: 1, backgroundColor: colors.border },
  footerText: {
    fontSize: 8,
    letterSpacing: 1.3,
    color: colors.textMuted,
    textAlign: "center",
    flexShrink: 1,
  },
});

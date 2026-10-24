 
import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useAppTheme, type AppColors } from "@/theme/color";

const socialLinks = [
  {
    name: "GitHub",
    icon: "github" as const,
    url: "https://github.com/YOUR_USERNAME",
  },
  {
    name: "LinkedIn",
    icon: "linkedin" as const,
    url: "https://linkedin.com/in/YOUR_USERNAME",
  },
];

export default function AboutScreen() {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  const openLink = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert("Error", "Unable to open the link.");
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={42} color={colors.surface} />
        </View>

        <Text style={styles.name}>Your Name</Text>
        <Text style={styles.role}>
          Software Developer & Engineer
        </Text>

        <Text style={styles.subtitle}>
          Building useful applications with modern technology.
        </Text>
      </View>

      {/* About */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>About Me</Text>

        <Text style={styles.description}>
          I'm passionate about engineering, technology,
          and software development.
          {"\n\n"}
          I enjoy developing mobile applications,
          backend APIs, and practical solutions
          that simplify everyday tasks.
        </Text>
      </View>

      {/* Skills */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Skills & Technologies</Text>

        <View style={styles.skillsContainer}>
          {[
            "React Native",
            "Expo",
            "TypeScript",
            "Python",
            "FastAPI",
            "SQL",
            "Automation",
          ].map((skill) => (
            <View key={skill} style={styles.skillBadge}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Social Links */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Connect With Me</Text>

        {socialLinks.map((social) => (
          <TouchableOpacity
            key={social.name}
            style={styles.socialRow}
            onPress={() => openLink(social.url)}
          >
            <FontAwesome6
              name={social.icon}
              size={23}
              color={colors.primary}
            />

            <Text style={styles.socialText}>
              {social.name}
            </Text>

            <Ionicons
              name="open-outline"
              size={19}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.socialRow}
          onPress={() =>
            openLink("mailto:your-email@example.com")
          }
        >
          <Ionicons
            name="mail-outline"
            size={23}
            color={colors.accentMuted}
          />

          <Text style={styles.socialText}>Email</Text>

          <Ionicons
            name="open-outline"
            size={19}
            color={colors.textSecondary}
          />
        </TouchableOpacity>
      </View>

      {/* App Information */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Application</Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Version</Text>
          <Text style={styles.infoValue}>1.0.0</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Framework</Text>
          <Text style={styles.infoValue}>Expo / React Native</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Platform</Text>
          <Text style={styles.infoValue}>Android & iOS</Text>
        </View>
      </View>

      <Text style={styles.footer}>
        Made with ❤️ using React Native
      </Text>
    </ScrollView>
  );
}

const createStyles = (colors: AppColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
    paddingTop: 24,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    color: colors.primaryDark,
  },
  role: {
    fontSize: 15,
    color: colors.primary,
    fontWeight: "600",
    marginTop: 6,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 10,
    lineHeight: 22,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 14,
  },
  description: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 25,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  skillBadge: {
    backgroundColor: colors.surfaceMuted,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  skillText: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: "500",
  },
  socialRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    gap: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  socialText: {
    flex: 1,
    fontSize: 16,
    color: colors.primary,
    fontWeight: "500",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  infoLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  infoValue: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "600",
  },
  footer: {
    textAlign: "center",
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 10,
  },
});

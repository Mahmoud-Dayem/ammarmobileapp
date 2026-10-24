
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { setUser, setIsLoading } = useAuth();
  const router = useRouter();

  const handleSignIn = () => {
    const normalizedEmail = email.trim();

    if (!normalizedEmail || !password) {
      Alert.alert("", "Please enter your email and password.");
      return;
    }

    setIsSubmitting(true);
    setIsLoading(true);

    try {
      // Fake authentication: accept any non-empty email/password.
      const fakeUser = {
        id: "user-123",
        email: normalizedEmail,
        displayName: normalizedEmail.split("@")[0],
      };

      // Dispatch the mock user to AuthContext.
      setUser(fakeUser);

      // Navigate to the home screen.
      router.replace("/(tabs)");
    } finally {
      setIsSubmitting(false);
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>
          Sign in to continue
        </Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="you@example.com"
          placeholderTextColor="#94A3B8"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#94A3B8"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          autoComplete="current-password"
        />

        <TouchableOpacity
          style={[
            styles.button,
            isSubmitting && styles.buttonDisabled,
          ]}
          onPress={handleSignIn}
          disabled={isSubmitting}
          activeOpacity={0.8}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Sign In</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.note}>
          Demo mode: any non-empty email and password will work.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FAF7F0",
    paddingHorizontal: 24,
  },
  header: {
    marginBottom: 36,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#0E7C86",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#64748B",
  },
  form: {
    gap: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
    marginTop: 8,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#1E293B",
  },
  button: {
    height: 52,
    backgroundColor: "#0E7C86",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  note: {
    fontSize: 12,
    color: "#64748B",
    textAlign: "center",
    marginTop: 12,
    lineHeight: 18,
  },
});

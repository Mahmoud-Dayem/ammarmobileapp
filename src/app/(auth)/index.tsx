
import { useState } from "react";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";

export default function LoginScreen() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { setUser } = useAuth();
  const router = useRouter();

  const handleSubmit = async () => {
    const normalizedEmail = email.trim().toLowerCase();

    // Validate required fields.
    if (!normalizedEmail || !password) {
      Alert.alert(
        "Missing Information",
        "Please enter your email and password."
      );
      return;
    }

    // Validate email format.
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(normalizedEmail)) {
      Alert.alert(
        "Invalid Email",
        "Please enter a valid email address."
      );
      return;
    }

    // Validate password confirmation during sign-up.
    if (isSignUp && password !== confirmPassword) {
      Alert.alert(
        "Password Mismatch",
        "Your passwords do not match."
      );
      return;
    }

    if (isSignUp && password.length < 6) {
      Alert.alert(
        "Weak Password",
        "Your password must contain at least 6 characters."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      if (isSignUp) {
        // Create a new account in Supabase Auth.
        const { data, error } = await supabase.auth.signUp({
          email: normalizedEmail,
          password,
        });

        if (error) {
          throw error;
        }

        // Email confirmation may be required.
        if (!data.session) {
          Alert.alert(
            "Check Your Email",
            "Your account was created. Confirm your email before signing in."
          );

          setIsSignUp(false);
          setPassword("");
          setConfirmPassword("");
          return;
        }

        // A session was created, so the user is authenticated.
        if (data.user) {
          setUser({
            id: data.user.id,
            email: data.user.email,
            displayName:
              data.user.email?.split("@")[0] ?? null,
          });
        }

        // AuthContext also receives the session automatically.
        router.replace("/(tabs)");
      } else {
        // Sign in to an existing account.
        const { data, error } =
          await supabase.auth.signInWithPassword({
            email: normalizedEmail,
            password,
          });

        if (error) {
          throw error;
        }

        if (!data.user) {
          throw new Error("No authenticated user was returned.");
        }

        setUser({
          id: data.user.id,
          email: data.user.email,
          displayName:
            data.user.email?.split("@")[0] ?? null,
        });

        router.replace("/(tabs)");
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.";

      Alert.alert("Authentication Failed", message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const switchMode = () => {
    setIsSignUp((currentMode) => !currentMode);
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {isSignUp ? "Create Account" : "Welcome Back"}
        </Text>

        <Text style={styles.subtitle}>
          {isSignUp
            ? "Sign up to get started"
            : "Sign in to continue"}
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
          editable={!isSubmitting}
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
          autoComplete={
            isSignUp ? "new-password" : "current-password"
          }
          editable={!isSubmitting}
        />

        {isSignUp && (
          <>
            <Text style={styles.label}>Confirm Password</Text>

            <TextInput
              style={styles.input}
              placeholder="Re-enter your password"
              placeholderTextColor="#94A3B8"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              autoCapitalize="none"
              autoComplete="new-password"
              editable={!isSubmitting}
            />
          </>
        )}

        <TouchableOpacity
          style={[
            styles.button,
            isSubmitting && styles.buttonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={isSubmitting}
          activeOpacity={0.8}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>
              {isSignUp ? "Create Account" : "Sign In"}
            </Text>
          )}
        </TouchableOpacity>

        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>
            {isSignUp
              ? "Already have an account? "
              : "Don't have an account? "}
          </Text>

          <TouchableOpacity
            onPress={switchMode}
            disabled={isSubmitting}
          >
            <Text style={styles.switchLink}>
              {isSignUp ? "Sign In" : "Sign Up"}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.note}>
          {isSignUp
            ? "Create your account using your email and password."
            : "Sign in securely using your registered credentials."}
        </Text>
      </View>
    </SafeAreaView>
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
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 20,
  },
  switchText: {
    fontSize: 14,
    color: "#64748B",
  },
  switchLink: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0E7C86",
  },
  note: {
    fontSize: 12,
    color: "#64748B",
    textAlign: "center",
    marginTop: 16,
    lineHeight: 18,
  },
});

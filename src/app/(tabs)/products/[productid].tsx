import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { supabase } from "@/lib/supabase";
import { useAppTheme, type AppColors } from "@/theme/color";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image_urls: string[];
};

export default function ProductDetails() {
  const { productid } = useLocalSearchParams<{ productid: string }>();
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchProduct = async () => {
      // const id = Number(productid);
      const id =  productid 

      // if (!productid || !Number.isSafeInteger(id)) {
      //   setError("Invalid product.");
      //   setLoading(false);
      //   return;
      // }

      try {
        const { data, error: queryError } = await supabase
          .from("products")
          .select("id, name, category, price, image_urls")
          .eq("id", id)
          .maybeSingle();

        if (queryError) {
          throw queryError;
        }

        if (isMounted) {
          setProduct(data);
          if (!data) {
            setError("This product could not be found.");
          }
        }
      } catch (fetchError: unknown) {
        const message =
          fetchError instanceof Error
            ? fetchError.message
            : "Unable to load this product.";
        console.error("Product details error:", message);
        if (isMounted) {
          setError(message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [productid]);

  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(tabs)/products");
    }
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Go back to products"
        onPress={goBack}
        style={({ pressed }) => [
          styles.backButton,
          pressed && styles.backButtonPressed,
        ]}
      >
        <ArrowLeft size={20} color={colors.primary} />
        <Text style={styles.backButtonText}>Products</Text>
      </Pressable>

      {loading ? (
        <View style={styles.state}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.stateText}>Loading product...</Text>
        </View>
      ) : error ? (
        <View style={styles.state}>
          <Text style={styles.error}>{error}</Text>
        </View>
      ) : product ? (
        <View style={styles.card}>
          <Image
            source={{ uri: product.image_urls[0] }}
            style={styles.image}
            resizeMode="cover"
            accessibilityLabel={product.name}
          />
          <View style={styles.details}>
            <Text style={styles.category}>{product.category}</Text>
            <Text accessibilityRole="header" style={styles.name}>
              {product.name}
            </Text>
            <Text style={styles.price}>
              ${Number(product.price).toFixed(2)}
            </Text>
          </View>
        </View>
      ) : null}
    </ScrollView>
  );
}

const createStyles = (colors: AppColors) => StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flexGrow: 1,
    padding: 20,
  },
  backButton: {
    alignSelf: "flex-start",
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    backgroundColor: colors.surface,
  },
  backButtonPressed: {
    opacity: 0.7,
  },
  backButtonText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: "600",
  },
  card: {
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    backgroundColor: colors.surface,
  },
  image: {
    width: "100%",
    height: 300,
    backgroundColor: colors.surfaceMuted,
  },
  details: {
    padding: 20,
  },
  category: {
    color: colors.accent,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  name: {
    color: colors.primaryDark,
    fontSize: 24,
    fontWeight: "700",
  },
  price: {
    color: colors.primary,
    fontSize: 22,
    fontWeight: "700",
    marginTop: 16,
  },
  state: {
    flex: 1,
    minHeight: 220,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  stateText: {
    color: colors.textSecondary,
  },
  error: {
    color: colors.tomato,
    textAlign: "center",
  },
});

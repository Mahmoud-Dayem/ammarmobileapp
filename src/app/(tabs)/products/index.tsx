
import { useEffect, useState, useCallback } from "react";

import {
  Pressable,
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useRouter } from "expo-router";

import { supabase } from "@/lib/supabase";
import { useAppTheme, type AppColors } from "@/theme/color";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image_urls: string[];
};

export default function Products() {
  const router = useRouter();
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Retrieve products from Supabase
  const fetchProducts = useCallback(async () => {
    try {
      setError(null);

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        throw error;
      }

      setProducts(data ?? []);

    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Unable to load products.";
      console.error("Products error:", message);
      setError(message);

    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Execute when screen opens
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Pull to refresh
  const onRefresh = () => {
    setRefreshing(true);
    fetchProducts();
  };


  //
  // Realtime subscription
useEffect(() => {
  const channel = supabase
    .channel("products-realtime")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "products",
      },
      (payload) => {
        console.log("Realtime event:", payload.eventType);

        if (payload.eventType === "INSERT") {
          const newProduct = payload.new as Product;

          setProducts((current) => [
            ...current.filter((p) => p.id !== newProduct.id),
            newProduct,
          ]);
        }

        if (payload.eventType === "UPDATE") {
          const updatedProduct = payload.new as Product;

          setProducts((current) =>
            current.map((p) =>
              p.id === updatedProduct.id ? updatedProduct : p
            )
          );
        }

        if (payload.eventType === "DELETE") {
          const deletedId = payload.old.id;

          setProducts((current) =>
            current.filter((p) => p.id !== deletedId)
          );
        }
      }
    )
    .subscribe((status) => {
      console.log("Realtime status:", status);
    });

  return () => {
    supabase.removeChannel(channel);
  };
}, []);
  // Loading screen
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  // Error screen
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Error: {error}</Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => void fetchProducts()}
          style={({ pressed }) => [
            styles.retryButton,
            pressed && styles.retryButtonPressed,
          ]}
        >
          <Text style={styles.retry}>Try again</Text>
        </Pressable>
      </View>
    );
  }


  
  // Main products screen
  return (
    <View style={styles.container}>
 

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
        ListEmptyComponent={
          <Text style={styles.empty}>
            No products found.
          </Text>
        }
        renderItem={({ item }) => (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`${item.name}, ${item.category}, $${Number(item.price).toFixed(2)}`}
            onPress={() =>
              router.push({
                pathname: "/(tabs)/products/[productid]",
                params: { productid: String(item.id) },
              })
            }
            style={({ pressed }) => [
              styles.card,
              pressed && styles.cardPressed,
            ]}
          >
            <Image
              source={{ uri: item.image_urls[0] }}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.details}>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.name} numberOfLines={2}>
                {item.name}
              </Text>
              <Text style={styles.price}>
                ${Number(item.price).toFixed(2)}
              </Text>
            </View>
          </Pressable>
        )}
      />

    </View>
  );
}

const createStyles = (colors: AppColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  list: {
    paddingBottom: 30,
    flexGrow: 1,
  },

  row: {
    justifyContent: "space-between",
  },

  card: {
    width: "48%",
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 2,
  },

  cardPressed: {
    opacity: 0.8,
  },

  image: {
    width: "100%",
    height: 150,
    backgroundColor: colors.surfaceMuted,
  },

  details: {
    padding: 12,
  },

  category: {
    color: colors.accent,
    fontSize: 12,
    marginBottom: 5,
  },

  name: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.primaryDark,
    minHeight: 38,
  },

  price: {
    fontSize: 17,
    fontWeight: "bold",
    color: colors.primary,
    marginTop: 8,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: colors.background,
  },

  error: {
    color: colors.tomato,
    textAlign: "center",
  },

  loadingText: {
    color: colors.textSecondary,
    marginTop: 12,
  },

  retry: {
    color: colors.primary,
    fontWeight: "bold",
  },

  retryButton: {
    marginTop: 15,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: colors.primaryLight,
  },

  retryButtonPressed: {
    backgroundColor: colors.surfaceMuted,
  },

  empty: {
    textAlign: "center",
    marginTop: 40,
    color: colors.textMuted,
  },
});

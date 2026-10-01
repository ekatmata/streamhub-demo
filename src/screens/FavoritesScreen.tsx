import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CATALOG, ContentItem } from "@/data/mockCatalog";
import { useAppSelector } from "@/store/store";
import ContentCard from "@/components/ContentCard";
import { colors, spacing } from "@/theme/tokens";
import { RootStackParamList } from "@/navigation/AppNavigator";

type Nav = NativeStackNavigationProp<RootStackParamList, "Favorites">;

export default function FavoritesScreen() {
  const navigation = useNavigation<Nav>();
  const favoriteIds = useAppSelector((s) => s.favorites.ids);
  const items = CATALOG.filter((c) => favoriteIds.includes(c.id));

  function openPlayer(item: ContentItem) {
    navigation.navigate("Player", { itemId: item.id });
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Favorites</Text>
      <Text style={styles.sub}>
        {items.length} {items.length === 1 ? "title" : "titles"} saved
      </Text>

      <FlatList
        data={items}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        columnWrapperStyle={{ gap: spacing.md }}
        contentContainerStyle={{ gap: spacing.md, paddingBottom: spacing.xxl }}
        renderItem={({ item }) => (
          <View style={{ flex: 1 }}>
            <ContentCard item={item} onPress={openPlayer} />
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyBig}>Nothing saved yet</Text>
            <Text style={styles.emptyText}>Tap the star on any title to add it here.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background, padding: spacing.lg },
  title: { color: colors.textPrimary, fontSize: 22, fontWeight: "700" },
  sub: { color: colors.textSecondary, fontSize: 12, marginTop: 2, marginBottom: spacing.lg },
  empty: { alignItems: "center", paddingVertical: 48 },
  emptyBig: { color: colors.textPrimary, fontSize: 15, fontWeight: "600", marginBottom: 6 },
  emptyText: { color: colors.textSecondary, fontSize: 13, textAlign: "center" },
});

import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ContentItem } from "@/data/mockCatalog";
import { selectSearchResults } from "@/store/catalogSlice";
import ContentCard from "@/components/ContentCard";
import { colors, radii, spacing } from "@/theme/tokens";
import { RootStackParamList } from "@/navigation/AppNavigator";

type Nav = NativeStackNavigationProp<RootStackParamList, "Search">;

export default function SearchScreen() {
  const navigation = useNavigation<Nav>();
  const [query, setQuery] = useState("");
  const results = selectSearchResults(query);

  function openPlayer(item: ContentItem) {
    navigation.navigate("Player", { itemId: item.id });
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Search</Text>
      <Text style={styles.sub}>Find shows, movies & documentaries</Text>

      <View style={styles.searchBox}>
        <TextInput
          style={styles.input}
          placeholder="Search titles, genres..."
          placeholderTextColor={colors.textTertiary}
          value={query}
          onChangeText={setQuery}
          autoCorrect={false}
        />
      </View>

      <FlatList
        data={results}
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
            <Text style={styles.emptyBig}>No results</Text>
            <Text style={styles.emptyText}>Try a different title or genre.</Text>
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
  searchBox: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.sm,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  input: { color: colors.textPrimary, fontSize: 14, paddingVertical: 12 },
  empty: { alignItems: "center", paddingVertical: 48 },
  emptyBig: { color: colors.textPrimary, fontSize: 15, fontWeight: "600", marginBottom: 6 },
  emptyText: { color: colors.textSecondary, fontSize: 13 },
});

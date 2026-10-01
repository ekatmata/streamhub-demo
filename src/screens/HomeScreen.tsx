import React from "react";
import { ScrollView, StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CATALOG } from "@/data/mockCatalog";
import { ContentItem } from "@/data/mockCatalog";
import Rail from "@/components/Rail";
import { colors, radii, spacing } from "@/theme/tokens";
import { RootStackParamList } from "@/navigation/AppNavigator";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { toggleFavorite } from "@/store/favoritesSlice";

const GENRES = ["Drama", "Comedy", "Documentary", "Thriller", "Sport", "Kids", "News"] as const;

type Nav = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function HomeScreen() {
  const navigation = useNavigation<Nav>();
  const dispatch = useAppDispatch();
  const featured = CATALOG[0];
  const isFeaturedFav = useAppSelector((s) => s.favorites.ids.includes(featured.id));

  function openPlayer(item: ContentItem) {
    navigation.navigate("Player", { itemId: item.id });
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: spacing.lg }}>
      <Text style={styles.appTitle}>StreamHub</Text>
      <Text style={styles.appSub}>Portfolio demo — original UI/UX, no proprietary code or assets</Text>

      <View style={styles.hero}>
        <Text style={styles.heroEyebrow}>Featured original</Text>
        <Text style={styles.heroTitle}>{featured.title}</Text>
        <Text style={styles.heroSynopsis}>{featured.synopsis}</Text>
        <View style={styles.heroActions}>
          <Pressable style={styles.primaryBtn} onPress={() => openPlayer(featured)}>
            <Text style={styles.primaryBtnText}>▶ Play</Text>
          </Pressable>
          <Pressable
            style={styles.ghostBtn}
            onPress={() => dispatch(toggleFavorite(featured.id))}
          >
            <Text style={styles.ghostBtnText}>{isFeaturedFav ? "Saved" : "+ My List"}</Text>
          </Pressable>
        </View>
      </View>

      {GENRES.map((genre) => (
        <Rail
          key={genre}
          title={genre}
          items={CATALOG.filter((c) => c.genre === genre)}
          onSelect={openPlayer}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  appTitle: { color: colors.textPrimary, fontSize: 22, fontWeight: "700" },
  appSub: { color: colors.textSecondary, fontSize: 12, marginTop: 2, marginBottom: spacing.lg },
  hero: {
    backgroundColor: "#3C2A4A",
    borderRadius: radii.lg,
    padding: spacing.xl,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  heroEyebrow: { color: colors.accent, fontSize: 12, fontWeight: "600", marginBottom: 6 },
  heroTitle: { color: colors.textPrimary, fontSize: 26, fontWeight: "700", marginBottom: 8 },
  heroSynopsis: { color: colors.textSecondary, fontSize: 13, lineHeight: 19, marginBottom: 16 },
  heroActions: { flexDirection: "row", gap: spacing.md },
  primaryBtn: {
    backgroundColor: colors.accent,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: radii.sm,
  },
  primaryBtnText: { color: colors.accentInk, fontWeight: "700", fontSize: 13 },
  ghostBtn: {
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: radii.sm,
  },
  ghostBtnText: { color: colors.textPrimary, fontWeight: "600", fontSize: 13 },
});

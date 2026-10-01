import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ContentItem } from "@/data/mockCatalog";
import { colors, radii, spacing, artFills } from "@/theme/tokens";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { toggleFavorite } from "@/store/favoritesSlice";

interface Props {
  item: ContentItem;
  onPress: (item: ContentItem) => void;
}

export default function ContentCard({ item, onPress }: Props) {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector((s) => s.favorites.ids.includes(item.id));

  return (
    <Pressable style={styles.card} onPress={() => onPress(item)}>
      <View style={[styles.art, { backgroundColor: artFills[item.artIndex] }]}>
        {item.badge ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.badge}</Text>
          </View>
        ) : null}
        <Pressable
          style={[styles.favButton, isFavorite && styles.favButtonActive]}
          onPress={(e) => {
            e.stopPropagation();
            dispatch(toggleFavorite(item.id));
          }}
          accessibilityRole="button"
          accessibilityLabel={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Text style={{ color: isFavorite ? colors.accent : "#fff", fontSize: 12 }}>
            {isFavorite ? "★" : "☆"}
          </Text>
        </Pressable>
        <Text style={styles.genreTag}>{item.genre}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.meta}>{item.meta}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 150,
    borderRadius: radii.md,
    overflow: "hidden",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: spacing.md,
  },
  art: {
    height: 84,
    justifyContent: "flex-end",
    padding: spacing.sm,
  },
  badge: {
    position: "absolute",
    top: 6,
    left: 6,
    backgroundColor: "rgba(14,18,23,0.65)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: { color: colors.textPrimary, fontSize: 9, fontWeight: "600" },
  favButton: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: "rgba(14,18,23,0.55)",
    alignItems: "center",
    justifyContent: "center",
  },
  favButtonActive: { borderWidth: 1, borderColor: colors.accent },
  genreTag: { color: "rgba(255,255,255,0.9)", fontSize: 11, fontWeight: "600" },
  body: { padding: spacing.sm },
  title: { color: colors.textPrimary, fontSize: 13, fontWeight: "600", marginBottom: 2 },
  meta: { color: colors.textTertiary, fontSize: 11 },
});

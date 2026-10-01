import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { ContentItem } from "@/data/mockCatalog";
import ContentCard from "./ContentCard";
import { colors, spacing } from "@/theme/tokens";

interface Props {
  title: string;
  items: ContentItem[];
  onSelect: (item: ContentItem) => void;
}

export default function Rail({ title, items, onSelect }: Props) {
  if (!items.length) return null;

  return (
    <View style={styles.wrap}>
      <View style={styles.head}>
        <Text style={styles.heading}>{title}</Text>
        <Text style={styles.count}>{items.length} titles</Text>
      </View>
      <FlatList
        data={items}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ paddingRight: spacing.lg }}
        renderItem={({ item }) => <ContentCard item={item} onPress={onSelect} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: spacing.xl },
  head: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  heading: { color: colors.textPrimary, fontSize: 16, fontWeight: "600" },
  count: { color: colors.textTertiary, fontSize: 12 },
});

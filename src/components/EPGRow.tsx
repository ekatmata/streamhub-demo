import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { EPGEntry } from "@/data/mockCatalog";
import { colors, spacing } from "@/theme/tokens";

interface Props {
  entry: EPGEntry;
  isNow?: boolean;
}

export default function EPGRow({ entry, isNow }: Props) {
  return (
    <View style={styles.row}>
      <Text style={styles.time}>{entry.time}</Text>
      <View style={{ flex: 1 }}>
        <Text style={[styles.title, isNow && { color: colors.accent }]}>{entry.title}</Text>
        <Text style={styles.desc}>{entry.desc}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: spacing.lg,
    paddingVertical: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  time: { width: 90, color: colors.textTertiary, fontSize: 12 },
  title: { color: colors.textPrimary, fontSize: 14, fontWeight: "600", marginBottom: 2 },
  desc: { color: colors.textSecondary, fontSize: 12 },
});

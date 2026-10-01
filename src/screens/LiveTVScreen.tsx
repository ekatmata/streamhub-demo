import React, { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CHANNELS } from "@/data/mockCatalog";
import EPGRow from "@/components/EPGRow";
import { colors, radii, spacing, artFills } from "@/theme/tokens";
import { RootStackParamList } from "@/navigation/AppNavigator";

type Nav = NativeStackNavigationProp<RootStackParamList, "LiveTV">;

export default function LiveTVScreen() {
  const navigation = useNavigation<Nav>();
  const [activeId, setActiveId] = useState(CHANNELS[0].id);
  const channel = CHANNELS.find((c) => c.id === activeId)!;

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Live TV</Text>
      <Text style={styles.sub}>Channel guide & what's on now</Text>

      <FlatList
        data={CHANNELS}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(c) => c.id}
        style={{ marginBottom: spacing.lg }}
        renderItem={({ item }) => (
          <Pressable
            style={[styles.channelChip, item.id === activeId && styles.channelChipActive]}
            onPress={() => setActiveId(item.id)}
          >
            <View style={[styles.logo, { backgroundColor: artFills[item.artIndex] }]}>
              <Text style={styles.logoText}>{item.initials}</Text>
            </View>
            <Text style={styles.channelName}>{item.name}</Text>
          </Pressable>
        )}
      />

      <View style={styles.epgPanel}>
        <View style={styles.epgHead}>
          <View style={styles.liveDot} />
          <View style={styles.liveTag}>
            <Text style={styles.liveTagText}>LIVE</Text>
          </View>
          <Text style={styles.channelHeading}>{channel.name}</Text>
        </View>

        <EPGRow entry={channel.now} isNow />
        <EPGRow entry={channel.next} />

        <Pressable
          style={styles.watchBtn}
          onPress={() => navigation.navigate("Player", { itemId: -1, liveChannelId: channel.id })}
        >
          <Text style={styles.watchBtnText}>▶ Watch live</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background, padding: spacing.lg },
  title: { color: colors.textPrimary, fontSize: 22, fontWeight: "700" },
  sub: { color: colors.textSecondary, fontSize: 12, marginTop: 2, marginBottom: spacing.lg },
  channelChip: {
    alignItems: "center",
    width: 72,
    marginRight: spacing.md,
    padding: spacing.sm,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: "transparent",
  },
  channelChipActive: { backgroundColor: colors.surfaceRaised, borderColor: colors.border },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  logoText: { color: colors.accentInk, fontWeight: "700", fontSize: 12 },
  channelName: { color: colors.textSecondary, fontSize: 11, textAlign: "center" },
  epgPanel: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  epgHead: { flexDirection: "row", alignItems: "center", gap: spacing.sm, marginBottom: spacing.md },
  liveDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.live },
  liveTag: { backgroundColor: colors.live, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  liveTagText: { color: "#fff", fontSize: 10, fontWeight: "700" },
  channelHeading: { color: colors.textPrimary, fontSize: 15, fontWeight: "700" },
  watchBtn: {
    marginTop: spacing.lg,
    alignSelf: "flex-start",
    backgroundColor: colors.accent,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: radii.sm,
  },
  watchBtnText: { color: colors.accentInk, fontWeight: "700", fontSize: 13 },
});

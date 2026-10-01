import React, { useEffect, useRef, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CATALOG, CHANNELS } from "@/data/mockCatalog";
import { colors, artFills, radii, spacing } from "@/theme/tokens";
import { RootStackParamList } from "@/navigation/AppNavigator";

// NOTE: This screen simulates playback (a progress clock + play/pause state)
// rather than decoding real video. In a production build this is where a
// native player (e.g. react-native-video, or a vendor SDK for DRM-protected
// streams) would be mounted in place of the placeholder "stage" view below.

type Nav = NativeStackNavigationProp<RootStackParamList, "Player">;
type Rt = RouteProp<RootStackParamList, "Player">;

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = Math.floor(totalSeconds % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

export default function PlayerScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const { itemId, liveChannelId } = route.params;

  const liveChannel = liveChannelId ? CHANNELS.find((c) => c.id === liveChannelId) : undefined;
  const item = liveChannel
    ? { title: liveChannel.now.title, artIndex: liveChannel.artIndex }
    : CATALOG.find((c) => c.id === itemId) ?? CATALOG[0];

  const DURATION = 24 * 60;
  const [seconds, setSeconds] = useState(0);
  const [playing, setPlaying] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => (s >= DURATION ? DURATION : s + 1));
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing]);

  const upNext = CATALOG.filter((c) => c.title !== item.title).slice(0, 6);
  const progressPct = Math.min(100, (seconds / DURATION) * 100);

  return (
    <View style={styles.screen}>
      <View style={[styles.stage, { backgroundColor: artFills[item.artIndex] }]}>
        <View style={styles.topBar}>
          <View style={styles.topLeft}>
            <Pressable style={styles.closeBtn} onPress={() => navigation.goBack()}>
              <Text style={{ color: "#fff", fontSize: 16 }}>✕</Text>
            </Pressable>
            <Text style={styles.titleMini} numberOfLines={1}>{item.title}</Text>
          </View>
          <View style={styles.drmChip}>
            <Text style={styles.drmChipText}>🔒 Protected playback</Text>
          </View>
        </View>

        <Pressable style={styles.playCenter} onPress={() => setPlaying((p) => !p)}>
          <Text style={styles.playCenterIcon}>{playing ? "❚❚" : "▶"}</Text>
        </Pressable>
      </View>

      <View style={styles.controls}>
        <View style={styles.scrub}>
          <View style={[styles.scrubFill, { width: `${progressPct}%` }]} />
        </View>
        <View style={styles.controlsRow}>
          <Pressable onPress={() => setPlaying((p) => !p)}>
            <Text style={styles.ctlIcon}>{playing ? "❚❚" : "▶"}</Text>
          </Pressable>
          <Text style={styles.timeLabel}>
            {formatTime(seconds)} / {formatTime(DURATION)}
          </Text>
        </View>
      </View>

      <View style={styles.upNextWrap}>
        <Text style={styles.upNextHeading}>Up next</Text>
        <FlatList
          data={upNext}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(c) => String(c.id)}
          renderItem={({ item: next }) => (
            <Pressable
              style={styles.upNextCard}
              onPress={() => navigation.setParams({ itemId: next.id, liveChannelId: undefined })}
            >
              <View style={[styles.upNextArt, { backgroundColor: artFills[next.artIndex] }]}>
                <Text style={styles.upNextGenre}>{next.genre}</Text>
              </View>
              <Text style={styles.upNextTitle} numberOfLines={1}>{next.title}</Text>
            </Pressable>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#05070A" },
  stage: { flex: 1, alignItems: "center", justifyContent: "center" },
  topBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: spacing.lg,
  },
  topLeft: { flexDirection: "row", alignItems: "center", gap: spacing.md, flex: 1, marginRight: spacing.md },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 9,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  titleMini: { color: "#fff", fontSize: 14, fontWeight: "600", flexShrink: 1 },
  drmChip: { backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5 },
  drmChipText: { color: "rgba(255,255,255,0.8)", fontSize: 11 },
  playCenter: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.35)",
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  playCenterIcon: { color: "#fff", fontSize: 22 },
  controls: { backgroundColor: "#0B0E12", paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.sm },
  scrub: { height: 4, borderRadius: 2, backgroundColor: "rgba(255,255,255,0.14)", marginBottom: spacing.md },
  scrubFill: { height: 4, borderRadius: 2, backgroundColor: colors.accent },
  controlsRow: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  ctlIcon: { color: "#fff", fontSize: 16 },
  timeLabel: { color: "rgba(255,255,255,0.6)", fontSize: 12 },
  upNextWrap: { backgroundColor: "#0B0E12", padding: spacing.lg, borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.06)" },
  upNextHeading: { color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: "600", marginBottom: spacing.md },
  upNextCard: { width: 130, marginRight: spacing.md },
  upNextArt: { height: 64, borderRadius: 8, justifyContent: "flex-end", padding: 6, marginBottom: 6 },
  upNextGenre: { color: "#fff", fontSize: 10, fontWeight: "600" },
  upNextTitle: { color: "rgba(255,255,255,0.85)", fontSize: 12, fontWeight: "600" },
});

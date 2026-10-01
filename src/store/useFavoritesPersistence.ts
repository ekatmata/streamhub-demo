import { useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch, useAppSelector } from "./store";
import { hydrateFavorites } from "./favoritesSlice";

const STORAGE_KEY = "streamhub.favorites.v1";

/**
 * Loads saved favorite ids from device storage on first mount, and writes
 * them back whenever the favorites list changes. Call once near the app
 * root (see App.tsx).
 */
export function useFavoritesPersistence() {
  const dispatch = useAppDispatch();
  const ids = useAppSelector((state) => state.favorites.ids);
  const hasHydrated = useRef(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) dispatch(hydrateFavorites(JSON.parse(raw)));
      } catch (err) {
        console.warn("Failed to load favorites from storage", err);
      } finally {
        hasHydrated.current = true;
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    if (!hasHydrated.current) return; // avoid clobbering storage before initial load
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(ids)).catch((err) =>
      console.warn("Failed to save favorites to storage", err)
    );
  }, [ids]);
}

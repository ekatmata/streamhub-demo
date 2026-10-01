# StreamHub — OTT Streaming App Demo

A from-scratch, cross-platform streaming app built with **React Native, TypeScript, and Redux Toolkit**, created as a portfolio demo. It mirrors the feature set of a real-world OTT/VOD streaming app — content catalog, search, live TV with an electronic program guide (EPG), favorites, and a video player UI — without reusing any code, assets, or branding from a client project.

Live web preview of the same UI/UX concepts: *(see the companion `streamhub-demo.html` artifact)*.

## Why this project exists

This app demonstrates the same category of mobile engineering work as a commercial streaming/OTT app build — cross-platform React Native delivery, state management at scale, native build tooling, and media-app UX patterns — using entirely original code so it's safe to share publicly (unlike client work, which is typically confidential/NDA'd).

## Features

- **Home** — hero banner + horizontal genre rails (Drama, Comedy, Documentary, Sport, Kids, News...)
- **Live TV** — channel list with a live "now & next" program guide (EPG)
- **Search** — real-time filtering across titles and genres
- **Favorites** — save/remove titles, persisted to device storage (AsyncStorage) via a Redux slice
- **Player** — playback UI with scrubber, play/pause, a "Protected playback" badge representing where DRM/secure-playback integration would hook in, and an "Up next" rail

## Tech stack

| Layer | Choice |
|---|---|
| Framework | React Native (Expo-managed workflow) |
| Language | TypeScript (strict mode) |
| State management | Redux Toolkit + React Redux, typed hooks |
| Persistence | `@react-native-async-storage/async-storage` |
| Navigation | React Navigation (bottom tabs + modal stack for the player) |

## Project structure

```
streamhub-rn/
├── App.tsx                      # Root: Redux provider, persistence hook, navigator
├── src/
│   ├── components/
│   │   ├── ContentCard.tsx      # Reusable catalog tile (poster, badge, favorite toggle)
│   │   ├── Rail.tsx             # Horizontal scrolling row of ContentCards
│   │   └── EPGRow.tsx           # A single program-guide row
│   ├── data/
│   │   └── mockCatalog.ts       # Typed sample catalog + channel/EPG data
│   ├── navigation/
│   │   └── AppNavigator.tsx     # Bottom tabs + modal stack (Player)
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   ├── LiveTVScreen.tsx
│   │   ├── SearchScreen.tsx
│   │   ├── FavoritesScreen.tsx
│   │   └── PlayerScreen.tsx     # Simulated playback (see note in file)
│   ├── store/
│   │   ├── store.ts             # Redux store + typed hooks
│   │   ├── catalogSlice.ts      # Search/active-channel state + selectors
│   │   ├── favoritesSlice.ts    # Favorite ids
│   │   └── useFavoritesPersistence.ts  # AsyncStorage hydrate/save hook
│   └── theme/
│       └── tokens.ts            # Shared color/spacing/type tokens
```

## Running it

```bash
npm install
npm start        # opens Expo Dev Tools — press i for iOS sim, a for Android, w for web
```

Requires [Expo CLI](https://docs.expo.dev/get-started/installation/) and either a simulator or the **Expo Go** app on a physical device.

## Notes on the "player"

`PlayerScreen.tsx` simulates playback with a timer-driven progress bar rather than decoding real video — there's no licensed media or DRM SDK bundled here. In a production build, that's where a native player module (e.g. `react-native-video`, or a vendor multi-DRM SDK) would be mounted. The UI, state, and controls around it are fully real and functional.

## License

Original work, MIT — free to use as a personal portfolio piece or starting point.

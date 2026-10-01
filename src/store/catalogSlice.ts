import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CATALOG, CHANNELS } from "@/data/mockCatalog";

interface CatalogState {
  searchQuery: string;
  activeChannelId: string;
}

const initialState: CatalogState = {
  searchQuery: "",
  activeChannelId: CHANNELS[0].id,
};

const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setActiveChannel(state, action: PayloadAction<string>) {
      state.activeChannelId = action.payload;
    },
  },
});

export const { setSearchQuery, setActiveChannel } = catalogSlice.actions;
export default catalogSlice.reducer;

// Selectors
export const selectAllTitles = () => CATALOG;

export const selectSearchResults = (query: string) => {
  const q = query.trim().toLowerCase();
  if (!q) return CATALOG;
  return CATALOG.filter(
    (item) =>
      item.title.toLowerCase().includes(q) ||
      item.genre.toLowerCase().includes(q)
  );
};

export const selectTitlesByGenre = (genre: string) =>
  CATALOG.filter((item) => item.genre === genre);

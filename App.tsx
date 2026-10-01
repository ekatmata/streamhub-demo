import React from "react";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { store } from "@/store/store";
import { useFavoritesPersistence } from "@/store/useFavoritesPersistence";
import AppNavigator from "@/navigation/AppNavigator";

function Root() {
  useFavoritesPersistence();
  return <AppNavigator />;
}

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <Root />
      </SafeAreaProvider>
    </Provider>
  );
}

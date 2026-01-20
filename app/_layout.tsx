import { colors } from "@/themes/themes";
import { Stack } from "expo-router";
import * as SystemUI from "expo-system-ui";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from "react";
import { Platform, View } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Set SystemUI background
        if (Platform.OS === 'android') {
          await SystemUI.setBackgroundColorAsync(colors.background);
        }
        
        // Add any other async operations here
        
      } catch (error) {
        console.warn(error);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayout = async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  };

  if (!appIsReady) {
    return (
      <View 
        style={{ 
          flex: 1, 
          backgroundColor: colors.background 
        }} 
      />
    );
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayout}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTitleStyle: { color: colors.textPrimary },
          }}
        />
        <Stack.Screen
          name="games/[id]"
          options={{
            headerTintColor: colors.accent,
            headerShown: true,
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTitleStyle: { color: colors.textPrimary },
          }}
        />
       <Stack.Screen name="favorites" options={{
          headerTintColor: colors.accent,
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTitleStyle: { color: colors.textPrimary },

      }}/>
      </Stack>
    </View>
  );
}

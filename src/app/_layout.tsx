import { colors } from "@/themes/themes";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
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
      <Stack.Screen name="favorites" options={{headerShown:true}}/>
    </Stack>
  );
}

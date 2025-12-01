import { Tabs } from "expo-router";
const Ionicons = require("@expo/vector-icons/Ionicons").default;
import { colors, fonts } from "@/themes/themes";


const tabIcons: Record<string, string> = {
  index: "home",
  profile: "person",
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: colors.background,
        },
        tabBarActiveTintColor: colors.accent,
        tabBarStyle: { backgroundColor: colors.background ,borderTopColor: colors.background},
        headerTitleStyle: { fontFamily: fonts.bold, color: colors.textPrimary },
        tabBarIcon: ({ color, size }) => {
          const name = tabIcons[route.name] ?? "ellipse";
          return <Ionicons name={name} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: true,
        }}
      />
    </Tabs>
  );
}

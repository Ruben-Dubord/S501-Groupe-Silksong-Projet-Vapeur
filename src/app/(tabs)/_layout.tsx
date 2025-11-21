import { Tabs } from "expo-router";
const Ionicons = require("@expo/vector-icons/Ionicons").default;

const tabIcons: Record<string, string> = {
  index: "home",
  profile: "person",
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const name = tabIcons[route.name] ?? "ellipse";
          return <Ionicons name={name} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Accueil" }} />
      <Tabs.Screen name="profile" options={{ title: "Profil" }} />
    </Tabs>
  );
}

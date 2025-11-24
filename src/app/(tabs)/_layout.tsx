import { Tabs } from "expo-router";
const Ionicons = require("@expo/vector-icons/Ionicons").default;
import { fonts } from "@/themes/themes";


const tabIcons: Record<string, string> = {
  index: "home",
  profile: "person",
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerTitleStyle: { fontFamily: fonts.bold },
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

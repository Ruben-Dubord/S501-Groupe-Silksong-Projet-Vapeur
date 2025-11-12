import { Link } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../components/Card";

const games = [
  { id: 1, name: "Hollow Knight", image: "../assets/games/hollow-knight.png" },
  { id: 2, name: "Elden Ring", image: "../assets/games/elden-ring.png" },
  { id: 3, name: "Dark Souls", image: "../assets/games/dark-souls.png" },
  { id: 4, name: "Celeste", image: "../assets/games/celeste.png" },
  {
    id: 5,
    name: "Stardew Valley",
    image: "../assets/games/stardew-valley.png",
  },
];

export default function Index() {
  return (
    <SafeAreaView>
      {games.map((game) => (
        <Card key={game.id}>
          <Link
            href={{
              pathname: "/games/[id]",
              params: { id: game.id, name: game.name },
            }}
          >
            <Text>{game.name} </Text>
          </Link>
        </Card>
      ))}
    </SafeAreaView>
  );
}

import { Link } from "expo-router";
import { Text, View, Image, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../../components/Card";
import { DBProvider, useFetchers, getGameImage } from "../database";
import { useEffect, useState } from "react";

const styles = StyleSheet.create({
  titre: { fontSize: 20, fontWeight: "bold", margin: 10 },
  container: { padding: 2 },
  item: { flex: 1, alignContent: "center", alignItems: "center" },
  image: { width: 220, height: 100 },
});

function IndexSetup() {
  type game = {
    AppID: number;
    Name: string;
    RequiredAge: number;
    Price: number;
    Description: string;
    HeaderImage: any;
    Developers: string;
    Publishers: string;
    Tags: string;
    Liked: boolean;
  };

  const { getAllGames } = useFetchers();
  const [games, setGames] = useState<game[]>([]);

  useEffect(() => {
    async function load() {
      const data = await getAllGames();
      setGames(data as game[]);
    }
    load();
  }, []);

  type gameProps = {
    id: number;
    name: string;
    image: any;
  };

  const gamePropsArray: gameProps[] = games.map((game) => ({
    id: game.AppID,
    name: game.Name,
    image: getGameImage(game.AppID),
  }));

  const numColumns = 2;

  // Render chaque jeu(item) dans la FlatList en card
  const renderItem = ({ item }: { item: gameProps }) => (
    <View style={styles.item}>
      <Card>
        <Link
          href={{
            pathname: "/games/[id]",
            params: { id: item.id, name: item.name },
          }}
        >
          <Text style={styles.titre}>{item.name} </Text>
          <Image style={styles.image} source={item.image} />
        </Link>
      </Card>
    </View>
  );

  //remplit les lignes vides de la FlatList pour garder la structure en grille
  const formatData = (data: gameProps[], numColumns: number) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);
    let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;

    while (
      numberOfElementsLastRow !== numColumns &&
      numberOfElementsLastRow !== 0
    ) {
      data.push({ id: -1, name: "blank", image: null });
      numberOfElementsLastRow++;
    }
    return data;
  };

  return (
    <SafeAreaView>
      <FlatList
        style={styles.container}
        keyExtractor={(game) => game.id.toString()}
        data={formatData(gamePropsArray, numColumns)}
        renderItem={renderItem}
        numColumns={numColumns}
      />
    </SafeAreaView>
  );
}

type gameProps = {
  id: number;
  name: string;
  image: any;
};

export default function Index() {
  return (
    <DBProvider>
      <IndexSetup />
    </DBProvider>
  );
}

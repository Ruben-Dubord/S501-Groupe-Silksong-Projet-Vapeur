import { Link } from "expo-router";
import { Text, View ,Image, FlatList,StyleSheet} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../components/Card";

const games = [
  {
    id: 1,
    name: "Hollow Knight",
    image: require("../assets/images/GameImages/10.jpg"),
  },
  {
    id: 2,
    name: "Elden Ring",
    image: require("../assets/images/GameImages/10.jpg"),
  },
  {
    id: 3,
    name: "Dark Souls",
    image: require("../assets/images/GameImages/10.jpg"),
  },
  {
    id: 4,
    name: "Celeste",
    image: require("../assets/images/GameImages/10.jpg"),
  },
  {
    id: 5,
    name: "Stardew Valley",
    image: require("../assets/images/GameImages/10.jpg"),
  },
];

type gameProps = {
  id: number;
  name: string;
  image: any;
};

const numColumns = 2;

// Render chaque jeu(item) dans la FlatList en card
const renderItem = ({ item }: { item: gameProps }) => (
  <View style={styles.item}>
    <Card>
      <Link
        href={{
          pathname: "/games/[id]",
          params: { id: item.id, name: item.name },
        }}>
        <Text style={styles.titre} >{item.name} </Text>
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
}

export default function Index() {
  return (
    <SafeAreaView>
        <Link href="/favorites">Favorite Games</Link>
      <FlatList
        style={styles.container}
        keyExtractor={(game) => game.id.toString()}
        data={formatData(games, numColumns)}
        renderItem={renderItem}
        numColumns={numColumns}
      />
    </SafeAreaView>
  );
}

const styles= StyleSheet.create({
  titre: { fontSize: 20, fontWeight: "bold", margin: 10 },
  container: { padding: 2 },
  item: {flex:1, alignContent:'center', alignItems:'center'},
  image: { width:100,height:220}
});
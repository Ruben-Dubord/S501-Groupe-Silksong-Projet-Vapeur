import { Link } from "expo-router";
import { Text, View, Image, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../components/Card";

type gameProps = {
  id: number;
  name: string;
  image: any;
};


const numColumns = 2;

// Render chaque jeu(item) dans la FlatList en card
const renderItem = ({ item }: { item: gameProps }) => {
  if (item.name === "blank") {
    return <View style={[styles.item, styles.invisible]} />;
  }
  return (
    <View style={styles.item}>
      <Card>
        <Link
          href={{
            pathname: "/games/[id]",
            params: { title : item.name,id: item.id, name: item.name },
          }}
        > 
          <Text style={styles.titre}>{item.name} </Text>
          <Image style={styles.image} source={item.image} />
        </Link>
      </Card>
    </View>
  );
};

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

export default function Home(HomeProps: { data: gameProps[] }) {
  return (
    <SafeAreaView>
      <FlatList
        style={styles.container}
        keyExtractor={(game) => game.id.toString()}
        data={formatData(HomeProps.data, numColumns)}
        renderItem={renderItem}
        numColumns={numColumns}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  invisible: { backgroundColor: "transparent" },
  titre: { fontSize: 20, fontWeight: "bold", margin: 10 },
  container: { padding: 2,height: '100%' },
  item: { flex: 1, alignContent: "center", alignItems: "center" },
  image: { width: 100, height: 220 },
});

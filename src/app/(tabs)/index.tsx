import { Link } from "expo-router";
import { Text, View ,Image, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../../components/Card";
import DBProvider, { useFetchers, getGameImage } from "../database";
import { useEffect, useState } from "react";

const styles= StyleSheet.create({
  titre: { fontSize: 20, fontWeight: "bold", margin: 10 },
  container: { padding: 2 },
  item: {flex:1, alignContent:'center', alignItems:'center'},
  image: { width:220,height:100 }
});

function IndexSetup() {

  type game = {
    AppID: number;
    Name: string;
    RequiredAge: number;
    Price: number;
    Description: string;
    HeaderImage: string;
    Developers: string;
    Publishers: string;
    Tags: string;
    Liked: boolean;
  };

  const { getUnlikedGames } = useFetchers();
  const [games, setGames] = useState<game[]>([]);

  useEffect(() => {
    async function load() {
      const data = await getUnlikedGames();
      setGames(data as game[]);
    }
    load();
  }, []);

  const numColumns = 2;

  // Render chaque jeu(item) dans la FlatList en card
  const renderItem = ({ item }: { item: game }) => (
    <View style={styles.item}>
      <Card>
        <Link
          href={{
            pathname: "/games/[id]",
            params: { 
              id: item.AppID, 
              name: item.Name, 
              requiredAge: item.RequiredAge, 
              price: item.Price, 
              description: item.Description, 
              developers: item.Developers, 
              publishers: item.Publishers, 
              tags: item.Tags 
            },
          }}>
          <Text style={styles.titre} >{item.Name} </Text>
          <Image style={styles.image} source={getGameImage(item.AppID)} />
        </Link>
      </Card>
    </View>
  );

  //remplit les lignes vides de la FlatList pour garder la structure en grille
  const formatData = (data: game[], numColumns: number) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);
    let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;

    while (
      numberOfElementsLastRow !== numColumns &&
      numberOfElementsLastRow !== 0
    ) {
      data.push({
        AppID: -1,
        Name: "", 
        HeaderImage: "",
        RequiredAge: 0,
        Price: 0,
        Description: "",
        Developers: "",
        Publishers: "",
        Tags: "",
        Liked: false
      });
      numberOfElementsLastRow++;
    }
    return data;
  }
  
  return (
    <SafeAreaView>
      <FlatList
        style={styles.container}
        keyExtractor={(game) => game.AppID.toString()}
        data={formatData(games, numColumns)}
        renderItem={renderItem}
        numColumns={numColumns}
      />
    </SafeAreaView>
  );
}

export default function Index() {
  return (
    <DBProvider>
      <IndexSetup />
    </DBProvider>
  );
}

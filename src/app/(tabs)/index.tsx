import { Link } from "expo-router";
import { Text, View ,Image, FlatList, StyleSheet, Pressable } from "react-native";
import DBProvider, { useFetchers, getGameImage } from "@/app/database";
import React, { useEffect, useState } from "react";
import { colors,fonts,fontSize,spacing ,radius} from "@/themes/themes";
import Like from "@/components/Like";
import Card from "@/components/Card";
import Tags from "@/components/Tags";

const styles= StyleSheet.create({
  titre: { color:'white',fontSize: fontSize.large, fontFamily: fonts.bold},
  container: {   backgroundColor: colors.background,width:'100%'},
  item: {flex:2,fontFamily:fonts.regular,margin:spacing.medium},
  image: { width:'100%',resizeMode:'contain',borderRadius:8  },
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

/* remove liked game from list when liked */
  function removeLiked() {
    async function refreshLikedGames() {
      const data = await getUnlikedGames();
      setGames(data as game[]);
    }
    refreshLikedGames();}

  const numColumns = 1;

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
              tags: item.Tags,
            },
          }}
        >
          <Image style={styles.image} source={getGameImage(item.AppID)} />

          <Text style={styles.titre}>{item.Name} </Text>

          <View
            style={{
              marginHorizontal: 10,
              marginBottom: spacing.small,
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            <Tags
              tags={item.Tags}
              colors={colors}
              spacing={spacing}
              radius={radius}
              fonts={fonts}
              fontSize={fontSize}
            />

            <Pressable onPress={removeLiked}>
              <Like id={item.AppID} />
            </Pressable>
          </View>
        </Link>
      </Card>
    </View>
  );

  
  return (
   <View>
      <FlatList
        style={styles.container}
        keyExtractor={(game) => game.AppID.toString()}
        data={games}
        renderItem={renderItem}
        numColumns={numColumns}
      />
    </View>
  );
}

export default function Index() {
  return (
    <DBProvider>
      <IndexSetup />
    </DBProvider>
  );
}

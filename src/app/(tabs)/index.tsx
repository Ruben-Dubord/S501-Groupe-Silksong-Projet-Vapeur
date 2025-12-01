import { router } from "expo-router";
import { Text, View ,Image, FlatList, StyleSheet, Pressable } from "react-native";
import DBProvider, { useFetchers, getGameImage } from "@/app/database";
import React, { useEffect, useState } from "react";
import { colors,fonts,fontSize,spacing } from "@/themes/themes";
import Like from "@/components/Like";
import Card from "@/components/Card";
import Tags from "@/components/Tags";

const styles= StyleSheet.create({
  titre: { color:'white',fontSize: fontSize.large, fontFamily: fonts.bold, flexWrap:'nowrap', marginVertical: spacing.small},
  container: {   backgroundColor: colors.background,width:'100%'},
  item: {fontFamily:fonts.regular,margin:spacing.medium},
  image: { width:'100%',resizeMode:'contain'},
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

  /* render item(game) for FlatList */
  const renderItem = ({ item }: { item: game }) => (
    <View style={styles.item}>
      <Card>
        <Pressable
          onPress={() => {
            router.push({
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
            });
          }}
        >
          <Image style={styles.image} source={getGameImage(item.AppID)} />
          <Text style={styles.titre}>{item.Name} </Text>

          <Tags tags={item.Tags} />
          <Pressable
            onPress={removeLiked}
            style={{ marginBottom: spacing.extrasmall, flex: 1 }}
          >
            <Like id={item.AppID} />
          </Pressable>
        </Pressable>
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

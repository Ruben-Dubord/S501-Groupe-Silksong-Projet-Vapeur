import { router } from "expo-router";
import { Text, View ,Image, FlatList, StyleSheet, Pressable } from "react-native";
import DBProvider, { useFetchers, getGameImage } from "@/app/database";
import React, { useEffect, useState } from "react";
import { colors,fonts,fontSize,spacing } from "@/themes/themes";
import Like from "@/components/Like";
import Card from "@/components/Card";
import Tags from "@/components/Tags";
import "@/scripts/recommendations"
import { getRecommendations } from "@/scripts/recommendations";
import { updateUserPreferences } from "@/scripts/storage";

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

  const { getUnlikedGames, getLikedGames, getAllTagsOneGame, getAllTags } = useFetchers();
  const [games, setGames] = useState<game[]>([]);

  useEffect(() => {
    async function load() {
      const unlikedGames = await getUnlikedGames() as game[];
      const likedGame = await getLikedGames() as game[];
      let initialPreferences: Record<string, number> = {};
      if (likedGame.length == 0){
        const tags = await getAllTags();
        tags.forEach((tag: string) => {
          initialPreferences[tag] = 0.5; // Valeur initiale neutre
        });
      } else {
        for(let g of likedGame){
          const gameTags = await getAllTagsOneGame(g.AppID);
          gameTags.forEach((tag: string) => {
          if(initialPreferences[tag]){
              initialPreferences[tag] += 0.5;
            } else {
              initialPreferences[tag] = 0.5;
            }
          });
        }
      }
      await updateUserPreferences(initialPreferences);
      const scoredGames = await getRecommendations(unlikedGames);
      let data: game[] = [];
      for (let g of scoredGames) {
        data.push(g.gameData)
      }
      setGames(data);
    }
    load();
  }, []);

/* remove liked game from list when liked */
  async function refreshLikedGames() {
    const unlikedGames = await getUnlikedGames() as game[];
    const scoredGames = await getRecommendations(unlikedGames);
    let data: game[] = [];
    for (let g of scoredGames) {
      data.push(g.gameData)
    }
    setGames(data);
    refreshing = false;
  }

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
          <Pressable style={{ marginBottom: spacing.extrasmall, flex: 1 }}>
            <Like id={item.AppID} />
          </Pressable>
        </Pressable>
      </Card>
    </View>
  );

  let refreshing = false;

  function onRefresh() {
    refreshing = true;
    refreshLikedGames();
  }
  
  return (
   <View>
      <FlatList
        style={styles.container}
        keyExtractor={(game) => game.AppID.toString()}
        data={games}
        renderItem={renderItem}
        numColumns={numColumns}
        onRefresh={() => onRefresh()}
        refreshing={refreshing}
      />
    </View>
  );
}

export default function Index() {
  return (
      <IndexSetup />
  );
}

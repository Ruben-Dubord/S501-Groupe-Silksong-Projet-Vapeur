import { Link } from "expo-router";
import { Text, View ,Image, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../../components/Card";
import { DBProvider, useFetchers, getGameImage } from "../database";
import { useEffect, useState } from "react";
import { colors,fonts,fontSize,spacing ,radius} from "@/themes/themes";

const styles= StyleSheet.create({
  titre: { fontSize: fontSize.large, fontFamily: fonts.bold, margin: 10 },
  container: {   backgroundColor: colors.background,width:'100%'},
  item: {flex:2,fontFamily:fonts.regular,margin:5},
  image: { width:'100%',resizeMode:'contain',borderRadius:8  },
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

  const { getAllGames, getUnlikedGames, getLikedGames } = useFetchers();
  const [games, setGames] = useState<game[]>([]);

  useEffect(() => {
      async function load() {
        const data = await getLikedGames();
        setGames(data as game[]);
      }
      load();
    }, []);

  if (games.length === 0) {
    useEffect(() => {
      async function load() {
        const data = await getAllGames();
        setGames(data as game[]);
      }
      load();
    }, []);
  } else {
    useEffect(() => {
      async function load() {
        const data = await getUnlikedGames();
        setGames(data as game[]);
      }
      load();
    }, []);
  }

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
            {(() => {
              const tags = (item.Tags || "")
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean);
              return tags.map((tag, i) => (
                <Text
                  key={i}
                  style={{
                    backgroundColor: colors.tagActiveBackground,
                    color: colors.tagActiveText,
                    paddingHorizontal: spacing.small,
                    paddingVertical: spacing.extrasmall,
                    borderRadius: radius.small,
                    marginRight: spacing.small,
                    marginBottom: spacing.small,
                    fontFamily: fonts.regular,
                    fontSize: fontSize.small,
                  }}
                >
                  {tag}
                  {i < tags.length - 1 ? " " : ""}
                </Text>
              ));
            })()}
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

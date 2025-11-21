import { useLocalSearchParams } from "expo-router";
import { Text, View, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DBProvider, useFetchers, getGameImage } from "../database";
import { useEffect, useState } from "react";

function GameSetup() {
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

  const params = useLocalSearchParams();
  const { getGameById } = useFetchers();

  const [game, setGame] = useState<game>({} as game);

  useEffect(() => {
    async function loadGame() {
      const gameData = await getGameById(Number(params.id));
      setGame(gameData as game);
    }
    loadGame();
  }, [params.id]);
  return (
    <SafeAreaView>
      <ScrollView>
        <Image source={getGameImage(game.AppID)} />
        <Text>ID Steam : {game.AppID}</Text>
        <Text>Nom du jeu : {game.Name}</Text>
        <Text>Age requis : {game.RequiredAge}</Text>
        <Text>Prix : {game.Price} $</Text>
        <Text>Description : {game.Description}</Text>
        <Text>Développeurs : {game.Developers}</Text>
        <Text>Éditeurs : {game.Publishers}</Text>
        <Text>Tags : {game.Tags}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

export default function game() {
  return (
    <DBProvider>
      <GameSetup />
    </DBProvider>
  );
}

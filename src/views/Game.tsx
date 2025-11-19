import { Stack, useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DBProvider, useFetchers, getGameImage } from "../../database";
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
  const title = params.title as string;
  return (
    <SafeAreaView>
      <Stack.Screen options={{ title: title }} />
      <Text>{params.name}</Text>
      <Text>id :{params.id}</Text>
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

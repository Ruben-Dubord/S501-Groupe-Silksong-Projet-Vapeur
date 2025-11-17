import { ScrollView, Text, Image, View } from "react-native";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { gameImages } from "../assets/images/GameImages";

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

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SQLiteProvider databaseName="vapeur-1-1.db" assetSource={{ assetId: require("../database/vapeur.db") }}>
        <Test />
      </SQLiteProvider>
    </View>
  );
}

function getGameImage(appId: number) {
  try {
    return gameImages[appId];
  } catch (e) {
    return require("../assets/images/DefaultImage.jpg");
  }
}

export function Test() {
  const db = useSQLiteContext();
  const [test, setTest] = useState<game[]>([]);
  useEffect(() => {
    async function fetchData() {
      const result = await db.getAllAsync<game>("SELECT * FROM games ORDER BY RANDOM();");
      setTest(result);
    }
    fetchData();
  }, []);
  return (
    <ScrollView>
      {test.map((item) => (
        <Image
          key={item.AppID}
          source={getGameImage(item.AppID)}
          style={{ width: 100, height: 100 }}
        />
      ))}
    </ScrollView>
  );
}
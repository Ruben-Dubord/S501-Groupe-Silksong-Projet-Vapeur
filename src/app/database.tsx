import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import { gameImages } from "../assets/images/GameImages";

export const DBProvider = ({children}: any) => {
  return (
    <SQLiteProvider databaseName="vapeur-1-1.db" assetSource={{ assetId: require("../database/vapeur.db") }}>
      {children}
    </SQLiteProvider>
  );
}

export function getGameImage(appId: number) {
  try {
    return gameImages[appId];
  } catch (e) {
    return require("../assets/images/DefaultImage.jpg");
  }
}

export function useFetchers() {
  const db = useSQLiteContext();

  const getAllGames = async () => {
    const games = await db.getAllAsync("SELECT * FROM games ORDER BY RANDOM();");
    return games;
  };

  const getUnlikedGames = async () => {
    const games = await db.getAllAsync("SELECT * FROM games WHERE Liked = 0;");
    return games;
  };

  const getLikedGames = async () => {
    const games = await db.getAllAsync("SELECT * FROM games WHERE Liked = 1;");
    return games;
  };

  const setGameLikedStatus = async (id: number, liked: boolean) => {
    await db.runAsync("UPDATE games SET Liked = ? WHERE AppID = ?;", [liked ? 1 : 0, id]);
  }

  return {
    getAllGames,
    getUnlikedGames,
    getLikedGames,
    setGameLikedStatus
  };
}
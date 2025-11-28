import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import { gameImages } from "../assets/images/GameImages";

export default function DBProvider({children}: any) {
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
    const games = await db.getAllAsync("SELECT * FROM games WHERE Liked = 0 ORDER BY Name;");
    return games;
  };

  const getLikedGames = async () => {
    const games = await db.getAllAsync("SELECT * FROM games WHERE Liked = 1 ORDER BY Name;");
    return games;
  };

  const setGameLikedStatus = async (id: number, liked: boolean) => {
    if (liked) {
      await db.runAsync("UPDATE games SET Liked = 1 WHERE AppID = ?;", [id]);
    } else {
      await db.runAsync("UPDATE games SET Liked = 0 WHERE AppID = ?;", [id]);
    }
  };

  const getNumberOfLikedGames = async () => {
    const rows = await db.getAllAsync(
      "SELECT COUNT(*) AS count FROM games WHERE Liked = 1;"
    ) as { count: number }[];

    return rows[0].count;
  };





  return {
    getAllGames,
    getUnlikedGames,
    getLikedGames,
    setGameLikedStatus,
    getNumberOfLikedGames
  };
}
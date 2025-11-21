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

  const getGameById = async (id: number) => {
    const game = await db.getFirstAsync("SELECT * FROM games WHERE AppID = ?;", [id]);
    return game;
  };

  const getUnlikedGames = async () => {
    const games = await db.getAllAsync("SELECT * FROM games WHERE Liked = 0;");
    return games;
  };

  const getLikedGames = async () => {
    const games = await db.getAllAsync("SELECT * FROM games WHERE Liked = 1;");
    return games;
  };

  return {
    getAllGames,
    getGameById,
    getUnlikedGames,
    getLikedGames
  };
}
// scripts/storage.ts
// Ce fichier gère le stockage local des préférences utilisateur et de l'historique des jeux.
// Il utilise AsyncStorage pour persister les données dans l'application React Native.

import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_PREFERENCES_KEY = 'userPreferences';
const USER_HISTORY_KEY = 'userHistory';

/**
 * Récupère les préférences utilisateur depuis le stockage local.
 * @returns Un objet contenant les préférences utilisateur ou un objet vide en cas d'erreur.
 */
export const getUserPreferences = async (): Promise<Record<string, number>> => {
  try {
    const preferences = await AsyncStorage.getItem(USER_PREFERENCES_KEY);
    return preferences ? JSON.parse(preferences) : {};
  } catch (error) {
    console.error("Erreur dans la méthode getUserPreferences:", error);
    return {};
  }
};

/**
 * Met à jour les préférences utilisateur dans le stockage local.
 * @param newPreferences Les nouvelles préférences à stocker.
 */
export const updateUserPreferences = async (newPreferences: Record<string, number>): Promise<void> => {
  try {
    const preferencesString = JSON.stringify(newPreferences);
    await AsyncStorage.setItem(USER_PREFERENCES_KEY, preferencesString);
  } catch (error) {
    console.error("Erreur dans la méthode updateUserPreferences:", error);
  }
};

/**
 * Récupère l'historique des actions utilisateur depuis le stockage local.
 * @returns Un tableau d'objets représentant l'historique ou un tableau vide en cas d'erreur.
 */
export const getUserHistory = async (): Promise<Array<{ gameId: number; liked: boolean; timestamp: string }>> => {
  try {
    const userHistory = await AsyncStorage.getItem(USER_HISTORY_KEY);
    return userHistory ? JSON.parse(userHistory) : [];
  } catch (error) {
    console.error("Erreur dans la méthode getUserHistory:", error);
    return [];
  }
};

/**
 * Ajoute une nouvelle entrée à l'historique utilisateur.
 * @param gameId L'identifiant du jeu.
 * @param liked Indique si le jeu a été aimé ou non.
 */
export const addToHistory = async (gameId: number, liked: boolean): Promise<void> => {
  try {
    const history = await AsyncStorage.getItem(USER_HISTORY_KEY);
    const currentHistory = history ? JSON.parse(history) : [];
    const newEntry = {
      gameId: gameId,
      liked: liked,
      timestamp: new Date().toISOString()
    };
    const updatedHistory = [...currentHistory, newEntry];
    await AsyncStorage.setItem(USER_HISTORY_KEY, JSON.stringify(updatedHistory));
  } catch (error) {
    console.error("Erreur dans la méthode addToHistory:", error);
  }
};

// src/scripts/recommendation.ts
import { getUserPreferences, getUserHistory } from './storage';

// Définir le type pour un jeu
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

function str_to_array(str: string): string[] {
  return str.split(',').map(tag => tag.trim());
}

/**
 * Calcule le coefficient de Dice entre les tags préférés de l'utilisateur et les tags d'un jeu.
 * @param userTags - Les tags préférés de l'utilisateur (ex: { Racing: 0.8, Simulation: 0.5 }).
 * @param gameTags - Les tags d'un jeu (ex: ["Racing", "Simulation"]).
 * @returns Le coefficient de Dice (entre 0 et 1).
 */
const diceCoefficient = (userTags: Record<string, number>, gameTags: string[]): number => {
  const userTagSet = new Set(Object.keys(userTags));
  const gameTagSet = new Set(gameTags);

  // Calculer l'intersection
  const intersection = [...userTagSet].filter(tag => gameTagSet.has(tag)).length;

  // Éviter la division par zéro
  const union = userTagSet.size + gameTagSet.size;
  if (union === 0) return 0;

  return (2 * intersection) / union;
};

/**
 * Calcule le score d'un jeu en fonction des préférences de l'utilisateur.
 * @param game - Le jeu à évaluer.
 * @param preferences - Les préférences de l'utilisateur.
 * @returns Le score du jeu (entre 0 et 1).
 */
const calculateGameScore = (game: game, preferences: Record<string, number>): number => {
  const diceScore = diceCoefficient(preferences, str_to_array(game.Tags));

  // Calculer la préférence moyenne pour les tags du jeu
  const relevantTags = str_to_array(game.Tags).filter(tag => preferences[tag] !== undefined);
  if (relevantTags.length === 0) return 0;

  const avgPreference = relevantTags.reduce((sum, tag) => sum + (preferences[tag] || 0), 0) / relevantTags.length;

  return diceScore * avgPreference;
};

/**
 * Récupère les recommandations de jeux pour l'utilisateur.
 * @returns Une liste de jeux triée par score décroissant.
 */
export async function getRecommendations(validatedGamesData: game[]): Promise<Array<{ gameData: game; score: number; }>> {
  try {
    const preferences = await getUserPreferences();
    const history = await getUserHistory();

    // Si aucune préférence n'est définie, retourner une liste vide
    if (Object.keys(preferences).length === 0) {
      let freshData : Array<{ gameData: game; score: number; }> = [{ gameData: validatedGamesData[0], score: 0 }];
      validatedGamesData.forEach(game => {
        freshData.push({ gameData: game, score: 0 });
      });
      return freshData;
    }

    const scoredGames = validatedGamesData.map(game => {
      let score = calculateGameScore(game, preferences);

      // Ajustement basé sur l'historique
      const userHistoryForGame = history.filter(item => item.gameId === game.AppID);
      userHistoryForGame.forEach(item => {
        const likedFactor = item.liked ? 0.2 : -0.3;
        score += likedFactor;
      });

      return { gameData: game, score };
    });

    // Trier par score décroissant
    scoredGames.sort((a, b) => b.score - a.score);
    return scoredGames;
  } catch (error) {
    console.error("Erreur dans getRecommendations:", error);
    return [];
  }
};


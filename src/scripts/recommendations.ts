// src/scripts/recommendation.ts
import { getUserPreferences, getUserHistory } from './storage';
import gamesData from '../database/games.json';

// Définir le type pour un jeu
type Game = {
  AppID: number;
  Name: string;
  Tags: string[];
};

// Vérifier que gamesData est bien typé
const validatedGamesData: Game[] = gamesData.map(game => ({
  AppID: game.AppID,
  Name: game.Name,
  Tags: Array.isArray(game.Tags) ? game.Tags : [],
}));

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
const calculateGameScore = (game: Game, preferences: Record<string, number>): number => {
  const diceScore = diceCoefficient(preferences, game.Tags);

  // Calculer la préférence moyenne pour les tags du jeu
  const relevantTags = game.Tags.filter(tag => preferences[tag] !== undefined);
  if (relevantTags.length === 0) return 0;

  const avgPreference = relevantTags.reduce((sum, tag) => sum + (preferences[tag] || 0), 0) / relevantTags.length;

  return diceScore * avgPreference;
};

/**
 * Récupère les recommandations de jeux pour l'utilisateur.
 * @returns Une liste de jeux triée par score décroissant.
 */
export const getRecommendations = async (): Promise<Array<{ gameId: number; score: number; name: string }>> => {
  try {
    const preferences = await getUserPreferences();
    const history = await getUserHistory();

    // Si aucune préférence n'est définie, retourner une liste vide
    if (Object.keys(preferences).length === 0) {
      return [];
    }

    const scoredGames = validatedGamesData.map(game => {
      let score = calculateGameScore(game, preferences);

      // Ajustement basé sur l'historique
      const userHistoryForGame = history.filter(item => item.gameId === game.AppID);
      userHistoryForGame.forEach(item => {
        const likedFactor = item.liked ? 0.2 : -0.3;
        score += likedFactor;
      });

      return { gameId: game.AppID, score, name: game.Name };
    });

    // Trier par score décroissant
    scoredGames.sort((a, b) => b.score - a.score);

    // Retourner uniquement les jeux avec un score > 0
    return scoredGames.filter(game => game.score > 0);
  } catch (error) {
    console.error("Erreur dans getRecommendations:", error);
    return [];
  }
};

// src/scripts/recommendation.test.ts
import { getRecommendations } from './recommendations';
import { getUserPreferences, getUserHistory } from './storage';

jest.mock('./storage');

describe('Recommendation Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return empty recommendations if no preferences', async () => {
    (getUserPreferences as jest.Mock).mockResolvedValue({});
    (getUserHistory as jest.Mock).mockResolvedValue([]);
    const recommendations = await getRecommendations();
    expect(recommendations).toEqual([]);
  });

  it('should return recommendations based on Dice coefficient', async () => {
    (getUserPreferences as jest.Mock).mockResolvedValue({ Racing: 0.8, Simulation: 0.5 });
    (getUserHistory as jest.Mock).mockResolvedValue([{ gameId: 805550, liked: true }]);
    const recommendations = await getRecommendations();
    expect(recommendations.length).toBeGreaterThan(0);
    expect(recommendations[0].score).toBeGreaterThan(0);
  });

  it('should handle empty history', async () => {
    (getUserPreferences as jest.Mock).mockResolvedValue({ Racing: 0.8 });
    (getUserHistory as jest.Mock).mockResolvedValue([]);
    const recommendations = await getRecommendations();
    expect(Array.isArray(recommendations)).toBe(true);
    recommendations.forEach(game => {
      expect(game.score).toBeGreaterThan(0);
    });
  });

  it('should handle errors gracefully', async () => {
    (getUserPreferences as jest.Mock).mockRejectedValue(new Error('Failed to fetch preferences'));
    const recommendations = await getRecommendations();
    expect(recommendations).toEqual([]);
  });

  it('should filter out games with zero score', async () => {
    (getUserPreferences as jest.Mock).mockResolvedValue({ 'NonExistentTag': 0.8 });
    (getUserHistory as jest.Mock).mockResolvedValue([]);
    const recommendations = await getRecommendations();
    expect(recommendations.every(game => game.score > 0)).toBe(true);
  });
});

// src/scripts/testStorage.ts
import { getUserPreferences, updateUserPreferences, getUserHistory, addToHistory } from './storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage');

describe('Storage Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return empty preferences initially', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
    const prefs = await getUserPreferences();
    expect(prefs).toEqual({});
  });

  it('should update and retrieve preferences', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
    await updateUserPreferences({ RPG: 0.8 });
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('userPreferences', JSON.stringify({ RPG: 0.8 }));

    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify({ RPG: 0.8 }));
    const prefs = await getUserPreferences();
    expect(prefs).toEqual({ RPG: 0.8 });
  });

  it('should add to history', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
    await addToHistory(1, true);
    expect(AsyncStorage.setItem).toHaveBeenCalled();
  });
});

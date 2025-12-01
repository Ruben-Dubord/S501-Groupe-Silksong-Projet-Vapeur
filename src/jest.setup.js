// src/jest.setup.js
// Mock manuel pour react-native
jest.mock('react-native', () => {
  return {
    __esModule: true,
    default: jest.fn(),
    // Ajoute d'autres mocks ici si nécessaire
  };
});

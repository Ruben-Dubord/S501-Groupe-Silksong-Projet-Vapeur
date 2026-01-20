// scripts/async-storage.d.ts

// Fichier de déclaration pour le module @react-native-async-storage/async-storage
// Cela fournit les définitions de types TypeScript pour la fonctionnalité AsyncStorage dans React Native
declare module '@react-native-async-storage/async-storage' {

  // Interface définissant les méthodes statiques disponibles sur l'objet AsyncStorage
  export interface AsyncStorageStatic {

    // Récupère la valeur associée à la clé donnée depuis le stockage
    // Retourne null si la clé n'existe pas
    getItem(key: string): Promise<string | null>;

    // Stocke une paire clé-valeur dans le stockage
    // Écrase toute valeur existante pour la clé
    setItem(key: string, value: string): Promise<void>;

    // Supprime l'élément associé à la clé donnée du stockage
    removeItem(key: string): Promise<void>;

    // Fusionne la valeur donnée avec une valeur existante pour la clé
    // Si aucune valeur existante, se comporte comme setItem
    mergeItem(key: string, value: string): Promise<void>;

    // Efface toutes les paires clé-valeur du stockage
    clear(): Promise<void>;

    // Retourne un tableau de toutes les clés stockées dans le stockage
    getAllKeys(): Promise<string[]>;

    // Récupère plusieurs paires clé-valeur à la fois
    // Retourne un tableau de tuples [clé, valeur], où valeur est null si la clé n'existe pas
    multiGet(keys: string[]): Promise<[string, string | null][]>;

    // Stocke plusieurs paires clé-valeur à la fois
    multiSet(keyValuePairs: [string, string][]): Promise<void>;

    // Supprime plusieurs éléments du stockage par leurs clés
    multiRemove(keys: string[]): Promise<void>;

    // Fusionne plusieurs paires clé-valeur avec les valeurs existantes
    multiMerge(keyValuePairs: [string, string][]): Promise<void>;
  }

  // L'objet AsyncStorage principal implémentant l'interface AsyncStorageStatic
  const AsyncStorage: AsyncStorageStatic;

  // Export par défaut de l'objet AsyncStorage
  export default AsyncStorage;
}

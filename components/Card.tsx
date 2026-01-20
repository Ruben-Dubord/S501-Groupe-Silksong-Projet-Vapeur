// Importation des composants nécessaires de React Native
import { View } from "react-native";
// Importation des couleurs depuis le fichier de thèmes
import { colors } from "../themes/themes";

// Composant Card par défaut qui accepte des enfants React
export default function Card(props: { children: React.ReactNode }) {
  // Retourne une vue stylisée contenant les enfants passés en props
  return (
    // Vue principale de la carte avec les styles définis
    <View style={StyleSheet.card}>
      <View style={StyleSheet.cardContent}>{props.children}</View>
    </View>
  );
}

// Définition des styles pour le composant Card
const StyleSheet = {
  // Style pour la carte principale : couleur de fond, bordures arrondies, ombre, etc.
  card: {
    backgroundColor: colors.border, // Couleur de fond depuis les thèmes
    borderRadius: 8, // Bordures arrondies
    shadowColor: "#000", // Couleur de l'ombre
    shadowOffset: { width: 0, height: 2 }, // Décalage de l'ombre
    shadowOpacity: 0.1, // Opacité de l'ombre
    shadowRadius: 4, // Rayon de l'ombre
    elevation: 3, // Élévation pour Android
    marginVertical: 2, // Marge verticale
    marginHorizontal: 2, // Marge horizontale
  },
  // Style pour le contenu de la carte : padding autour du contenu
  cardContent: {
    padding: 16, // Espacement interne
  },
};

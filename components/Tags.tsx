import { Text, View } from "react-native";
import { colors,spacing,radius,fontSize,fonts } from "@/themes/themes";

// Couleurs par défaut pour les tags actifs
const defaultColors = {
  tagActiveBackground: colors.tagActiveBackground,
  tagActiveText: colors.tagActiveText,
};

// Espacement par défaut
const defaultSpacing = {
  small: spacing.small,
  extrasmall: 2,
};

// Rayon de bordure par défaut
const defaultRadius = {
  small: radius.small,
};

// Polices par défaut
const defaultFonts = {
  regular: fonts.regular,
};

// Taille de police par défaut
const defaultFontSize = {
  small: fontSize.small,
};

// Interface pour les props du composant Tags
interface TagsProps {
  tags: string; // Chaîne de tags séparés
  colors?: { // Couleurs personnalisables
    tagActiveBackground: string;
    tagActiveText: string;
  };
  spacing?: { // Espacement personnalisable
    small: number;
    extrasmall: number;
  };
  radius?: { // Rayon de bordure personnalisable
    small: number;
  };
  fonts?: { // Polices personnalisables
    regular: string;
  };
  fontSize?: { // Taille de police personnalisable
    small: number;
  };
  separator?: string; // Séparateur pour les tags (par défaut ",")
}

// Composant Tags pour afficher une liste de tags
export const Tags: React.FC<TagsProps> = ({
  tags,
  colors = defaultColors,
  spacing = defaultSpacing,
  radius = defaultRadius,
  fonts = defaultFonts,
  fontSize = defaultFontSize,
  separator = ",",
}) => {
  // Diviser la chaîne de tags en tableau, supprimer les espaces et filtrer les vides
  const tagArray = (tags)
    .split(separator)
    .map((t) => t.trim())
    .filter(Boolean);

  // Ne rien rendre si aucun tag
  if (tagArray.length === 0) return null;

  return (
    // Conteneur principal pour les tags
    <View
      style={{
        marginHorizontal:0,
        marginBottom: spacing.small,
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        width: "100%",
      }}
    >
      {/* Mapper chaque tag à un élément Text */}
      {tagArray.map((tag, i) => (
        <Text
          key={`${tag}-${i}`}
          style={{
            includeFontPadding: false,
            textAlignVertical: "center",
            backgroundColor: colors.tagActiveBackground,
            color: colors.tagActiveText,
            paddingHorizontal: spacing.small,
            paddingVertical: spacing.small,
            borderRadius: radius.small,
            margin: spacing.extrasmall,
            fontFamily: fonts.regular,
            fontSize: fontSize.small,
          }}
        >
          {tag}
        </Text>
      ))}
    </View>
  );
};
export default Tags;
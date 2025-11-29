import { Text, View } from "react-native";
import { colors,spacing,radius,fontSize,fonts } from "@/themes/themes";

const defaultColors = {
  tagActiveBackground: colors.tagActiveBackground,
  tagActiveText: colors.tagActiveText,
};

const defaultSpacing = {
  small: spacing.small,
  extrasmall: 2,
};

const defaultRadius = {
  small: radius.small,
};

const defaultFonts = {
  regular: fonts.regular,
};

const defaultFontSize = {
  small: fontSize.small,
};

interface TagsProps {
  tags: string;
  colors?: {
    tagActiveBackground: string;
    tagActiveText: string;
  };
  spacing?: {
    small: number;
    extrasmall: number;
  };
  radius?: {
    small: number;
  };
  fonts?: {
    regular: string;
  };
  fontSize?: {
    small: number;
  };
  separator?: string;
}

export const Tags: React.FC<TagsProps> = ({
  tags,
  colors = defaultColors,
  spacing = defaultSpacing,
  radius = defaultRadius,
  fonts = defaultFonts,
  fontSize = defaultFontSize,
  separator = ",",
}) => {
  const tagArray = (tags)
    .split(separator)
    .map((t) => t.trim())
    .filter(Boolean);

  if (tagArray.length === 0) return null;

  return (
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
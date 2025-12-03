import { View } from "react-native";
import { colors } from "../themes/themes";

export default function Card(props: { children: React.ReactNode }) {
  return (
    <View style={StyleSheet.card}>
      <View style={StyleSheet.cardContent}>{props.children}</View>
    </View>
  );
}

const StyleSheet = {
  card: {
    backgroundColor: colors.border,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 2,
    marginHorizontal: 2,
  },
  cardContent: {
    padding: 16,
  },
};

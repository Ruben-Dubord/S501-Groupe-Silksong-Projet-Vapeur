import { StyleSheet } from 'react-native';

export const header_colors = {
    background: "#555557ff",
    primary: "#000000",
    secondary: "#888"
};

export const body_colors = {
    background: "#000000",
    primary: "#FFFFFF"
};

export const fonts = {
    regular: "Comfortaa",
    bold: "Comfortaa-Bold"
};

export const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: header_colors.background,
    color: header_colors.primary,
    fontFamily: fonts.regular,
    padding: 8
  },
  header_paragraph: {
    color: header_colors.primary,
    fontFamily: fonts.bold,
    fontSize: 18
  },
  body: {
    backgroundColor: body_colors.background,
  },
  paragraph: {
    color: body_colors.primary,
    fontFamily: fonts.regular,
    fontSize: 15
  }
});

import { Text, View, StyleSheet, TextInput, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, spacing, fontSize, fonts, radius } from "../themes/themes";

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ backgroundColor: colors.headerBackground, padding: spacing.medium }}>
        <TextInput
          placeholder="Rechercher"
          placeholderTextColor={colors.textSecondary}
          style={{
            backgroundColor: colors.searchBarBackground,
            padding: spacing.medium,
            borderRadius: radius.pill,
            color: colors.searchText
          }}
        />
        <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", gap:spacing.extralarge, paddingTop: spacing.large, paddingLeft: spacing.large }}>
          <Text style= {{color: colors.textPrimary, fontFamily: fonts.regular, fontSize: fontSize.medium, paddingHorizontal: spacing.small, paddingVertical: spacing.extrasmall, backgroundColor: colors.accent, borderRadius: radius.large,}}>Tous</Text>
          <Text style= {{color: colors.textPrimary, fontFamily: fonts.regular, fontSize: fontSize.medium, paddingHorizontal: spacing.small, paddingVertical: spacing.extrasmall}}>Tag1</Text>
          <Text style= {{color: colors.textPrimary, fontFamily: fonts.regular, fontSize: fontSize.medium, paddingHorizontal: spacing.small, paddingVertical: spacing.extrasmall}}>Tag2</Text>
          <Text style= {{color: colors.textPrimary, fontFamily: fonts.regular, fontSize: fontSize.medium, paddingHorizontal: spacing.small, paddingVertical: spacing.extrasmall}}>Tag3</Text>
        </View>
      </View>
      <View style = {{padding: spacing.large}}>
        <SafeAreaView style={{
            backgroundColor: colors.border,
            borderRadius: radius.medium,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: radius.small,
            elevation: 3,
            marginVertical: 2,
            marginHorizontal: 2,
            height: 400,
            width: 260
          }}>
          <View style={{padding: spacing.large, gap: spacing.small}}>
            <Image source={{ uri: "https://media.wired.com/photos/68b9b74debac84a11c241098/2:3/w_900,h_1350,c_limit/Silksong_Promo_03.jpg" }} style={{ width: 230, height: 250, borderRadius: radius.medium }}/>
            <Text style={{fontFamily: fonts.regular, fontSize: fontSize.small, color: colors.textPrimary}}>Hollow Knight : Silksong</Text>
            <Text style={{fontFamily: fonts.regular, fontWeight: "bold", fontSize: fontSize.small, color: colors.textPrimary}}>20€</Text>
            <View style={{flexDirection: "row", gap: spacing.medium}}>
              <Text style={{fontFamily: fonts.regular, fontSize: fontSize.extrasmall, color: colors.textPrimary, backgroundColor: colors.accentLight, borderRadius: radius.small, padding: spacing.extrasmall}}>Plateforme</Text>
              <Text style={{fontFamily: fonts.regular, fontSize: fontSize.extrasmall, color: colors.textPrimary, backgroundColor: colors.accentLight, borderRadius: radius.small, padding: spacing.extrasmall}}>Metroidvania</Text>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </SafeAreaView>
  );
}

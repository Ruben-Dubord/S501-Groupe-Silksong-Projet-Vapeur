import { Stack, useLocalSearchParams} from "expo-router";
import { Text, Image, ScrollView, View, StyleSheet } from "react-native";
import { getGameImage } from "@/app/database";
import { colors, fontSize } from "@/themes/themes";
import { SafeAreaView } from "react-native-safe-area-context";
import Expandable from "@/components/Expandable";

export default function game() {

  const params = useLocalSearchParams();

  return (

    <ScrollView style={{ padding: 10, paddingBottom: 60, backgroundColor: colors.background }}>
      <Stack.Screen
        options={{
          title: params.name as string,
        }}
      />
      <View style={{  padding: 10, backgroundColor: colors.headerBackground }}>

        <Image
          source={getGameImage(Number(params.id))}
          style={{ width: "100%" }}
          resizeMode="contain"
        />

        <Text style={ styles.title }>
          {params.name}
        </Text>

        <Text style={ styles.title }>
          {params.price} $
        </Text>

        <Text style={ styles.text }>
          <Text style={{ fontWeight: "bold" }}>Description : {"\n"}</Text>
          <Expandable>{params.description}</Expandable>
        </Text>

        <Text style={ styles.text }>
          <Text style={{ fontWeight: "bold" }}>Développeurs : </Text>
          {params.developers}
        </Text>

        <Text style={ styles.text }>
          <Text style={{ fontWeight: "bold" }}>Éditeurs : </Text>
          {params.publishers}
        </Text>

        <Text style={ styles.text}>
          <Text style={{ fontWeight: "bold" }}>Age requis : </Text>
          {params.requiredAge}
        </Text>
      </View>
      <SafeAreaView>
      <Text style={ styles.text }>
          <Text style={{ fontWeight: "bold" }}>Tags : </Text>
          {"\n"}{params.tags.toString().replaceAll(",", ", ")}
        </Text>

        <Text style={ styles.text }>
          ID Steam : {params.id}
        </Text>
      </SafeAreaView>
    </ScrollView>
  );
} 

const styles = StyleSheet.create({
  title: {
    color: colors.textPrimary,
    fontSize: fontSize.extralarge,
    fontWeight: "bold"
  },
  text: {
    color: colors.textPrimary,
    fontSize: fontSize.extrasmall
  }
});

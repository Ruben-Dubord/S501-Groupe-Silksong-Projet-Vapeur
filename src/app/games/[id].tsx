import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Text, Image, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getGameImage } from "../database";

export default function game() {

  const params = useLocalSearchParams();
  const router = useRouter();

  return (
    <View>
      <Stack.Screen
        options={{
          title: params.name as string,
        }}
      />

      <ScrollView>
        <Image source={getGameImage(Number(params.id))} />
        <Text>ID Steam : {params.id}</Text>
        <Text>Nom du jeu : {params.name}</Text>
        <Text>Age requis : {params.requiredAge}</Text>
        <Text>Prix : {params.price} $</Text>
        <Text>Description : {params.description}</Text>
        <Text>Développeurs : {params.developers}</Text>
        <Text>Éditeurs : {params.publishers}</Text>
        <Text>Tags : {params.tags}</Text>
      </ScrollView>
    </View>
  );
}
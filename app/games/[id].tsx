import { Stack, useLocalSearchParams} from "expo-router";
import { Text, Image, ScrollView, View } from "react-native";
import { getGameImage } from "@/app/database";

export default function game() {

  const params = useLocalSearchParams();

  return (
    
    <View>
      <Stack.Screen
        options={{
          title: params.name as string,
        }}
      />
      <ScrollView contentContainerStyle={{ alignItems: "center", padding: 10, paddingBottom: 60 }}>
        <Text style={{ fontWeight: "bold", fontSize: 24 }}>
          Nom du jeu : {params.name}
        </Text>

        <Text style={{ fontWeight: "bold" }}>
          ID Steam : {params.id}
        </Text>

        <Image
          source={getGameImage(Number(params.id))}
          style={{ width: "95%" }}
          resizeMode="contain"
        />

        <Text style={{ textAlign: "center", fontSize: 16 }}>
          <Text style={{ fontWeight: "bold" }}>Age requis : </Text>
          {params.requiredAge}
        </Text>

        <Text style={{ textAlign: "center", fontSize: 16 }}>
          <Text style={{ fontWeight: "bold" }}>Prix : </Text>
          {params.price} $
        </Text>

        <Text style={{ textAlign: "center", fontSize: 16 }}>
          <Text style={{ fontWeight: "bold" }}>Description : {"\n"}</Text>
          <Text style={{ margin: 10 }}>{params.description}</Text>
        </Text>

        <Text style={{ textAlign: "center", fontSize: 16 }}>
          <Text style={{ fontWeight: "bold" }}>Développeurs : </Text>
          {params.developers}
        </Text>

        <Text style={{ textAlign: "center", fontSize: 16 }}>
          <Text style={{ fontWeight: "bold" }}>Éditeurs : </Text>
          {params.publishers}
        </Text>

        <Text style={{ textAlign: "center", fontSize: 16 }}>
          <Text style={{ fontWeight: "bold" }}>Tags : </Text>
          {"\n"}{params.tags.toString().replaceAll(",", ", ")}
        </Text>
      </ScrollView>
     <View
        style={{
          position: "absolute",
          bottom: 40,
          left: 0,
          right: 0,
          alignItems: "center",
        }}
      >
      </View>
    </View>
  );
} 

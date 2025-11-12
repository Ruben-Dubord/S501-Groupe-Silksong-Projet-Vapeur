import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function game() {
  const params = useLocalSearchParams();
  return (
    <SafeAreaView>
      <Text>{params.name}</Text>
      <Text>id :{params.id}</Text>  
    </SafeAreaView>
  );
}

import { Stack, useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function game() {
  const params = useLocalSearchParams();
  const title = params.title as string;
  return (
    <SafeAreaView>
      <Stack.Screen options={{ title: title }} />
      <Text>{params.name}</Text>
      <Text>id :{params.id}</Text>
    </SafeAreaView>
  );
}

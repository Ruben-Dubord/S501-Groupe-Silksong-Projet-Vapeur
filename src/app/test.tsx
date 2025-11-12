import { Text, View, StyleSheet } from "react-native";
import {header_colors, body_colors, fonts, styles} from "../themes/themes";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.header_paragraph}>Tag1</Text>
        <Text style={styles.header_paragraph}>Tag2</Text>
        <Text style={styles.header_paragraph}>Tag3</Text>
      </View>
      <View style={[{
          backgroundColor: body_colors.background,  
        }]}>
        <Text style={styles.paragraph}>Silksong</Text>
      </View>
    </SafeAreaView>
  );
}

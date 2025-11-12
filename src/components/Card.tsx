import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Card(props: {children: React.ReactNode}) {
    
    return (
    <SafeAreaView style={StyleSheet.card}>        
            <View style={StyleSheet.cardContent}>
                    {props.children}
            </View>
    </SafeAreaView>
    )
    }

const StyleSheet = {
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: '#000',
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
    }
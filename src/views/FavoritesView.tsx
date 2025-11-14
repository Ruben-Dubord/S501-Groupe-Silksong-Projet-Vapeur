import { StyleSheet, Text, Image, View, TouchableOpacity, FlatList, Alert, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '@/components/Card';
import { Link } from 'expo-router';

// ---- Responsive Layout ----
const screenWidth = Dimensions.get("window").width;
const numColumns = 3;
const ITEM_MARGIN = 6;

// Largeur exacte d’un item pour qu’il n’y ait jamais de chevauchement
const ITEM_WIDTH = (screenWidth - ITEM_MARGIN * (numColumns * 2)) / numColumns;

export default function App() {

    const [gameList, setGameList] = useState([
        { id: 1, name: "Hollow Knight", image: require("../assets/images/GameImages/10.jpg"), liked: true },
        { id: 2, name: "Elden Ring", image: require("../assets/images/GameImages/10.jpg"), liked: true },
        { id: 3, name: "Dark Souls Remastered", image: require("../assets/images/GameImages/10.jpg"), liked: true },
        { id: 4, name: "The Legend of Zelda: Tears of the Kingdom", image: require("../assets/images/GameImages/10.jpg"), liked: true },
        { id: 5, name: "Divinity Original Sin II – Definitive Edition", image: require("../assets/images/GameImages/10.jpg"), liked: true }
    ]);

    const handleUnlike = (id: number) => {
        Alert.alert(
            "Confirm Deletion",
            "Are you sure you want to remove this game from your favorites?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "OK",
                    onPress: () => {
                        setGameList(prev => prev.filter(game => game.id !== id));
                    },
                },
            ]
        );
    };

    const renderItem = ({ item }: { item: typeof gameList[0] }) => (
        <View style={styles.item}>
            <Card>

                <Link
                    href={{
                        pathname: '/games/[id]',
                        params: { id: item.id, name: item.name },
                    }}
                    asChild
                >
                    <TouchableOpacity>

                        {/* TITRE LIMITÉ À 2 LIGNES */}
                        <Text
                            style={styles.titre}
                            numberOfLines={2}
                            ellipsizeMode="tail"
                        >
                            {item.name}
                        </Text>

                        <View style={styles.imageContainer}>
                            <Image style={styles.image} source={item.image} />
                        </View>

                    </TouchableOpacity>
                </Link>

                <TouchableOpacity
                    style={styles.unlikeButton}
                    onPress={() => handleUnlike(item.id)}
                >
                    <Text style={styles.unlikeButtonText}>Unlike</Text>
                </TouchableOpacity>

            </Card>
        </View>
    );

    if (gameList.length === 0) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.title}>Start liking games !</Text>
                <Text style={{ textAlign: 'center', marginBottom: 20 }}>You have no favorites.</Text>
                <Link href="/" asChild>
                    <TouchableOpacity style={styles.discoverButton}>
                        <Text style={styles.discoverButtonText}>Back to Home</Text>
                    </TouchableOpacity>
                </Link>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Text style={styles.title}>Here are your favorite games !</Text>

            <FlatList
                style={styles.container}
                keyExtractor={(game) => game.id.toString()}
                data={gameList}
                renderItem={renderItem}
                numColumns={numColumns}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    title: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 20,
        marginTop: 20,
        textAlign: 'center',
    },

    container: {
        flex: 1,
        paddingTop: 10,
    },

    discoverButton: {
        marginTop: 20,
        padding: 12,
        backgroundColor: '#007AFF',
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 20,
    },

    discoverButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },

    // ---- Responsive Grid ----
    item: {
        width: ITEM_WIDTH,
        margin: ITEM_MARGIN,
    },

    imageContainer: {
        width: ITEM_WIDTH - 20,
        height: ITEM_WIDTH - 20, // carré responsive
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        overflow: 'hidden',
        alignSelf: 'center',
        marginTop: 6,
    },

    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },

    // ---- TITRE LIMITÉ À 2 LIGNES ----
    titre: {
        fontSize: 16,
        fontWeight: '500',
        marginVertical: 5,
        textAlign: 'center',
        height: 40,     // fixe pour que toutes les Cards aient la même hauteur 💡
    },

    unlikeButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: 'red',
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
    },

    unlikeButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});

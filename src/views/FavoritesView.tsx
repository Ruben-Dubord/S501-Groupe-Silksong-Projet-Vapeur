import { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Alert, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import Card from "../components/Card";
import { getGameImage, useFetchers } from "@/app/database";

// ---- Responsive Layout ----
const screenWidth = Dimensions.get("window").width;
const numColumns = 3;
const ITEM_MARGIN = 6;
const ITEM_WIDTH = (screenWidth - ITEM_MARGIN * (numColumns * 2)) / numColumns;

type Game = {
  AppID: number;
  Name: string;
  RequiredAge: number;
  Price: number;
  Description: string;
  HeaderImage: any;
  Developers: string;
  Publishers: string;
  Tags: string;
  Liked: boolean;
};

export default function App() {
    
    const { setGameLikedStatus, getLikedGames } = useFetchers();
    const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
        async function load() {
            const liked = await getLikedGames();
            setGames(liked as Game[]);
        }
    load();
    }, []);

    const handleUnlike = (id: number) => {
        Alert.alert("Confirm Deletion", "Are you sure you want to remove this game from your favorites?",
            [{ text: "Cancel", style: "cancel" },{text: "OK", onPress: async () => {
                await setGameLikedStatus(id, false);
                setGames(prev => prev.filter(g => g.AppID !== id));
            }
            }]);
    };

    if (games.length === 0) {
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

    const renderItem = ({item}: {item: Game}) => (
        <View style={styles.item}>
            <Card>
                <Link
                    href={{pathname: '/games/[id]', params: {
                        id: item.AppID,
                        name: item.Name,
                        requiredAge: item.RequiredAge,
                        price: item.Price,
                        description: item.Description,
                        developers: item.Developers,
                        publishers: item.Publishers,
                        tags: item.Tags
                    }
                    }} asChild>
                    <TouchableOpacity>
                        <Text style={styles.titre} numberOfLines={2} ellipsizeMode="tail">{item.Name}</Text>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image} source={getGameImage(item.AppID)} />
                        </View>
                    </TouchableOpacity>
                </Link>

                <TouchableOpacity style={styles.unlikeButton} onPress={() => handleUnlike(item.AppID)}>
                    <Text style={styles.unlikeButtonText}>Unlike</Text>
                </TouchableOpacity>
            </Card>
        </View>
    );

    return (
    <SafeAreaView style={{ flex: 1 }}>
        <Text style={styles.title}>Here are your favorite games!</Text>
        <FlatList
            style={styles.container}
            keyExtractor={(game) => game.AppID.toString()}
            data={games}
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
    item: {
        width: ITEM_WIDTH,
        margin: ITEM_MARGIN,
    },
    imageContainer: {
        width: ITEM_WIDTH - 20,
        height: ITEM_WIDTH - 20,
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
    titre: {
        fontSize: 16,
        fontWeight: '500',
        marginVertical: 5,
        textAlign: 'center',
        height: 40,
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

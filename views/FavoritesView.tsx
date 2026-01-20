import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import Card from "../components/Card";
import { getGameImage, useFetchers } from "@/app/database";
import { Stack } from "expo-router";
import { colors } from "@/themes/themes";

// ---- Mise en page responsive ----
const screenWidth = Dimensions.get("window").width;
const numColumns = 3; // Nombre de colonnes dans la grille
const ITEM_MARGIN = 6; // Marge entre les éléments
const ITEM_WIDTH = (screenWidth - ITEM_MARGIN * (numColumns * 2)) / numColumns; // Largeur d'un élément

// Type pour un jeu
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

// Composant principal pour afficher les favoris
export default function App() {
  // Hooks pour gérer les favoris
  const { setGameLikedStatus, getLikedGames, setAllGamesLikedStatus } = useFetchers();
  // État pour stocker la liste des jeux favoris
  const [games, setGames] = useState<Game[]>([]);

  // Charger les jeux favoris au montage du composant
  useEffect(() => {
    async function load() {
      const liked = await getLikedGames();
      setGames(liked as Game[]);
    }
    load();
  }, []);

  // Gestionnaire pour retirer un jeu des favoris
  const handleUnlike = (id: number) => {
    Alert.alert(
      "Confirmer la suppression",
      "Êtes-vous sûr de vouloir retirer ce jeu de vos favoris ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "OK",
          onPress: async () => {
            await setGameLikedStatus(id, false);
            setGames((prev) => prev.filter((g) => g.AppID !== id));
          },
        },
      ]
    );
  };

  // Gestionnaire pour retirer tous les jeux des favoris
  const handleUnlikeAll = () => {
      Alert.alert(
        "Confirmer la suppression",
        "Êtes-vous sûr de vouloir retirer tous les jeux de vos favoris ?",
        [
          { text: "Annuler", style: "cancel" },
        {
          text: "OK",
          onPress: async () => {
            await setAllGamesLikedStatus(false);
            setGames([]);
          },
        },
      ]
    );
  };

  // Si aucun jeu favori, afficher un message
  if (games.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.title}>Commencez à aimer des jeux !</Text>
        <Text
          style={{
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          Vous n'avez pas de favoris.
        </Text>
        <Link href="/" asChild>
          <TouchableOpacity style={styles.discoverButton}>
            <Text style={styles.discoverButtonText}>Retour à l'accueil</Text>
          </TouchableOpacity>
        </Link>
      </View>
    );
  }

  // Fonction pour rendre chaque élément de la liste
  const renderItem = ({ item }: { item: Game }) => (
    <View style={styles.item}>
      <Card>
        <Link
          href={{
            pathname: "/games/[id]",
            params: {
              id: item.AppID,
              name: item.Name,
              requiredAge: item.RequiredAge,
              price: item.Price,
              description: item.Description,
              developers: item.Developers,
              publishers: item.Publishers,
              tags: item.Tags,
            },
          }}
          asChild
        >
          <TouchableOpacity>
            <Text style={styles.titre} numberOfLines={2} ellipsizeMode="tail">
              {item.Name}
            </Text>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={getGameImage(item.AppID)} />
            </View>
          </TouchableOpacity>
        </Link>

        <TouchableOpacity
          style={styles.unlikeButton}
          onPress={() => handleUnlike(item.AppID)}
        >
          <Text style={styles.unlikeButtonText}>Ne plus aimer</Text>
        </TouchableOpacity>
      </Card>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Stack.Screen options={{ title: "Vos Favoris" }} />
      <Text style={[styles.title, { color: colors.textPrimary }]}>
        Voici vos jeux favoris !
      </Text>
      <FlatList
        style={styles.container}
        keyExtractor={(game) => game.AppID.toString()}
        data={games}
        renderItem={renderItem}
        numColumns={numColumns}
      />

    <TouchableOpacity
          style={styles.unlikeButton}
          onPress={() => handleUnlikeAll()}
        >
          <Text style={styles.unlikeButtonText}>Ne plus aimer tous les jeux</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
}

// Styles pour le composant
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 20,
    marginTop: 20,
    textAlign: "center",
  },
  container: {
    backgroundColor: colors.background,
    flex: 1,
    paddingTop: 10,
  },
  discoverButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 20,
  },
  discoverButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  item: {
    width: ITEM_WIDTH,
    margin: ITEM_MARGIN,
  },
  imageContainer: {
    width: ITEM_WIDTH - 20,
    height: ITEM_WIDTH - 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
    alignSelf: "center",
    marginTop: 6,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  titre: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "500",
    marginVertical: 5,
    textAlign: "center",
    height: 40,
  },
  unlikeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "red",
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  unlikeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

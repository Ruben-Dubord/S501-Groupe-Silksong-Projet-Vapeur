import { router } from "expo-router";
import { 
  Text, 
  View,
  Image, 
  FlatList, 
  StyleSheet, 
  Pressable, 
  TextInput, 
  Platform 
} from "react-native";
import { useFetchers, getGameImage } from "@/app/database";
import React, { useEffect, useState, useCallback } from "react";
import { colors, fonts, fontSize, spacing ,} from "@/themes/themes";
import Like from "@/components/Like";
import Card from "@/components/Card";
import Tags from "@/components/Tags";
import { getRecommendations } from "@/scripts/recommendations";
import { updateUserPreferences } from "@/scripts/storage";
import { Search, X } from "lucide-react-native"; 

const styles = StyleSheet.create({
  titre: { 
    color: 'white', 
    fontSize: fontSize.large, 
    fontFamily: fonts.bold, 
    flexWrap: 'nowrap', 
    marginVertical: spacing.small 
  },
  container: { 
    backgroundColor: colors.background, 
    width: '100%' 
  },
  item: {
    fontFamily: fonts.regular,
    margin: spacing.medium
  },
  image: { 
    width: '100%', 
    resizeMode: 'contain' 
  },
  // Ajoutez ces nouveaux styles
  searchContainer: {
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
    backgroundColor: colors.background,
  },
  searchBar: {
    backgroundColor:'#1e1e1e',
    borderRadius: 8,
    paddingHorizontal: spacing.medium,
    paddingVertical: Platform.OS === 'ios' ? spacing.small : spacing.extrasmall,
    fontSize: fontSize.medium,
    fontFamily: fonts.regular,
    color: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    color: 'white',
    fontSize: fontSize.medium,
    fontFamily: fonts.regular,
    marginLeft: spacing.small,
  },
  clearButton: {
    padding: spacing.extrasmall,
  },
});
const numColumns = 1;

function IndexSetup() {
  type game = {
    AppID: number;
    Name: string;
    RequiredAge: number;
    Price: number;
    Description: string;
    HeaderImage: string;
    Developers: string;
    Publishers: string;
    Tags: string;
    Liked: boolean;
  };

  const { getUnlikedGames, getLikedGames, getAllTagsOneGame, getAllTags } = useFetchers();
  const [games, setGames] = useState<game[]>([]);
  const [filteredGames, setFilteredGames] = useState<game[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  // Charger les jeux initiaux
  useEffect(() => {
    async function load() {
      const unlikedGames = await getUnlikedGames() as game[];
      const likedGame = await getLikedGames() as game[];
      let initialPreferences: Record<string, number> = {};
      
      if (likedGame.length == 0) {
        const tags = await getAllTags();
        tags.forEach((tag: string) => {
          initialPreferences[tag] = 0.5;
        });
      } else {
        for(let g of likedGame) {
          const gameTags = await getAllTagsOneGame(g.AppID);
          gameTags.forEach((tag: string) => {
            if(initialPreferences[tag]) {
              initialPreferences[tag] += 0.5;
            } else {
              initialPreferences[tag] = 0.5;
            }
          });
        }
      }
      
      await updateUserPreferences(initialPreferences);
      const scoredGames = await getRecommendations(unlikedGames);
      let data: game[] = [];
      for (let g of scoredGames) {
        data.push(g.gameData)
      }
      setGames(data);
      setFilteredGames(data); // Initialise filteredGames
    }
    load();
  }, []);

  // Filtrer les jeux lorsque la recherche change
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredGames(games);
    } else {
      const filtered = games.filter(game => 
        game.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.Description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.Tags.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.Developers.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredGames(filtered);
    }
  }, [searchQuery, games]);

  // Rafraîchir la liste des jeux
  const refreshLikedGames = useCallback(async () => {
    setRefreshing(true);
    const unlikedGames = await getUnlikedGames() as game[];
    const scoredGames = await getRecommendations(unlikedGames);
    let data: game[] = [];
    for (let g of scoredGames) {
      data.push(g.gameData)
    }
    setGames(data);
    setRefreshing(false);
  }, []);

  // Composant de la barre de recherche
  const SearchBar = () => (
    <View style={styles.searchContainer}>
      <View style={styles.searchBar}>
        <Search size={20} color="#888" />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher un jeu..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
        {searchQuery.length > 0 && (
          <Pressable 
            style={styles.clearButton}
            onPress={() => setSearchQuery('')}
          >
            <X size={20} color="#888" />
          </Pressable>
        )}
      </View>
    </View>
  );

  // Render item (inchangé)
  const ListItem = React.memo(({ item }: { item: game }) => {
    return (
      <View style={styles.item}>
        <Card>
          <Pressable
            onPress={() => {
              router.push({
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
              });
            }}
          >
            <Image style={styles.image} source={getGameImage(item.AppID)} />
            <Text style={styles.titre}>{item.Name}</Text>
            <Tags tags={item.Tags} />
            <Pressable style={{ marginBottom: spacing.extrasmall, flex: 1 }}>
              <Like id={item.AppID} />
            </Pressable>
          </Pressable>
        </Card>
      </View>
    );
  });

  const renderItem = ({ item }: { item: game }) => <ListItem item={item} />;

  return (
    <View style={{ flex: 1 }}>
      {/* Barre de recherche */}
      <SearchBar />
      
      {/* Liste des jeux filtrés */}
      <FlatList
        style={styles.container}
        keyExtractor={(game) => game.AppID.toString()}
        data={filteredGames}
        renderItem={renderItem}
        numColumns={numColumns}
        onRefresh={refreshLikedGames}
        refreshing={refreshing}
        ListEmptyComponent={
          <View style={{ padding: spacing.large, alignItems: 'center' }}>
            <Text style={{ color: '#888', fontSize: fontSize.medium }}>
              {games.length === 0 
                ? 'Chargement des jeux...' 
                : searchQuery 
                  ? 'Aucun jeu ne correspond à votre recherche' 
                  : 'Aucun jeu disponible'}
            </Text>
          </View>
        }
      />
    </View>
  );
}
export default function Index() {
  return (
      <IndexSetup />
  );
}

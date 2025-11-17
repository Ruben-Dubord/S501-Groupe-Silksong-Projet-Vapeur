import { StyleSheet, Text, Image, View, ScrollView, TouchableOpacity, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '@/components/Card';
import { Link } from 'expo-router';
import { useState } from 'react';

export default function App() {

    const [gameList, setGameList] = useState([
        { id: 1, name: "Hollow Knight", image: require("../assets/images/GameImages/10.jpg"), liked: true },
        { id: 2, name: "Elden Ring", image: require("../assets/images/GameImages/10.jpg"), liked: true },
        { id: 3, name: "Dark Souls", image: require("../assets/images/GameImages/10.jpg"), liked: true },
        { id: 4, name: "Celeste", image: require("../assets/images/GameImages/10.jpg"), liked: true },
        { id: 5, name: "Stardew Valley", image: require("../assets/images/GameImages/10.jpg"), liked: true }
    ]);

    const numColumns = 3;

    const handleUnlike = (id: number) => {
        Alert.alert(
            "Confirm Deletion",
            "Are you sure you want to remove this game from your favorites?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "OK",
                    onPress: () => {
                        setGameList((prevGames) => prevGames.filter((game) => game.id !== id));
                    },
                },
            ]
        );
    };

    const renderItem = ({ item }: { item: typeof gameList[0] }) => {
      // Don't render blank items
      if (item.id < 0) {
        return null;
      }
      
      return (
        <View style={styles.item}>
          <Card>
            <Link
              href={{
                pathname: '/games/[id]',
                params: { id: item.id, name: item.name },
              }}
            >
              <Text style={styles.titre}>{item.name}</Text>
              <Image style={styles.image} source={item.image} />
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
    };
    
    
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

  container: {
    flex: 1,
    paddingTop: 10,
  },

  item: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
  },

  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },

  titre: {
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 5,
    textAlign: 'center',
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

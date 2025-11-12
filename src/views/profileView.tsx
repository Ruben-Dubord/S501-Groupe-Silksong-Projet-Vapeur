import { StyleSheet, Text, Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '@/components/Card';
import { Link } from 'expo-router';

export default function App() {

    const games = [
    { id: 1, name: "Hollow Knight", image: "../assets/games/hollow-knight.png", liked: true },
    { id: 2, name: "Elden Ring", image: "../assets/games/elden-ring.png", liked: true },
    { id: 3, name: "Dark Souls", image: "../assets/games/dark-souls.png", liked: true },
    { id: 4, name: "Celeste", image: "../assets/games/celeste.png", liked: false },
    {
        id: 5,
        name: "Stardew Valley",
        image: "../assets/games/stardew-valley.png",
        liked: false,
    },
    ];

  return (
    <SafeAreaView>
        <Text style={styles.title}>Welcome to your profile !</Text>
        
        <Card>
            <Link href="/"/>
            <View style={styles.rowContainer}>
            <Image source={require('@/assets/images/favorites-icon.png')} style={styles.category} />
            <View style= {styles.textColumn}>
                <Text style={styles.categoryTitle}>Your favorite games</Text>
                <Text>{games.filter((game) => game.liked).length} games liked</Text>
            </View>
            </View>
        </Card>

        <Card>
            <Link href="/"/> 
            <View style={styles.rowContainer}>
            <Image source={require('@/assets/images/settings-icon.svg')} style={styles.category} />
            <View style= {styles.textColumn}>
                <Text style={styles.categoryTitle}>Your settings</Text>
                <Text>App preferences</Text>
            </View>
            </View>
        </Card>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },

  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },

  category: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },

  textColumn: {
    marginLeft: 12,
    justifyContent: 'center',
  },

  categoryTitle: {
    fontWeight: '600',
    marginBottom: 4,
  },
}); 
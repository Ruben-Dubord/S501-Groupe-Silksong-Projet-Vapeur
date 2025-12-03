import { StyleSheet, Text, Image, View, ScrollView } from 'react-native';
import Card from '@/components/Card';
import { Link } from 'expo-router';
import { useFetchers } from "@/app/database";
import { useEffect, useState} from 'react';
import { colors, spacing } from '@/themes/themes';

export default function App() {

  const recentFavorites = [
      { id: 1, name: "Hollow Knight", date: "2025-11-12 12:30:35" },
      { id: 2, name: "Elden Ring", date: "2024-06-08 00:00:00"},
      { id: 3, name: "Dark Souls", date: "2025-11-12 14:54:12"}
  ];

  const {getNumberOfLikedGames} = useFetchers();
  const [likedCount, setLikedCount] = useState<number>(0);
  
  // Rafraîchit le compteur toutes les 3 secondes mais ne re-render que si la valeur change
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const liked = await getNumberOfLikedGames();
        setLikedCount(prev => (prev !== liked ? liked : prev));
      } catch (e) {
        console.error("Erreur lors du rafraîchissement du compteur :", e);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

    // Function to calculate time since a given date
    const timeSince = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((+now - +date) / 1000);
    
    const intervals: Record<string, number> = {
        year: 31536000,
        month: 2592000,
        day: 86400,
        hour: 3600,
        minute: 60,
    };
    
    if (seconds < 60) return "just now";
    for (let [unit, value] of Object.entries(intervals)) {
        const interval = Math.floor(seconds / value);
        if (interval >= 1) {
        return interval === 1 ? `1 ${unit} ago` : `${interval} ${unit}s ago`;
        }
    }
    return "";
    };


  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background, padding: spacing.large }}>
        <Text style={styles.title}>Welcome to your profile !</Text>
        
        <Card>
            <Link href="/favorites">
                <View style={styles.rowContainer}>
                    <Image source={require('@/assets/images/favorites-icon.png')} style={styles.category} />
                    
                    <View style= {styles.textColumn}>
                        <Text style={styles.categoryTitle}>Your favorite games</Text>
                        <Text style={styles.recentFavoriteDate}>{likedCount} games liked</Text>
                    </View>
                </View>
            </Link>
        </Card>

        
        <Card>
            <Link href="/settings"> 
                <View style={styles.rowContainer}>
                    <Image source={require('@/assets/images/settings-icon.png')} style={styles.category} />
                    
                    <View style= {styles.textColumn}>
                        <Text style={styles.categoryTitle}>Your settings</Text>
                        <Text style={styles.recentFavoriteDate}>App preferences</Text>
                    </View>
                </View>
            </Link>
        </Card>


        <Text style={styles.title}>Recent favorites</Text>

        <Card>
        {recentFavorites.map((fav) => (
            <View key={fav.id} style={styles.recentItem}>
                <Image source={require('@/assets/images/recent-favorite-icon.png')} style={styles.recentFavoriteIcon}/>

                <View style={styles.recentItemTextColumn}>
                    <Text style={styles.recentFavoriteName}>{fav.name}</Text>
                    <Text style={styles.recentFavoriteDate}>{timeSince(fav.date)}</Text>
                </View>
            </View>
        ))}
        </Card>


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    color:colors.textPrimary,
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    marginTop: 20,
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
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 4,
    fontSize: 18
  },

  recentFavoriteIcon: {
    width: 20,
    height: 20,
    borderRadius: 8,
  },

  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },

  recentItemTextColumn: {
    marginLeft: 12,
    justifyContent: 'center',
  },

  recentFavoriteName: {
    color: colors.textPrimary,
    fontSize: 16,
  },

  recentFavoriteDate: {
    color: 'lightgray',
  }
}); 
import { StyleSheet, Text, Image, View, ScrollView } from 'react-native';
import Card from '@/components/Card';
import { Link } from 'expo-router';
import { useFetchers } from "@/app/database";
import { useEffect, useState} from 'react';
import { colors, spacing } from '@/themes/themes';

// Composant principal pour la vue profil
export default function App() {

  // Hook pour obtenir le nombre de jeux aimés
  const {getNumberOfLikedGames} = useFetchers();
  // État pour stocker le nombre de jeux aimés
  const [likedCount, setLikedCount] = useState<number>(0);
  
  // Rafraîchit le compteur toutes les secondes mais ne re-render que si la valeur change
  useEffect(() => {
    const interval = setInterval(async () => {
      const liked = await getNumberOfLikedGames();
      setLikedCount(prev => (prev !== liked ? liked : prev));
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  return (
    // ScrollView pour permettre le défilement
    <ScrollView style={{ flex: 1, backgroundColor: colors.background, padding: spacing.large }}>
        <Text style={styles.title}>Bienvenue sur votre profil !</Text>
        
        <Card>
            <Link href="/favorites">
                <View style={styles.rowContainer}>
                    <Image source={require('@/assets/images/favorites-icon.png')} style={styles.category} />
                    
                    <View style= {styles.textColumn}>
                        <Text style={styles.categoryTitle}>Vos jeux favoris</Text>
                        <Text style={styles.recentFavoriteDate}>{likedCount} jeux aimés</Text>
                    </View>
                </View>
            </Link>
        </Card>

    </ScrollView>
  );
}

// Styles pour le composant
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
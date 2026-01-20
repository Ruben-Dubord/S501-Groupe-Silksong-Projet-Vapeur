import { useState } from "react";
import { TouchableOpacity, Text, Animated } from "react-native";
import { useFetchers } from "@/app/database";

// Composant pour gérer la fonctionnalité de like/unlike pour un jeu
export default function Like(props: { id: number }) {
  const { setGameLikedStatus } = useFetchers();
  // État pour suivre si le jeu est aimé
  const [isLiked, setIsLiked] = useState(false);
  // État pour suivre le statut de chargement pendant l'appel API
  const [isLoading, setIsLoading] = useState(false);
  // Valeur d'animation pour l'effet de mise à l'échelle
  const scaleAnim = useState(new Animated.Value(1))[0];

  // Fonction pour gérer le basculement du statut de like
  async function handleLikeToggle() {
    if (!props.id || isLoading) return;

    // Séquence d'animation : agrandir puis revenir à la normale
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.3,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    setIsLoading(true);
    try {
      const newLikedStatus = !isLiked;
      // Mettre à jour le statut aimé du jeu dans la base de données
      await setGameLikedStatus(props.id, newLikedStatus);
      setIsLiked(newLikedStatus);
    } catch (error) {
      console.error("Error updating like status:", error);
      // Annuler l'état en cas d'erreur
      setIsLiked(!isLiked);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    // Bouton tactile qui déclenche le basculement de like
    <TouchableOpacity
      onPress={handleLikeToggle}
      disabled={isLoading || !props.id}
      activeOpacity={0.7}
      style={{
        opacity: isLoading || !props.id ? 0.5 : 1,
      }}
    >
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }],
          backgroundColor: isLiked ? "rgba(255, 68, 68, 0.1)" : "transparent",
          borderRadius: 20,
          padding: 12,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 28 }}>
          {isLoading ? "❤️" : isLiked ? "❤️" : "🤍"}
        </Text>
        {isLiked && (
          <Text
            style={{
              fontSize: 10,
              color: "#FF4444",
              marginTop: 4,
              fontWeight: "600",
            }}
          >
          </Text>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
}

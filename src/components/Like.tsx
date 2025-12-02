import { useState } from "react";
import { TouchableOpacity, Text, Animated } from "react-native";
import { useFetchers } from "@/app/database";

export default function Like(props: { id: number }) {
  const { setGameLikedStatus } = useFetchers();
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const scaleAnim = useState(new Animated.Value(1))[0];

  async function handleLikeToggle() {
    if (!props.id || isLoading) return;

    // Animation
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
      await setGameLikedStatus(props.id, newLikedStatus);
      setIsLiked(newLikedStatus);
    } catch (error) {
      console.error("Error updating like status:", error);
      setIsLiked(!isLiked);
    } finally {
      setIsLoading(false);
    }
  }

  return (
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
            Liked
          </Text>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
}

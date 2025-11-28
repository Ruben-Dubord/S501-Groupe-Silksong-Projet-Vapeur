
import { Button } from "react-native";
import { useFetchers } from "@/app/database";

/** A Like component that allows users to like a game by its ID. */
export default function Like(props: {id: number}) {
    const { setGameLikedStatus } = useFetchers();
    function onPressLike() {
        if(props.id){
            setGameLikedStatus(props.id, true);
        }
    }
    return (
        <>
            <Button
            title="like placeholder"
            onPress={onPressLike}
            />
        </>
    )
    }


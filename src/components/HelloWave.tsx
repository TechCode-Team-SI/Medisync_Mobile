import { Text, View } from "react-native";
import {
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export function HelloWave() {
  const rotationAnimation = useSharedValue(0);

  rotationAnimation.value = withRepeat(
    withSequence(
      withTiming(25, { duration: 150 }),
      withTiming(0, { duration: 150 })
    ),
    4 // Run the animation 4 times
  );

  return (
    <View>
      <Text className="text-2xl -mt-1.5">👋</Text>
    </View>
  );
}

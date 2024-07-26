import { Image, StyleSheet, Platform, View } from "react-native";

import { HelloWave } from "@/src/components/HelloWave";
import ParallaxScrollView from "@/src/components/ParallaxScrollView";
import { Text } from "@/src/components/ui/Text";
import { Heading } from "@/src/components/ui/Heading";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <View style={styles.titleContainer}>
        <Heading>Welcome!</Heading>
        <HelloWave />
      </View>
      <View style={styles.stepContainer}>
        <Text className="font-bold text-xl">Step 1: Try it</Text>
        <Text>
          Edit <Text>app/(tabs)/index.tsx</Text> to see changes. Press{" "}
          <Text>{Platform.select({ ios: "cmd + d", android: "cmd + m" })}</Text>{" "}
          to open developer tools.
        </Text>
      </View>
      <View style={styles.stepContainer}>
        <Text className="font-bold text-xl">Step 2: Explore</Text>
        <Text>
          Tap the Explore tab to learn more about what's included in this
          starter app.
        </Text>
      </View>
      <View style={styles.stepContainer}>
        <Text className="font-bold text-xl">Step 3: Get a fresh start</Text>
        <Text className="">
          When you're ready, run <Text>npm run reset-project</Text> to get a
          fresh <Text>app</Text> directory. This will move the current{" "}
          <Text>app</Text> to <Text>app-example</Text>.
        </Text>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});

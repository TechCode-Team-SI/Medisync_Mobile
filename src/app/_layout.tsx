import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Montserrat: require("../../assets/fonts/Montserrat-Bold.ttf"),
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
    Roboto: require("../../assets/fonts/Roboto-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="home/index" options={{ headerShown: false }} />
      <Stack.Screen name="register/index" options={{ headerShown: false }} />
      <Stack.Screen name="login/index" options={{ headerShown: false }} />
      <Stack.Screen name="forgot/index" options={{ headerShown: false }} />
      <Stack.Screen name="changepassword/index" options={{ headerShown: false }} />
      <Stack.Screen name="codepassword/index" options={{ headerShown: false }} />
      <Stack.Screen name="aboutus/index" options={{ headerShown: false }} />
      <Stack.Screen name="profile/index" options={{ headerShown: false }} />
      <Stack.Screen name="configprofile/index" options={{ headerShown: false }} />
      <Stack.Screen name="updatepassword/index" options={{ headerShown: false }} />
      <Stack.Screen name="search/index" options={{ headerShown: false }} />
      <Stack.Screen name="searchdr/index" options={{ headerShown: false }} />
      <Stack.Screen name="appointment/index" options={{ headerShown: false }} />
      <Stack.Screen name="appointmentdetails/index" options={{ headerShown: false }} />
      <Stack.Screen name="history/index" options={{ headerShown: false }} />
      <Stack.Screen name="board/index" options={{ headerShown: false }} />
      <Stack.Screen name="publication/index" options={{ headerShown: false }} />
      <Stack.Screen name="family/index" options={{ headerShown: false }} />
      <Stack.Screen name="listsuggestions/index" options={{ headerShown: false }} />
      <Stack.Screen name="chat/index" options={{ headerShown: false }} />
      <Stack.Screen name="createappointment/index" options={{ headerShown: false }} />
      <Stack.Screen name="createappointmenttwo/index" options={{ headerShown: false }} />
      <Stack.Screen name="support/index" options={{ headerShown: false }} />
      <Stack.Screen name="suggestions/index" options={{ headerShown: false }} />
      <Stack.Screen name="claims/index" options={{ headerShown: false }} />
      <Stack.Screen name="requests/index" options={{ headerShown: false }} />
      <Stack.Screen name="notifications/index" options={{ headerShown: false }} />
    </Stack>
  );
}

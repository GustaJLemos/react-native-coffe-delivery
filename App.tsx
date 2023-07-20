import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useFonts as useFontsRoboto, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { useFonts as useFontsBaloo, Baloo2_700Bold } from '@expo-google-fonts/baloo-2';
import { THEME } from './src/theme';
import { Home } from './src/screens/Home';
import { CoffeDetails } from './src/screens/CoffeDetails';
import { Cart } from './src/screens/Cart';

export default function App() {
  const [fontRobotoLoaded] = useFontsRoboto({ Roboto_400Regular, Roboto_700Bold })
  const [fontBalooLoaded] = useFontsBaloo({ Baloo2_700Bold })

  if (!fontRobotoLoaded || !fontBalooLoaded) {
    return (
      <ActivityIndicator />
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style='light' backgroundColor={THEME.colors.base.gray_100} />
      <Cart />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

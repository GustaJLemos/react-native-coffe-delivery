import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../../src/screens/Home';
import { CoffeDetails } from '../../src/screens/CoffeDetails';
import { Cart } from '../../src/screens/Cart';
import { FinishPurchase } from '../../src/screens/FinishPurchase';
import { NavigationContainer } from '@react-navigation/native';
import { AppRoutesProps } from './types/AppRoutesNavigationProps';

const NativeStack = createNativeStackNavigator<AppRoutesProps>();

export function AppRoutes() {
  return (
    <NavigationContainer>
      <NativeStack.Navigator
        screenOptions={{ headerShown: false }}
      >
        <NativeStack.Screen name="HomeScreen" component={Home} />
        <NativeStack.Screen name="CoffeDetailsScreen" component={CoffeDetails} />
        <NativeStack.Screen name="CartScreen" component={Cart} />
        <NativeStack.Screen name="FinishPurchaseScreen" component={FinishPurchase} />
      </NativeStack.Navigator>
    </NavigationContainer>
  );
}
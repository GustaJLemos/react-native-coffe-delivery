import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type AppRoutesProps = {
  HomeScreen: undefined,
  CoffeDetailsScreen: undefined,
  CartScreen: undefined,
  FinishPurchaseScreen: undefined,
}

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutesProps>;
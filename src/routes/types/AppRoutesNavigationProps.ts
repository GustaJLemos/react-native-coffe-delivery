import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Coffes } from '../../types/Coffes';

export type AppRoutesProps = {
  HomeScreen: undefined,
  CoffeDetailsScreen: undefined,
  CartScreen: undefined,
  FinishPurchaseScreen: undefined,
}

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutesProps>;
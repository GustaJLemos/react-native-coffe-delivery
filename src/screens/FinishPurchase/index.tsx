import React, { useEffect } from 'react';
import { View, Text, BackHandler } from 'react-native';
import IlustrationSvg from '../../assets/coffes/Illustration.svg'
import { styles } from './styles';
import { Button } from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '../../routes/types/AppRoutesNavigationProps';
import { useCartStore } from '../../store/cartStore';
import Animated, { FadeIn, SlideInLeft, SlideInRight, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Audio } from 'expo-av';

export function FinishPurchase() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const clearAllCoffeAddedToCart = useCartStore((state) => state.clearAllCoffeAddedToCart);

  function handleClearAllCoffeAndNavigateToHome() {
    clearAllCoffeAddedToCart();
    navigation.navigate('HomeScreen');
    return true;
  }

  async function playSound() {
    const finishPurchaseAudio = require('../../assets/correct.mp3');

    const { sound } = await Audio.Sound.createAsync(finishPurchaseAudio, { shouldPlay: true })

    await sound.setPositionAsync(0)
    await sound.playAsync();
  }

  useEffect(() => {
    playSound();
  }, [])

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleClearAllCoffeAndNavigateToHome)

    return () => backHandler.remove()
  }, [])

  return (
    <View style={styles.container}>
      <Animated.View entering={SlideInLeft.duration(1000)}>
        <IlustrationSvg />
      </Animated.View>

      <View>
        <Text style={styles.title}>
          Uhu! Pedido confirmado
        </Text>
        <Text style={styles.text}>
          Agora é só aguardar que logo o café {'\n'} chegará até você!
        </Text>

        <Animated.View entering={FadeIn.delay(1000)}>
          <Button
            title='Ir para a home'
            type='purple'
            onPress={handleClearAllCoffeAndNavigateToHome}
          />
        </Animated.View>
      </View>
    </View>
  );
}
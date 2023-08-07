import React, { useState } from 'react';
import { View, Text } from 'react-native';

import { styles } from './styles';
import { Header } from '../../components/Header';
import CoffePng from '../../assets/coffes/Coffee.png';
import { coffeSizesOptions } from '../../mocks/coffes';
import { Select } from '../../components/Select';
import { CoffeQuantityCounter } from '../../components/CoffeQuantityCounter';
import { Button } from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { useCartStore } from '../../store/cartStore';
import { CoffeSize } from '../../types/CoffeSize';
import { CoffeAddedToCart } from '../../types/CoffeAddedToCart';
import { THEME } from '../../theme';
import Animated, { BounceIn, interpolateColor, useAnimatedStyle, useSharedValue, withSequence, withSpring, withTiming } from 'react-native-reanimated';
import { notificationAsync, NotificationFeedbackType } from 'expo-haptics';

export function CoffeDetails() {
  const [coffeSizeSelected, setCoffeSizeSelected] = useState<CoffeSize | null>(null);
  const [coffeCounter, setCoffeCounter] = useState<number>(1);

  const navigation = useNavigation();

  const cartStore = useCartStore((state) => state);
  const coffeSelected = cartStore.coffeSelected;

  const sizeRequired = useSharedValue(0);
  const sizeSelected = useSharedValue(1);

  function handleAddCoffeToCart() {
    let alreadyAddedToTheList = cartStore.coffeAddedToCart.find((item) => item.id === coffeSelected.id && item.size === coffeSizeSelected)

    cartStore.setShowCoffeToast(true);

    if (alreadyAddedToTheList?.id) {
      cartStore.updateCoffeQuantityById({
        id: coffeSelected.id,
        newQuantity: alreadyAddedToTheList.quantity + coffeCounter,
        itemSize: coffeSizeSelected
      })
    } else {
      cartStore.setCoffeAddedToCart({ ...coffeSelected, size: coffeSizeSelected, quantity: coffeCounter })
    }

    alreadyAddedToTheList = {} as CoffeAddedToCart;

    navigation.goBack()
  }

  function handleSelectSize(size: CoffeSize) {
    setCoffeSizeSelected(size);

    switch (size) {
      case '114ml':
        sizeSelected.value = withSpring(1)
        break;
      case '140ml':
        sizeSelected.value = withSpring(1.3)
        break;
      case '227ml':
        sizeSelected.value = withSpring(1.6)
        break;
      default:
        break;
    }
  }

  const sizeRequiredTextStyles = useAnimatedStyle(() => {
    return ({
      color: interpolateColor(
        sizeRequired.value,
        [0, 1],
        [THEME.colors.base.gray_400, THEME.colors.feedback.red_dark]
      )
    });
  });

  const coffeImageStyles = useAnimatedStyle(() => {
    return ({
      width: sizeSelected.value * 200,
      height: sizeSelected.value * 200,
      bottom: -60,
    });
  });

  function onPress() {
    sizeRequired.value = withSequence(withTiming(1), withTiming(0))
    notificationAsync(NotificationFeedbackType.Error)
  }

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Header goBack iconColor={THEME.colors.base.white} />

        <View style={styles.textContent}>
          <View style={styles.tagContainer}>
            <Text style={styles.tagText}>
              {coffeSelected.type}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.coffeName} numberOfLines={2}>
              {coffeSelected.name}
            </Text>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>
                R$
              </Text>
              <Text style={styles.priceValue}>
                {coffeSelected.price}
              </Text>
            </View>
          </View>
          <Text style={styles.coffeDescription}>
            {coffeSelected.description}
          </Text>
        </View>

        <View style={styles.coffeImageContainer}>
          <Animated.Image
            source={CoffePng}
            entering={BounceIn.duration(200)}
            style={coffeImageStyles}
          />
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <Animated.Text style={[styles.sizeText, sizeRequiredTextStyles]}>
          Selecione o tamanho:
        </Animated.Text>
        <View style={styles.sizeOptions}>
          {coffeSizesOptions.map((item) => (
            <Select
              key={item}
              text={item}
              selected={coffeSizeSelected === item}
              onSelect={(item) => handleSelectSize(item)}
              animationValue={sizeRequired}
            />
          ))}
        </View>

        <View style={styles.bottomActions}>
          <CoffeQuantityCounter
            count={coffeCounter}
            setCount={setCoffeCounter}
          />
          <Button
            title='Adicionar'
            type='purple'
            onPress={coffeSizeSelected === null ? onPress : handleAddCoffeToCart}
            style={{ opacity: coffeSizeSelected === null ? 0.5 : 1 }}
          />
        </View>
      </View>
    </View>
  );
}
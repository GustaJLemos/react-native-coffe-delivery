import React, { useState } from 'react';
import { View, Text } from 'react-native';

import { styles } from './styles';
import { Header } from '../../components/Header';
import CoffePng from '../../assets/coffes/Coffee.png';
import { Image } from 'react-native';
import { coffeSizesOptions } from '../../mocks/coffes';
import { Select } from '../../components/Select';
import { CoffeQuantityCounter } from '../../components/CoffeQuantityCounter';
import { Button } from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { useCartStore } from '../../store/cartStore';
import { CoffeSize } from '../../types/CoffeSize';
import { CoffeAddedToCart } from '../../types/CoffeAddedToCart';
import { THEME } from '../../theme';
import Animated, { Easing, Layout, SlideInLeft, SlideInRight, SlideOutRight, interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated';

export function CoffeDetails() {
  const [coffeSizeSelected, setCoffeSizeSelected] = useState<CoffeSize | null>(null);
  const [coffeCounter, setCoffeCounter] = useState<number>(1);

  const navigation = useNavigation();

  const cartStore = useCartStore((state) => state);
  const coffeSelected = cartStore.coffeSelected;

  const sizeRequired = useSharedValue(0);

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

  const sizeRequiredTextAnimation = useAnimatedStyle(() => {
    return ({
      color: interpolateColor(
        sizeRequired.value,
        [0, 1],
        [THEME.colors.base.gray_400, THEME.colors.feedback.red_dark]
      )
    });
  });

  const coffeImageAnimation = useAnimatedStyle(() => {
    return ({
      width: sizeRequired.value * 1,
      height: sizeRequired.value * 1,
      flex: 1,
      position: 'absolute',
      bottom: -60,
      alignSelf: 'center'
    });
  });

  // TODO fazer animação de fumaçinha
  // TODO caralho seria muito massa fazer uma animação de quando o cara selecionar o tamanho a imagem do coffe aumeenta ou diminui

  function onPress() {
    console.log('to aq?')
    sizeRequired.value = withSequence(withTiming(1), withTiming(0))
  }


  return (
    <View
      style={styles.container}
    >
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

        <Animated.View style={coffeImageAnimation}>
          <Image
            source={CoffePng}
            style={coffeImageAnimation}
          />
        </Animated.View>
      </View>
      <View style={styles.bottomContainer}>
        <Animated.Text style={[styles.sizeText, sizeRequiredTextAnimation]}>
          Selecione o tamanho:
        </Animated.Text>
        <View style={styles.sizeOptions}>
          {coffeSizesOptions.map((item) => (
            <Select
              key={item}
              text={item}
              selected={coffeSizeSelected === item}
              onSelect={setCoffeSizeSelected}
              animationValue={sizeRequired}
            />
          ))}
        </View>

        <View style={styles.bottomActions}>
          <CoffeQuantityCounter
            count={coffeCounter}
            setCount={setCoffeCounter}
          />
          {/* TODO impleemntar componentezinho de adicionado ao carrinho lá embaxio */}

          {/* TODO dar disable enqunato n tiver selecionado */}
          {/* TODO fazer animação em vermelho de quando ele tenta clicar no botão desabilitado */}
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
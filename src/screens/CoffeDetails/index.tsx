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
import { useNavigation, useRoute } from '@react-navigation/native';
import { Coffes } from '../../types/Coffes';
import { useCartStore } from '../../store/cartStore';
import { CoffeSize } from '../../types/CoffeSize';
import { CoffeAddedToCart } from '../../types/CoffeAddedToCart';

export function CoffeDetails() {
  const [coffeSizeSelected, setCoffeSizeSelected] = useState<CoffeSize | null>(null);
  const [coffeCounter, setCoffeCounter] = useState<number>(1);

  const navigation = useNavigation();

  const cartStore = useCartStore((state) => state)
  const coffeSelected = cartStore.coffeSelected
  {/* TODO tenho q fazer função pra passar esses parâmetros no meu zustand */ }

  function handleAddCoffeToCart() {
    let alreadyAddedToTheList = cartStore.coffeAddedToCart.find((item) => item.id === coffeSelected.id && item.size === coffeSizeSelected)

    if (alreadyAddedToTheList?.id) {
      console.log('cai aq porra')
      cartStore.updateCoffeQuantityById(coffeSelected.id, alreadyAddedToTheList.quantity + 1)
    } else {
      cartStore.setCoffeAddedToCart({ ...coffeSelected, size: coffeSizeSelected, quantity: coffeCounter })
    }

    alreadyAddedToTheList = {} as CoffeAddedToCart;
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Header goBack />

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

        <Image
          source={CoffePng}
          style={styles.coffeImage}
        />
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.sizeText}>
          Selecione o tamanho:
        </Text>
        <View style={styles.sizeOptions}>
          {coffeSizesOptions.map((item) => (
            <Select
              key={item}
              text={item}
              selected={coffeSizeSelected === item}
              onSelect={setCoffeSizeSelected}
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
            onPress={handleAddCoffeToCart}
            disabled={coffeSizeSelected === null}
          />
        </View>
      </View>
    </View>
  );
}
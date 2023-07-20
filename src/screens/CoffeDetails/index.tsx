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

export function CoffeDetails() {
  const [coffeSizeSelected, setCoffeSizeSelected] = useState('');
  const [coffeCounter, setCoffeCounter] = useState<number>(1);

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Header goBack />

        <View style={styles.textContent}>
          <View style={styles.tagContainer}>
            <Text style={styles.tagText}>
              Especial
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.coffeName} numberOfLines={2}>
              Irlandês
            </Text>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>
                R$
              </Text>
              <Text style={styles.priceValue}>
                9,90
              </Text>
            </View>
          </View>
          <Text style={styles.coffeDescription}>
            Bebida a base de café, uísque irlandês, açúcar e chantilly
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
          <Button
            title='Adicionar'
            type='purple'
          />
        </View>
      </View>
    </View>
  );
}
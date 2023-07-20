import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import { styles } from './styles';
import { Header } from '../../components/Header';
import { CoffeCardAddedToCart } from '../../components/CoffeCardAddedToCart';
import { Trash } from 'phosphor-react-native'
import { THEME } from '../../theme';
import { Button } from '../../components/Button';

export function Cart() {
  return (
    <View style={styles.container}>
      <Header
        style={styles.header}
        goBack
        title='Carrinho'
        showCart={false}
      />
      <ScrollView
        style={{ flex: 1 }}
      >
        <CoffeCardAddedToCart />
      </ScrollView>
      {/* TODO fazer função de deletar */}
      {/* <View style={styles.excludeContainer}>
        <Trash size={28} color={THEME.colors.feedback.red_dark} />
      </View> */}
      <View style={styles.bottomContainer}>
        <View style={styles.bottomText}>
          <Text style={styles.finalValue}>
            Valor total
          </Text>
          <Text style={styles.finalPrice}>
            R$ 9,90
          </Text>
        </View>

        <Button
          title='Confirmar pedido'
          type='yellow'
        />
      </View>
    </View>
  );
} 
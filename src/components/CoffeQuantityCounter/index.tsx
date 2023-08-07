import React from 'react';
import { Text, TouchableOpacity, View, ViewProps } from 'react-native';
import { Minus, Plus } from 'phosphor-react-native';
import { styles } from './styles';
import { THEME } from '../../theme';

type Props = ViewProps & {
  count: number,
  setCount: (count: number) => void;
}

export function CoffeQuantityCounter({ count, setCount, ...rest }: Props) {
  function handleDecreaseCounter() {
    if (count <= 1) {
      return;
    }

    setCount(count - 1)
  }

  return (
    <View style={[styles.container, rest.style]}>
      <TouchableOpacity
        hitSlop={16}
        onPress={() => handleDecreaseCounter()}
      >
        <Minus size={20} weight="bold" color={THEME.colors.product.purple} />
      </TouchableOpacity>

      <Text style={styles.text}>
        {count}
      </Text>

      <TouchableOpacity
        hitSlop={16}
        onPress={() => setCount(count + 1)}
      >
        <Plus size={20} weight="bold" color={THEME.colors.product.purple} />
      </TouchableOpacity>
    </View>
  );
}
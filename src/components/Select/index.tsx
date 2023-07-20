import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { styles } from './styles';
import { THEME } from '../../theme';
import { CoffeSize } from '../../types/CoffeSize';

type Props = {
  text: CoffeSize,
  selected: boolean,
  onSelect: (selectedSize: CoffeSize) => void;
}

export function Select({ text, selected, onSelect }: Props) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(text)}
      style={[
        styles.container,
        {
          borderColor: selected ? THEME.colors.product.purple : THEME.colors.base.gray_700
        }
      ]}
    >
      <Text style={[
        styles.text,
        {
          fontFamily: selected ? THEME.font_family.roboto.bold : THEME.font_family.roboto.regular,
          color: selected ? THEME.colors.product.purple : THEME.colors.base.gray_300
        }
      ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}
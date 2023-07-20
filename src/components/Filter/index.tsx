import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { CoffeType } from '../../types/CoffeType';

import { styles } from './styles';
import { THEME } from '../../theme';

type Props = TouchableOpacityProps & {
  filter: CoffeType,
  selected: boolean,
  onSelect: (filterSelected: CoffeType) => void;
}

export function Filter({ filter, selected, onSelect }: Props) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(filter)}
      style={[
        styles.container,
        { backgroundColor: selected ? THEME.colors.product.purple : 'transparent' }
      ]}
    >
      <Text style={[
        styles.text,
        { color: selected ? THEME.colors.base.white : THEME.colors.product.purple_dark }
      ]}>
        {filter}
      </Text>
    </TouchableOpacity>
  );
}
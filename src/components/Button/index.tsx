import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { styles } from './styles';
import { THEME } from '../../theme';

type Props = TouchableOpacityProps & {
  title: string;
  type: 'purple' | 'yellow';
}

export function Button({ title, type, ...rest }: Props) {
  // TODO tenq fazer a animação de onFocus aq
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: type === 'purple' ? THEME.colors.product.purple_dark : THEME.colors.product.yellow_dark
        }
      ]}
      {...rest}
    >
      <Text style={styles.text}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
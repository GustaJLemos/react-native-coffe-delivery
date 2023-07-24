import React from 'react';
import { Text, Pressable, PressableProps } from 'react-native';

import { styles } from './styles';
import { THEME } from '../../theme';

type Props = PressableProps & {
  title: string;
  type: 'purple' | 'yellow';
  disabled?: boolean;
}

export function Button({ title, type, disabled, ...rest }: Props) {
  // TODO tenq fazer a animação de onFocus aq
  return (
    <Pressable
      style={[
        styles.container,
        {
          backgroundColor: type === 'purple' ? THEME.colors.product.purple_dark : THEME.colors.product.yellow_dark,
          opacity: disabled ? 0.5 : 1
        }
      ]}
      disabled={disabled}
      {...rest}
    >
      <Text style={styles.text}>
        {title}
      </Text>
    </Pressable>
  );
}
import React from 'react';
import { Text, Pressable } from 'react-native';

import { styles } from './styles';

export function Filter() {
  return (
    <Pressable style={styles.container}>
      <Text style={styles.text}>
        Tradicionais
      </Text>
    </Pressable>
  );
}
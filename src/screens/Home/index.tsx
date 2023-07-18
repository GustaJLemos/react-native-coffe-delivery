import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { MagnifyingGlass } from 'phosphor-react-native';
import { styles } from './styles';
import { Header } from '../../components/Header';
import { THEME } from '../../theme';

export function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.background} />

      <Header />

      <Text style={styles.title}>
        Encontre o café perfeito para qualquer hora do dia
      </Text>

      <View style={styles.inputContainer}>
        <MagnifyingGlass size={16} color={THEME.colors.base.gray_400} />
        <TextInput
          style={styles.input}
          placeholder='Pesquisar'
          placeholderTextColor={THEME.colors.base.gray_400}
        />
      </View>
    </View>
  );
}

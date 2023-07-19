import React from 'react';
import { Text, TextInput, View, ScrollView } from 'react-native';
import { MagnifyingGlass } from 'phosphor-react-native';
import { styles } from './styles';
import { Header } from '../../components/Header';
import { THEME } from '../../theme';
import { CoffePrincipalCard } from '../../components/CoffePrincipalCard';
import { Filter } from '../../components/Filter';
import { CoffeCard } from '../../components/CoffeCard';

const fazermockdps = [1, 2, 3]

export function Home() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
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

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.principalCoffes}
        contentContainerStyle={styles.principalCoffesContent}
      >
        {fazermockdps.map((item) => (
          <CoffePrincipalCard key={item} />
        ))}
      </ScrollView>

      <Text style={styles.filterTitle}>
        Nossos cafés
      </Text>

      <View style={styles.filterContainer}>
        {fazermockdps.map((item) => (
          <Filter key={item} />
        ))}
      </View>

      <Text style={styles.coffeListTitle}>
        tradicionais
      </Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 12 }}
      >
        {fazermockdps.map((item) => (
          <CoffeCard key={item} />
        ))}
      </ScrollView>
    </ScrollView>
  );
}

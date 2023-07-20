import React, { useState } from 'react';
import { Text, TextInput, View, ScrollView } from 'react-native';
import { MagnifyingGlass } from 'phosphor-react-native';
import { styles } from './styles';
import { Header } from '../../components/Header';
import { THEME } from '../../theme';
import { CoffePrincipalCard } from '../../components/CoffePrincipalCard';
import { Filter } from '../../components/Filter';
import { CoffeCard } from '../../components/CoffeCard';
import { coffeFilterType, principalCoffes, specialtyCoffees, sweetCoffees, traditionalCoffees } from '../../mocks/coffes';
import { CoffeType } from '../../types/CoffeType';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '../../routes/types/AppRoutesNavigationProps';
import { Coffes } from '../../types/Coffes';
import { useCartStore } from '../../store/cartStore';

export function Home() {
  const [filterSelected, setFilterSelected] = useState<CoffeType | null>(null);
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const setCoffeSelected = useCartStore((state) => state.setCoffeSelected)

  function handleNavigateToCoffeDetails(coffeSelected: Coffes) {
    setCoffeSelected(coffeSelected);
    navigation.navigate('CoffeDetailsScreen');
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.background} />

      <Header />

      <Text style={styles.title}>
        Encontre o café perfeito para qualquer hora do dia
      </Text>

      {/* TODO Fazer função de pesquisa aq */}
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
        {principalCoffes.map((item) => (
          <CoffePrincipalCard
            key={item.id}
            coffe={item}
            onPress={() => handleNavigateToCoffeDetails(item)}
          />
        ))}
      </ScrollView>

      {/* TODO FAZZER DE QUANDO ELE TÁ SELECIONADO */}
      {/* filtros do café */}
      <Text style={styles.filterTitle}>
        Nossos cafés
      </Text>
      <View style={styles.filterContainer}>
        {coffeFilterType.map((item) => (
          <Filter
            key={item}
            filter={item}
            selected={filterSelected === item}
            onSelect={setFilterSelected}
          />
        ))}
      </View>

      {/* TODO mudar pra uma listagem só sera? */}
      {/* listagem dos cafés tradicionais */}
      <Text style={styles.coffeListTitle}>
        tradicionais
      </Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.coffeList}
      >
        {traditionalCoffees.map((item) => (
          <CoffeCard
            key={item.id}
            coffe={item}
            onPress={() => handleNavigateToCoffeDetails(item)}
          />
        ))}
      </ScrollView>

      {/* listagem dos cafés doces */}
      <Text style={styles.coffeListTitle}>
        Doces
      </Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.coffeList}
        contentContainerStyle={styles.coffeList}
      >
        {sweetCoffees.map((item) => (
          <CoffeCard
            key={item.id}
            coffe={item}
            onPress={() => handleNavigateToCoffeDetails(item)}
          />
        ))}
      </ScrollView>

      {/* listagem dos cafés especiais */}
      <Text style={styles.coffeListTitle}>
        Especiais
      </Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.coffeList}
        contentContainerStyle={styles.coffeList}
      >
        {specialtyCoffees.map((item) => (
          <CoffeCard
            key={item.id}
            coffe={item}
            onPress={() => handleNavigateToCoffeDetails(item)}
          />
        ))}
      </ScrollView>
    </ScrollView>
  );
}

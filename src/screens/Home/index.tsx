import React, { useEffect, useState } from 'react';
import { Text, TextInput, View, ScrollView, Dimensions } from 'react-native';
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
import { CoffeAddedToast } from '../../components/CoffeAddedToast';
import { Keyframe, interpolate, useAnimatedStyle, useSharedValue, withSequence, withTiming, Easing } from 'react-native-reanimated';

const { height } = Dimensions.get('window');

export function Home() {
  const [filterSelected, setFilterSelected] = useState<CoffeType | null>(null);
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const cartStore = useCartStore((state) => state)
  const setCoffeSelected = cartStore.setCoffeSelected;

  const coffeAddedOpacity = useSharedValue(0);
  const coffedAddedTranslateY = useSharedValue(0);

  function handleNavigateToCoffeDetails(coffeSelected: Coffes) {
    setCoffeSelected(coffeSelected);
    navigation.navigate('CoffeDetailsScreen');
  }

  const coffeAddedAnimation = useAnimatedStyle(() => {
    return ({
      opacity: coffeAddedOpacity.value,
      transform: [
        { translateY: interpolate(coffedAddedTranslateY.value, [0, 1, 1, 0], [0, height, height, 0]) }
      ]
    });
  })

  // TODO tenq fazer essa animação certo
  useEffect(() => {
    if (cartStore.showCoffeToast) {
      // coffeAddedOpacity.value = withSequence(withTiming(1), withTiming(0, { duration: 10000 }));
      coffeAddedOpacity.value = 1;
      coffedAddedTranslateY.value = withSequence(withTiming(0), withTiming(1, { duration: 10000 }), withTiming(1, { duration: 10000, easing: Easing.linear }), withTiming(0))
    } else {
      coffeAddedOpacity.value = 0;
    }
  }, [cartStore.showCoffeToast])

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.background} />

        <Header />

        {/* TODO colocar imagem de café aq no backfround */}
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
      <CoffeAddedToast
        style={coffeAddedAnimation}
      />
    </>
  );
}

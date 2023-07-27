import React, { useEffect, useState, useRef } from 'react';
import { Text, TextInput, View, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
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
import Animated, { Keyframe, interpolate, useAnimatedStyle, useSharedValue, withSequence, withTiming, Easing, FadeIn, SlideInDown, SlideInUp, SlideInRight, useAnimatedScrollHandler, Extrapolate, runOnJS } from 'react-native-reanimated';

const TouchabledAnimated = Animated.createAnimatedComponent(TouchableOpacity);

const { height } = Dimensions.get('window');

const COFFE_PRINCIPAL_CARD_WIDTH = 200

const COFFE_PRINCIPAL_GAP = 32

const SCROLLVIEW_CARD_SIZE = COFFE_PRINCIPAL_CARD_WIDTH - COFFE_PRINCIPAL_GAP;

export function Home() {
  const [filterSelected, setFilterSelected] = useState<CoffeType | null>(null);
  const [cardOnFocus, setCardOnFocus] = useState<number>(0);

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const cartStore = useCartStore((state) => state)
  const setCoffeSelected = cartStore.setCoffeSelected;

  const coffeAddedOpacity = useSharedValue(0);
  const coffedAddedTranslateY = useSharedValue(0);
  const penes = useSharedValue(0);

  const cuRef = useRef<{ xPosition: number }[]>([]);

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

  const principalCoffeAnimation = useAnimatedStyle(() => {
    return ({
      backgroundColor: 'red',
      transform: [
        { scale: interpolate(penes.value, [cuRef.current?.[0]?.xPosition, cuRef.current?.[0]?.xPosition + SCROLLVIEW_CARD_SIZE], [1, 0.8], Extrapolate.CLAMP) }
      ]
    });
  })

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      // console.log(event.contentOffset.x);
      penes.value = event.contentOffset.x

      console.log('tom aq?')
      switch (event.contentOffset.x) {
        case cuRef.current?.[0]?.xPosition || cuRef.current?.[0]?.xPosition + SCROLLVIEW_CARD_SIZE:
          'worklet';
          console.log('a0q')
          runOnJS(setCardOnFocus)(0);
          break;
        case cuRef.current?.[1]?.xPosition || cuRef.current?.[1]?.xPosition + SCROLLVIEW_CARD_SIZE:
          'worklet';
          console.log('a1q')
          runOnJS(setCardOnFocus)(1);
          break;
        case cuRef.current?.[2]?.xPosition || cuRef.current?.[2]?.xPosition + SCROLLVIEW_CARD_SIZE:
          'worklet';
          console.log('a2q')
          runOnJS(setCardOnFocus)(2);
          break;
        default:
          break;
      }
    }
  })

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={styles.background} entering={SlideInUp.easing(Easing.linear).duration(1000)} />

        <Animated.View entering={FadeIn.delay(1000)}>
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
        </Animated.View>

        <Animated.ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.principalCoffes}
          contentContainerStyle={styles.principalCoffesContent}
          entering={SlideInRight.delay(1500).duration(500)}
          onScroll={scrollHandler}
          pagingEnabled
        // focusable
        >
          {principalCoffes?.map((item, index) => (
            <TouchabledAnimated
              key={item.id}
              style={penes.value === (cuRef.current?.[0]?.xPosition || cuRef.current?.[0]?.xPosition + SCROLLVIEW_CARD_SIZE) && principalCoffeAnimation}
              onPress={() => handleNavigateToCoffeDetails(item)}
              onLayout={(event) => { cuRef.current?.push({ xPosition: event.nativeEvent.layout.x }) }}
              onBlur={() => { console.log('penis aq') }}
              onFocus={(event) => { console.log('to aq nesse item?', event.nativeEvent.target) }}
            >
              <CoffePrincipalCard
                key={item.id}
                coffe={item}
                onFocus={(event) => { console.log('to aq nesse item?', event.nativeEvent.target) }}
                onBlur={() => { console.log('penis aq') }}
              />
            </TouchabledAnimated>
          ))}
        </Animated.ScrollView>

        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.coffeList}
          contentContainerStyle={styles.contentCoffeList}
          entering={SlideInDown.delay(1500).duration(800)}
        >
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
          {traditionalCoffees.map((item) => (
            <CoffeCard
              key={item.id}
              coffe={item}
              onPress={() => handleNavigateToCoffeDetails(item)}
            />
          ))}

          {/* listagem dos cafés doces */}
          <Text style={styles.coffeListTitle}>
            Doces
          </Text>
          {sweetCoffees.map((item) => (
            <CoffeCard
              key={item.id}
              coffe={item}
              onPress={() => handleNavigateToCoffeDetails(item)}
            />
          ))}

          {/* listagem dos cafés especiais */}
          <Text style={styles.coffeListTitle}>
            Especiais
          </Text>
          {specialtyCoffees.map((item) => (
            <CoffeCard
              key={item.id}
              coffe={item}
              onPress={() => handleNavigateToCoffeDetails(item)}
            />
          ))}
        </Animated.ScrollView>
      </ScrollView>
      <CoffeAddedToast
        style={coffeAddedAnimation}
      />
    </>
  );
}

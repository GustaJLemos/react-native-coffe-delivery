import React, { useEffect, useState, useRef } from 'react';
import { Text, TextInput, View, ScrollView, Dimensions, TouchableOpacity, SectionList } from 'react-native';
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
import Animated, { Keyframe, interpolate, useAnimatedStyle, useSharedValue, withSequence, withTiming, Easing, FadeIn, SlideInDown, SlideInUp, SlideInRight, useAnimatedScrollHandler, Extrapolate, runOnJS, interpolateColor } from 'react-native-reanimated';
import CoffeBeanSvg from '../../assets/coffes/CoffeBean.svg'

const TouchabledAnimated = Animated.createAnimatedComponent(TouchableOpacity);

const { height } = Dimensions.get('window');

const COFFE_PRINCIPAL_CARD_WIDTH = 200

const COFFE_PRINCIPAL_GAP = 16

const SCROLLVIEW_CARD_SIZE = COFFE_PRINCIPAL_CARD_WIDTH - COFFE_PRINCIPAL_GAP;

export function Home() {
  const [filterSelected, setFilterSelected] = useState<CoffeType | null>(null);

  const scrollRef = useRef<Animated.ScrollView>(null);

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const cartStore = useCartStore((state) => state)
  const setCoffeSelected = cartStore.setCoffeSelected;

  const coffeAddedOpacity = useSharedValue(0);
  const coffedAddedTranslateY = useSharedValue(0);
  const scrollX = useSharedValue(0);
  const scrollY = useSharedValue(0);

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

  const onScrollAnimation = useAnimatedStyle(() => {
    return ({
      opacity: interpolate(scrollY.value, [0, 100, 200], [1, 0.8, 0.6]),
      transform: [
        { translateY: interpolate(scrollY.value, [0, 50, 100, 150, 200, 250], [0, -15, -30, -45, -60, -75]) }
      ]
    })
  })

  const headerAnimation = useAnimatedStyle(() => {
    return ({
      transform: [
        { translateY: interpolate(scrollY.value, [0, 50, 100, 150, 200, 250], [0, 0, 0, 0, 0, 0, 0, 0]) }
      ],
      backgroundColor: interpolateColor(scrollY.value, [200, 250], [THEME.colors.base.gray_100, THEME.colors.base.gray_900]),
      position: scrollY.value > 200 ? 'absolute' : 'relative',
      top: 0
    })
  })

  const teste = useAnimatedStyle(() => {
    return ({
      // opacity: interpolate(scrollY.value, [0, 100, 200], [1, 0.8, 0.6]),
      height: interpolate(scrollY.value, [0, 100, 200], [400, 600, 800]),
      flex: 1,
    })
  })

  // TODO tenq fazer essa animação certo
  useEffect(() => {
    if (cartStore.showCoffeToast) {
      coffeAddedOpacity.value = 1;
      coffedAddedTranslateY.value = withSequence(withTiming(0), withTiming(1, { duration: 10000 }), withTiming(1, { duration: 10000, easing: Easing.linear }), withTiming(0))
    } else {
      coffeAddedOpacity.value = 0;
    }
  }, [cartStore.showCoffeToast])

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x
    }
  })

  const coffeListScrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      console.log('event.contentOffset.y', event.contentOffset.y)
      scrollY.value = event.contentOffset.y
    }
  })

  return (
    <>
      <Animated.ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        onScroll={coffeListScrollHandler}
      // StickyHeaderComponent={() => }
      // stickyHeaderIndices={[]}
      >
        <Animated.View style={[styles.background, onScrollAnimation]} entering={SlideInUp.easing(Easing.linear).duration(1000)} />

        <Animated.View entering={FadeIn.delay(1000)}>
          {/* <Animated.View style={headerAnimation}> */}
          <Header />
          {/* </Animated.View> */}

          <Animated.View style={onScrollAnimation}>
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

            <CoffeBeanSvg
              style={styles.coffeBean}
            />
          </Animated.View>
        </Animated.View>

        <Animated.ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={[styles.principalCoffes, onScrollAnimation]}
          contentContainerStyle={styles.principalCoffesContent}
          entering={SlideInRight.delay(1500).duration(500)}
          onScroll={scrollHandler}
          pagingEnabled
          snapToInterval={SCROLLVIEW_CARD_SIZE}
          decelerationRate={0}
          scrollEventThrottle={16}
        >
          {principalCoffes?.map((item, index) => {
            const itemsRange = [
              (index - 1) * SCROLLVIEW_CARD_SIZE, // previous item
              index * SCROLLVIEW_CARD_SIZE, // current item
              (index + 1) * SCROLLVIEW_CARD_SIZE, // next item
            ]

            const principalCoffeAnimation = useAnimatedStyle(() => {
              return ({
                transform: [
                  { scale: interpolate(scrollX.value, itemsRange, [0.8, 1, 0.8], Extrapolate.CLAMP) }
                ]
              });
            })

            return (
              <TouchabledAnimated
                key={item.id}
                style={principalCoffeAnimation}
              >
                <CoffePrincipalCard
                  onPress={() => handleNavigateToCoffeDetails(item)}
                  coffe={item}
                />
              </TouchabledAnimated>
            )
          })}
        </Animated.ScrollView>

        <Animated.ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
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
                onSelect={(item) => {
                  setFilterSelected(item),
                    scrollRef.current?.scrollTo({ y: 600 })
                }}
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
      </Animated.ScrollView>
      <CoffeAddedToast
        style={coffeAddedAnimation}
      />
    </>
  );
}

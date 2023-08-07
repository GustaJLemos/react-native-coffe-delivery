import React, { useEffect, useState, useRef } from 'react';
import { Text, TextInput, View, Dimensions, TouchableOpacity, SectionList } from 'react-native';
import { MagnifyingGlass } from 'phosphor-react-native';
import { styles } from './styles';
import { Header } from '../../components/Header';
import { THEME } from '../../theme';
import { CoffePrincipalCard } from '../../components/CoffePrincipalCard';
import { Filter } from '../../components/Filter';
import { CoffeCard } from '../../components/CoffeCard';
import { coffeFilterType, principalCoffes, sectionedListCoffes, } from '../../mocks/coffes';
import { CoffeType } from '../../types/CoffeType';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '../../routes/types/AppRoutesNavigationProps';
import { Coffes } from '../../types/Coffes';
import { useCartStore } from '../../store/cartStore';
import { CoffeAddedToast } from '../../components/CoffeAddedToast';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming, Easing, FadeIn, SlideInDown, SlideInUp, SlideInRight, useAnimatedScrollHandler, Extrapolate, runOnJS, interpolateColor } from 'react-native-reanimated';
import CoffeBeanSvg from '../../assets/coffes/CoffeBean.svg'
import { GestureDetector, Gesture } from 'react-native-gesture-handler';

const TouchabledAnimated = Animated.createAnimatedComponent(TouchableOpacity);
const SectionListAnimated = Animated.createAnimatedComponent(SectionList);

const { height } = Dimensions.get('window');

const COFFE_PRINCIPAL_CARD_WIDTH = 200

const COFFE_PRINCIPAL_GAP = 16

const SCROLLVIEW_CARD_SIZE = COFFE_PRINCIPAL_CARD_WIDTH - COFFE_PRINCIPAL_GAP;

const COFFE_CARD_HEIGHT = 120

const COFFE_CARD_LIST_TITLE = 48

const COFFE_CARD_LIST_GAP = 12

const SECTION_LIST_HEIGHT = sectionedListCoffes.length * (COFFE_CARD_HEIGHT + COFFE_CARD_LIST_GAP + COFFE_CARD_LIST_TITLE)

export function Home() {
  const [filterSelected, setFilterSelected] = useState<CoffeType | null>(null);
  const [canScroll, setCanScroll] = useState(true);

  const scrollRef = useRef<SectionList>(null);

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const cartStore = useCartStore((state) => state)
  const setCoffeSelected = cartStore.setCoffeSelected;

  const coffeAddedOpacity = useSharedValue(0);
  const coffedAddedTranslateY = useSharedValue(0);
  const scrollX = useSharedValue(0);
  const scrollY = useSharedValue(0);
  const coffeListPosition = useSharedValue(0);

  function handleNavigateToCoffeDetails(coffeSelected: Coffes) {
    setCoffeSelected(coffeSelected);
    navigation.navigate('CoffeDetailsScreen');
  }

  function handleSelectFilter(filter: CoffeType) {
    setCanScroll(false);
    setFilterSelected(filter);

    switch (filter) {
      case 'tradicionais':
        scrollRef.current.scrollToLocation({ itemIndex: 0, sectionIndex: 0 })
        break;
      case 'doces':
        scrollRef.current?.scrollToLocation({ itemIndex: 0, sectionIndex: 1 })
        break;
      case 'especiais':
        scrollRef.current?.scrollToLocation({ itemIndex: 0, sectionIndex: 2 })
        break;
    }
    console.log('eu sou mais rápido?')
  }

  const coffeAddedStyles = useAnimatedStyle(() => {
    return ({
      opacity: coffeAddedOpacity.value,
      transform: [
        { translateY: interpolate(coffedAddedTranslateY.value, [1, 0], [height, 0]) }
      ]
    });
  })

  const coffeOnPanStyles = useAnimatedStyle(() => {
    return ({
      opacity: interpolate((coffeListPosition.value * -1), [0, 100, 200, 300, 400, 410], [1, 0.9, 0.8, 0.7, 0.6, 0], Extrapolate.CLAMP),
      transform: [
        { translateY: coffeListPosition.value }
      ],
    })
  })

  const coffeFilterStyles = useAnimatedStyle(() => {
    return ({
      transform: [
        { translateY: coffeListPosition.value }
      ]
    })
  })

  const textColorStyles = useAnimatedStyle(() => {
    return ({
      color: interpolateColor(coffeListPosition.value, [0, -335], [THEME.colors.base.gray_900, THEME.colors.base.gray_200])
    })
  })

  useEffect(() => {
    if (cartStore.showCoffeToast) {
      coffeAddedOpacity.value = 1
      coffedAddedTranslateY.value = withTiming(1, { duration: 5000, easing: Easing.in(Easing.exp) });
    } else {
      coffeAddedOpacity.value = 0;
      coffedAddedTranslateY.value = 0;
    }
  }, [cartStore.showCoffeToast])

  const principalCoffeScrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x
    }
  })

  // TODO dar uma olhada pq essa animação aq tá bugando
  // TODO se pá se eu usar a parada de gesto aq isso resolve, ai habilito o scroll dps de uma certa hr da tela
  // TODO basicamente boyo o identificador de gestos aq, e "puxo" ele até la emcima, a aprtir de uma posição definida eu "travo" o usuário, e habilito o scroll

  // TODO trocar os touchableOpacity
  // TODO arrumar animação de quando vc clica no filtro ele fica piscando
  const coffeListScrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      if (!canScroll) return;
      scrollY.value = event.contentOffset.y

      if (scrollY.value < 430) {
        'worklet'
        runOnJS(setFilterSelected)('tradicionais')
        return
      }
      if (scrollY.value > 430 && scrollY.value < 910) {
        'worklet'
        runOnJS(setFilterSelected)('doces')
        return
      }
      if (scrollY.value > 910) {
        'worklet'
        runOnJS(setFilterSelected)('especiais')
        return
      }
    }
  })

  const onPan = Gesture.Pan().onUpdate((event) => {
    const onMove = event.translationY < 0 && event.translationY > (-440);

    if (onMove) {
      coffeListPosition.value = event.translationY
    }
  }).onEnd((event) => {
    if (event.translationY > (-300)) {
      coffeListPosition.value = withTiming(-0)

      'worklet'
      runOnJS(setFilterSelected)(null)
    } else {
      coffeListPosition.value = withTiming(-440)

      'worklet'
      runOnJS(setFilterSelected)('tradicionais')
    }
  })

  return (
    <>
      <View
        style={styles.container}
      >
        <Header addressColor={textColorStyles} />

        <Animated.View style={[styles.background, coffeOnPanStyles]} entering={SlideInUp.easing(Easing.linear).duration(1000)} />
        <Animated.View style={coffeOnPanStyles}>
          <Animated.View entering={FadeIn.delay(1000)}>
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

          <Animated.ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.principalCoffes}
            contentContainerStyle={styles.principalCoffesContent}
            entering={SlideInRight.delay(1500).duration(500)}
            onScroll={principalCoffeScrollHandler}
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
        </Animated.View>

        <Animated.View entering={SlideInDown.delay(1500).duration(800)}>
          <GestureDetector gesture={onPan}>
            <Animated.View style={coffeFilterStyles}>
              <Text style={styles.filterTitle}>
                Nossos cafés
              </Text>
              <View style={styles.filterContainer}>
                {coffeFilterType.map((item) => (
                  <Filter
                    key={item}
                    filter={item}
                    selected={filterSelected === item}
                    onSelect={(item) => handleSelectFilter(item)}
                    onfilterIsSelected={() => setCanScroll(true)}
                  />
                ))}
              </View>
            </Animated.View>
          </GestureDetector>

          <Animated.View style={coffeFilterStyles}>
            <SectionListAnimated
              ref={scrollRef}
              onScroll={coffeListScrollHandler}
              sections={sectionedListCoffes}
              showsVerticalScrollIndicator={false}
              style={{ height: SECTION_LIST_HEIGHT }}
              contentContainerStyle={styles.contentCoffeList}
              keyExtractor={(item, index) => item.id + index}
              renderItem={({ item }) => (
                <CoffeCard
                  key={item.id}
                  coffe={item}
                  onPress={() => handleNavigateToCoffeDetails(item)}
                />
              )}
              renderSectionHeader={({ section }) => (
                <Text
                  style={styles.coffeListTitle}
                >
                  {section.title}
                </Text>
              )}
            />
          </Animated.View>
        </Animated.View>
      </View >
      {/* TODO ver se essa animação ta nice */}
      {/* TODO, ver melhor a lógica em cima disso, pq ele só vai aparecer isso qunado eu adicionar um café, clicar no carrinho, e dai selecionar outro cafpe */}
      {
        cartStore.showCoffeToast && (
          <CoffeAddedToast
            style={coffeAddedStyles}
          />
        )
      }
    </>
  );
}

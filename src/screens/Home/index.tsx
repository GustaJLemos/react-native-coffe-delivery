import React, { useEffect, useState, useRef } from 'react';
import { Text, TextInput, View, ScrollView, Dimensions, TouchableOpacity, SectionList, FlatList } from 'react-native';
import { MagnifyingGlass } from 'phosphor-react-native';
import { styles } from './styles';
import { Header } from '../../components/Header';
import { THEME } from '../../theme';
import { CoffePrincipalCard } from '../../components/CoffePrincipalCard';
import { Filter } from '../../components/Filter';
import { CoffeCard } from '../../components/CoffeCard';
import { coffeFilterType, principalCoffes, sectionedListCoffes, specialtyCoffees, sweetCoffees, traditionalCoffees } from '../../mocks/coffes';
import { CoffeType } from '../../types/CoffeType';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '../../routes/types/AppRoutesNavigationProps';
import { Coffes } from '../../types/Coffes';
import { useCartStore } from '../../store/cartStore';
import { CoffeAddedToast } from '../../components/CoffeAddedToast';
import Animated, { Keyframe, interpolate, useAnimatedStyle, useSharedValue, withSequence, withTiming, Easing, FadeIn, SlideInDown, SlideInUp, SlideInRight, useAnimatedScrollHandler, Extrapolate, runOnJS, interpolateColor } from 'react-native-reanimated';
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

const HEIGHT_HEADER = 300;

export function Home() {
  const [filterSelected, setFilterSelected] = useState<CoffeType | null>(null);

  const scrollRef = useRef<SectionList>(null);

  const coffeListTitleFilterRef = useRef<{ yPosition: number }[]>(null);

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
    console.log('asdklaskdjasdk')
    setFilterSelected(filter);

    console.log('coffeListTitleFilterRef.current[0].yPosition', coffeListTitleFilterRef)

    switch (filter) {
      case 'tradicionais':
        scrollRef.current.scrollToLocation({ itemIndex: 0, sectionIndex: 0 })
        break;
      case 'doces':
        scrollRef.current?.scrollToLocation({ itemIndex: 1, sectionIndex: 1 })
        break;
      case 'especiais':
        scrollRef.current?.scrollToLocation({ itemIndex: 2, sectionIndex: 2 })
        break;
      default:
        break;
    }
  }

  const coffeAddedAnimation = useAnimatedStyle(() => {
    return ({
      opacity: coffeAddedOpacity.value,
      transform: [
        { translateY: interpolate(coffedAddedTranslateY.value, [0, 1, 1, 0], [0, height, height, 0]) }
      ]
    });
  })

  // const onScrollAnimation = useAnimatedStyle(() => {
  //   return ({
  //     opacity: interpolate(scrollY.value, [0, 200, 300, 400, 500], [1, 0.8, 0.4, 0.2, 0], Extrapolate.CLAMP),
  //     transform: [
  //       { translateY: interpolate(scrollY.value, [0, 100, 200, 300, 400, 500, 600, 700], [0, -40, -80, -120, -160, -180, -220, -260], Extrapolate.CLAMP) }
  //     ],
  //   })
  // })

  const onPanAnimation = useAnimatedStyle(() => {
    return ({
      opacity: interpolate((coffeListPosition.value * -1), [0, 100, 200, 300, 400, 410], [1, 0.9, 0.8, 0.7, 0.6, 0], Extrapolate.CLAMP),
      transform: [
        { translateY: coffeListPosition.value }
      ],
    })
  })

  const lala = useAnimatedStyle(() => {
    return ({
      transform: [
        { translateY: coffeListPosition.value }
      ]
    })
  })

  const textColorStyles = useAnimatedStyle(() => {
    return ({
      color: interpolateColor(coffeListPosition.value, [0, -335], [THEME.colors.base.gray_200, THEME.colors.base.gray_900])
    })
  })

  const headerAnimation = useAnimatedStyle(() => {
    return ({
      transform: [
        { translateY: interpolate(scrollY.value, [0, 50, 100, 150, 200, 250], [0, 0, 0, 0, 0, 0, 0, 0], Extrapolate.CLAMP) }
      ],
      backgroundColor: interpolateColor(scrollY.value, [200, 250], [THEME.colors.base.gray_100, THEME.colors.base.gray_900]),
      position: scrollY.value > 200 ? 'absolute' : 'relative',
      top: 0
    })
  })

  const fixedHeaderStyles = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      zIndex: 1,
      // flex: 1,
      width: '110%',
      left: '-5%',
      paddingTop: 50,
      // paddingVertical: 40,
      backgroundColor: THEME.colors.base.gray_900,
      opacity: interpolate(scrollY.value, [250, 300], [0, 1], Extrapolate.CLAMP),
      transform: [
        { translateY: interpolate(scrollY.value, [250, 300], [-40, HEIGHT_HEADER], Extrapolate.CLAMP) }
      ]
    }
  });

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

  // dar uma olhada pq essa animação aq tá bugando
  // TODO se pá se eu usar a parada de gesto aq isso resolve, ai habilito o scroll dps de uma certa hr da tela
  // TODO basicamente boyo o identificador de gestos aq, e "puxo" ele até la emcima, a aprtir de uma posição definida eu "travo" o usuário, e habilito o scroll
  const coffeListScrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      console.log('event.contentOffset.y', event.contentOffset.y)
      if (scrollY.value < 500) {
        'worklet'
        runOnJS(setFilterSelected)('tradicionais')
      }
      if (scrollY.value > 460) {
        'worklet'
        runOnJS(setFilterSelected)('doces')
      }
      if (scrollY.value > 780) {
        'worklet'
        runOnJS(setFilterSelected)('especiais')
      }
      if (scrollY.value > 800) {
        return;
      }
      scrollY.value = event.contentOffset.y
    }
  })

  const onPan = Gesture.Pan().onChange((event) => {
    const onMove = event.translationY < 0 && event.translationY > (-440);
    // no onEnd, eu verifico a posição de onde ele está, e de acordo com isso, eu transfiro ele para a posição inicial (0), ou coloco ele pra cima de uma vez
    if (onMove) {
      coffeListPosition.value = event.translationY
    }
  }).onEnd((event) => {
    console.log('lalellele la em casa', event.translationY)
    if (event.translationY > (-300)) {
      coffeListPosition.value = withTiming(-0)
    } else {
      coffeListPosition.value = withTiming(-440)
    }

    console.log('event', event)
  })

  return (
    <>
      <View
        style={styles.container}
      // showsVerticalScrollIndicator={false}
      // onScroll={coffeListScrollHandler}
      >
        {/* mudar a cor do texto dps de certa posição apra o preto */}
        {/* TODO ver uma forma de passar a cor aq e mudar quando tiver a animação */}
        {/* TODO tenq ver a animação do toast lá embaixo */}
        {/* TODO fazer animação de quando clicar navegar lá pra baixo, além disso mover todo o negócio lá pra cima, quando eu tiver gfazendo o pan pra cima, eu tbm já mudo o filtro selecionado para o primeiro */}
        <Header />

        <Animated.View style={[styles.background, onPanAnimation]} entering={SlideInUp.easing(Easing.linear).duration(1000)} />

        <Animated.View style={onPanAnimation}>

          <Animated.View entering={FadeIn.delay(1000)}>

            {/* <Animated.View style={fixedHeaderStyles}>
            <Header />
          </Animated.View> */}

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

          <Animated.ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.principalCoffes}
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

        </Animated.View>

        {/* fazer um "onLongPress" pra puxar esse nossos cafés aq debaixo, 
        e n deixar o scrooll View habilitado por padrão, só fazer o gesto mesmo */}



        <Animated.View entering={SlideInDown.delay(1500).duration(800)}>
          {/* tenho q fazer a animação de  */}
          <GestureDetector gesture={onPan}>
            <Animated.View style={lala}>
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
                  />
                ))}
              </View>
            </Animated.View>
          </GestureDetector>
          <Animated.View style={lala}>
            <SectionListAnimated
              ref={scrollRef}
              onScroll={coffeListScrollHandler}
              scrollEnabled={!(coffeListPosition.value < 0 && coffeListPosition.value > (-440))}
              sections={sectionedListCoffes}
              showsVerticalScrollIndicator={false}
              style={{ height: SECTION_LIST_HEIGHT, flexGrow: 1, backgroundColor: 'blue' }}
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
      <CoffeAddedToast
        style={coffeAddedAnimation}
      />
    </>
  );
}

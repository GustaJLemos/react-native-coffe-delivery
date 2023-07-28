import React, { useEffect } from 'react';
import { Text, Pressable, PressableProps } from 'react-native';
import { CoffeType } from '../../types/CoffeType';

import { styles } from './styles';
import { THEME } from '../../theme';
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const PressabledAnimated = Animated.createAnimatedComponent(Pressable);

type Props = PressableProps & {
  filter: CoffeType,
  selected: boolean,
  onSelect: (filterSelected: CoffeType) => void;
}

export function Filter({ filter, selected, onSelect }: Props) {
  const colorAnimation = useSharedValue(0);

  const colorBgAnimatedStyles = useAnimatedStyle(() => {
    return ({
      backgroundColor: interpolateColor(colorAnimation.value, [0, 1], ['transparent', THEME.colors.product.purple]),
    })
  })

  // fazer melhor essa animação aq, pra ela dar uma sumida mais suave
  const colorTextAnimatedStyles = useAnimatedStyle(() => {
    return ({
      color: interpolateColor(colorAnimation.value, [0, 1], [THEME.colors.product.purple_dark, THEME.colors.base.white])
    })
  })

  useEffect(() => {
    colorAnimation.value = withTiming(selected ? 1 : 0, { duration: 400 });
  }, [selected])

  return (
    <PressabledAnimated
      onPress={() => onSelect(filter)}
      style={[
        styles.container,
        colorBgAnimatedStyles
      ]}
    >
      <Animated.Text style={[
        styles.text,
        colorTextAnimatedStyles
      ]}>
        {filter}
      </Animated.Text>
    </PressabledAnimated>
  );
}
import React from 'react';
import { Pressable, Text } from 'react-native';
import Animated, { SharedValue, interpolateColor, useAnimatedStyle } from 'react-native-reanimated';
import { styles } from './styles';
import { THEME } from '../../theme';
import { CoffeSize } from '../../types/CoffeSize';

const PressabledAnimated = Animated.createAnimatedComponent(Pressable);

type Props = {
  text: CoffeSize,
  selected: boolean,
  onSelect: (selectedSize: CoffeSize) => void;
  animationValue: SharedValue<number>;
}

export function Select({ text, selected, onSelect, animationValue }: Props) {
  const sizeRequiredSelectAnimation = useAnimatedStyle(() => {
    return ({
      borderColor: interpolateColor(
        animationValue.value,
        [0, 1],
        [selected ? THEME.colors.product.purple : THEME.colors.base.gray_700, THEME.colors.feedback.red_dark]
      )
    });
  });

  return (
    <PressabledAnimated
      onPress={() => onSelect(text)}
      style={[
        styles.container,
        sizeRequiredSelectAnimation,
      ]}
    >
      <Text style={[
        styles.text,
        {
          fontFamily: selected ? THEME.font_family.roboto.bold : THEME.font_family.roboto.regular,
          color: selected ? THEME.colors.product.purple : THEME.colors.base.gray_300
        }
      ]}>
        {text}
      </Text>
    </PressabledAnimated>
  );
}
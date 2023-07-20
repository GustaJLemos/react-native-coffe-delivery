import React from 'react';
import { Text, View, ViewProps } from 'react-native';
import { MapPin, ShoppingCart } from 'phosphor-react-native';
import { styles } from './styles';
import { THEME } from '../../theme';
import { ArrowLeft } from 'phosphor-react-native';

type Props = ViewProps & {
  goBack?: boolean,
  title?: string,
  showCart?: boolean
}

export function Header({ goBack = false, title = '', showCart = true, ...rest }: Props) {
  return (
    <View style={[styles.container, rest.style]}>
      {goBack ? (
        <ArrowLeft size={24} color={title ? THEME.colors.base.gray_100 : THEME.colors.base.white} />
      ) : (
        <View style={styles.userLocation}>
          <MapPin size={20} weight="fill" color={THEME.colors.product.purple} />
          <Text style={styles.text}>
            Ponta Grossa, PR
          </Text>
        </View>
      )}

      {title && (
        <Text style={styles.title}>
          {title}
        </Text>
      )}

      {/* TODO fazer a contagem de itens */}
      {showCart ? (
        <ShoppingCart size={20} weight="fill" color={THEME.colors.product.yellow_dark} />
      ) : (
        // View somente para fazer com que o título fique no meio por conta do space-between nos estilos
        <View style={{ width: 20, height: 20 }} />
      )}
    </View>
  );
}
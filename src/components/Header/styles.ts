import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 2
  },
  userLocation: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    fontFamily: THEME.font_family.roboto.regular,
    fontSize: THEME.font_size.roboto.text_sm,
    color: THEME.colors.base.gray_900,
    marginLeft: 4
  },
  title: {
    fontFamily: THEME.font_family.baloo.bold,
    fontSize: THEME.font_size.baloo.title_sm,
    color: THEME.colors.base.gray_200,
  },
  coffesInCartIcon: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center'
  },
  coffesInCart: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    backgroundColor: THEME.colors.product.purple,
    borderRadius: 100,
    paddingVertical: 2,
    position: 'absolute',
    zIndex: 2,
    top: -10,
    right: -10
  },
  coffesInCartText: {
    fontFamily: THEME.font_family.roboto.regular,
    fontSize: THEME.font_size.roboto.text_xs,
    color: THEME.colors.base.white,
  }
});
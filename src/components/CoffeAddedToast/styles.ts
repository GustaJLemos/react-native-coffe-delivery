import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 32,
    paddingVertical: 28,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: THEME.colors.base.white,
    gap: 20,

    borderTopColor: THEME.colors.base.gray_900,
    borderTopWidth: 1,

    shadowColor: THEME.colors.base.gray_100,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,

    elevation: 24,
  },
  cartIconContainer: {
    backgroundColor: THEME.colors.base.gray_500,
    borderRadius: 6,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  text: {
    flex: 1,
    fontFamily: THEME.font_family.roboto.regular,
    fontSize: THEME.font_size.roboto.text_sm,
    color: THEME.colors.base.gray_400,
  },
  textBold: {
    fontFamily: THEME.font_family.roboto.bold,
    fontSize: THEME.font_size.roboto.text_sm,
    color: THEME.colors.base.gray_400,
  },
  buttonText: {
    fontFamily: THEME.font_family.roboto.bold,
    fontSize: THEME.font_size.roboto.text_xs,
    color: THEME.colors.product.purple,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
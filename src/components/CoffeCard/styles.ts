import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 120,
    backgroundColor: THEME.colors.base.gray_800,
    marginTop: 15,
    paddingHorizontal: 12,

    flexDirection: 'row',

    borderTopLeftRadius: 6,
    borderTopRightRadius: 36,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 6,
    borderColor: THEME.colors.base.gray_700,
    borderWidth: 1,

    shadowColor: THEME.colors.base.gray_700,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  content: {
    flex: 1,
    paddingVertical: 24,
    justifyContent: 'center',
    paddingLeft: 8
  },
  title: {
    color: THEME.colors.base.gray_200,
    fontFamily: THEME.font_family.baloo.bold,
    fontSize: THEME.font_size.baloo.title_sm,
  },
  description: {
    color: THEME.colors.base.gray_400,
    fontFamily: THEME.font_family.roboto.regular,
    fontSize: THEME.font_size.roboto.text_xs,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    color: THEME.colors.product.yellow_dark,
    fontFamily: THEME.font_family.roboto.regular,
    fontSize: THEME.font_size.roboto.text_sm,
    marginRight: 4
  },
  priceValue: {
    color: THEME.colors.product.yellow_dark,
    fontFamily: THEME.font_family.baloo.bold,
    fontSize: THEME.font_size.baloo.title_lg,
  }
});
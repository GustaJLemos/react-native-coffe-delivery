import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    width: 200,
    alignItems: 'center',
    backgroundColor: THEME.colors.base.gray_800,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 36,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 6,
    borderColor: THEME.colors.base.gray_700,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingBottom: 20,
    marginTop: 40,

    shadowColor: THEME.colors.base.gray_700,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  coffeTypeContainer: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: THEME.colors.product.purple_light,
    borderRadius: 100,
    marginTop: 4
  },
  coffeType: {
    color: THEME.colors.product.purple_dark,
    fontFamily: THEME.font_family.roboto.bold,
    fontSize: THEME.font_size.roboto.tag,
    textTransform: 'capitalize'
  },
  title: {
    color: THEME.colors.base.gray_200,
    fontFamily: THEME.font_family.baloo.bold,
    fontSize: THEME.font_size.baloo.title_md,
    marginTop: 14,
  },
  description: {
    color: THEME.colors.base.gray_400,
    fontFamily: THEME.font_family.roboto.regular,
    fontSize: THEME.font_size.roboto.text_xs,
    textAlign: 'center'
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14
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
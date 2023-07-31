import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.base.gray_900,
  },
  background: {
    width: '100%',
    height: '70%',
    backgroundColor: THEME.colors.base.gray_100,
    paddingHorizontal: 32,
    paddingTop: 32
  },
  textContent: {
    width: '100%',
    alignItems: 'flex-start',
  },
  tagContainer: {
    borderRadius: 100,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: THEME.colors.base.gray_200,
  },
  tagText: {
    color: THEME.colors.base.white,
    fontSize: THEME.font_size.roboto.tag,
    fontFamily: THEME.font_family.roboto.bold,
    textTransform: 'uppercase'
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  coffeName: {
    flex: 1,
    marginTop: 14,
    color: THEME.colors.base.white,
    fontSize: THEME.font_size.baloo.title_lg,
    fontFamily: THEME.font_family.baloo.bold,
    lineHeight: 30
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
    fontSize: THEME.font_size.baloo.title_xl,
  },
  coffeDescription: {
    marginTop: 4,
    color: THEME.colors.base.gray_500,
    fontFamily: THEME.font_family.roboto.regular,
    fontSize: THEME.font_size.roboto.text_md,
  },
  coffeImageContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  bottomContainer: {
    flex: 1,
    paddingTop: 42,
    paddingHorizontal: 32
  },
  sizeText: {
    fontFamily: THEME.font_family.roboto.regular,
    fontSize: THEME.font_size.roboto.text_sm,
    marginBottom: 8
  },
  sizeOptions: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  bottomActions: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.base.gray_700,
    padding: 8,
    borderRadius: 6,
    gap: 16
  }
});
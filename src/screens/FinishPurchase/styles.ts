import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.colors.base.gray_900,
  },
  title: {
    color: THEME.colors.product.yellow_dark,
    fontFamily: THEME.font_family.baloo.bold,
    fontSize: THEME.font_size.baloo.title_lg,
    alignSelf: 'center',
    marginTop: 24
  },
  text: {
    color: THEME.colors.base.gray_200,
    fontFamily: THEME.font_family.roboto.regular,
    fontSize: THEME.font_size.roboto.text_sm,
    textAlign: 'center',
    marginBottom: 36
  }
});
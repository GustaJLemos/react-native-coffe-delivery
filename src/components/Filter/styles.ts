import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: THEME.colors.product.purple,
    borderRadius: 100,
    paddingVertical: 6,
    paddingHorizontal: 12
  },
  text: {
    fontSize: THEME.font_size.roboto.tag,
    fontFamily: THEME.font_family.roboto.bold,
    textTransform: 'uppercase'
  }
});
import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 46,
    maxHeight: 46,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 6
  },
  text: {
    color: THEME.colors.base.white,
    fontFamily: THEME.font_family.roboto.bold,
    fontSize: THEME.font_size.roboto.button,
    textTransform: 'uppercase'
  }
});
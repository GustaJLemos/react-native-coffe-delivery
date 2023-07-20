import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  text: {
    fontFamily: THEME.font_family.roboto.bold,
    fontSize: THEME.font_size.roboto.text_md,
    color: THEME.colors.base.gray_100,
  },
});
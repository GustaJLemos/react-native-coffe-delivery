import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.colors.base.gray_700,
    borderWidth: 1,
    borderRadius: 6
  },
  text: {
    fontSize: THEME.font_size.roboto.text_sm
  }
});
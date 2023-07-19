import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
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
  }
});
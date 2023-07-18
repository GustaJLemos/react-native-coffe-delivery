import { Dimensions, StyleSheet } from 'react-native';
import { THEME } from '../../theme';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },
  background: {
    width: width,
    height: '50%',
    backgroundColor: THEME.colors.base.gray_100,
    position: 'absolute'
  },
  title: {
    fontFamily: THEME.font_family.baloo.bold,
    fontSize: THEME.font_size.baloo.title_md,
    color: THEME.colors.base.white
  },
  inputContainer: {
    width: '100%',
    backgroundColor: THEME.colors.base.gray_200,
    borderRadius: 4,
    paddingHorizontal: 16,
    marginVertical: 16,
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    width: '100%',
    height: 42,
    color: THEME.colors.base.gray_700,
    backgroundColor: THEME.colors.base.gray_200,
    paddingHorizontal: 8,
  }
});
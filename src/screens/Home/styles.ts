import { Dimensions, StyleSheet } from 'react-native';
import { THEME } from '../../theme';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 32,
  },
  background: {
    width: width,
    height: '15%',
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
    borderRadius: 4,
  },
  principalCoffes: {
    width: width,
    marginLeft: -32,
    maxHeight: 280,
    marginBottom: 14,
    marginRight: 32,
  },
  principalCoffesContent: {
    gap: 32,
    paddingHorizontal: 32
  },
  filterTitle: {
    fontFamily: THEME.font_family.baloo.bold,
    fontSize: THEME.font_size.baloo.title_md,
    color: THEME.colors.base.gray_300,
    marginVertical: 12
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8
  },
  coffeListTitle: {
    fontFamily: THEME.font_family.baloo.bold,
    fontSize: THEME.font_size.baloo.title_xs,
    color: THEME.colors.base.gray_400,
    marginTop: 36,
    marginBottom: 12
  },
  coffeList: {
    flex: 1,
    gap: 12
  }
});
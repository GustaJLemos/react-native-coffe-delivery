import { Dimensions, StyleSheet } from 'react-native';
import { THEME } from '../../theme';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 32,
    backgroundColor: THEME.colors.base.gray_900,
  },
  background: {
    width: width,
    height: '35%',
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
  coffeBean: {
    position: 'absolute',
    right: 0,
    bottom: -60,
    zIndex: -1
  },
  principalCoffes: {
    width: width,
    marginLeft: -32,
    maxHeight: 280,
    marginBottom: 14,
  },
  principalCoffesContent: {
    gap: 16,
    paddingLeft: 64,
    paddingRight: 64
  },
  filterTitle: {
    fontFamily: THEME.font_family.baloo.bold,
    fontSize: THEME.font_size.baloo.title_md,
    color: THEME.colors.base.gray_300,
    marginVertical: 12
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12
  },
  coffeListTitle: {
    fontFamily: THEME.font_family.baloo.bold,
    fontSize: THEME.font_size.baloo.title_xs,
    color: THEME.colors.base.gray_400,
    marginTop: 12,
  },
  contentCoffeList: {
    gap: 12,
  }
});
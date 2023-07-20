import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 120,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 16,
    gap: 20,
    backgroundColor: THEME.colors.base.gray_900,
    borderBottomColor: THEME.colors.base.gray_700,
    borderBottomWidth: 1,
  },
  infoContainer: {
    flex: 1,
  },
  coffeName: {
    color: THEME.colors.base.gray_100,
    fontFamily: THEME.font_family.roboto.regular,
    fontSize: THEME.font_size.roboto.text_md,
  },
  coffeSize: {
    color: THEME.colors.base.gray_400,
    fontFamily: THEME.font_family.roboto.regular,
    fontSize: THEME.font_size.roboto.text_sm,
  },
  cardActionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12
  },
  coffeCounterContainer: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: THEME.colors.base.gray_600
  },
  trashIconContainer: {
    backgroundColor: THEME.colors.base.gray_700,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6
  },
  coffePrice: {
    color: THEME.colors.base.gray_100,
    fontFamily: THEME.font_family.baloo.bold,
    fontSize: THEME.font_size.baloo.title_sm,
    alignSelf: 'flex-start'
  }
});
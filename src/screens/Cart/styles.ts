import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    backgroundColor: THEME.colors.base.gray_900,
  },
  header: {
    borderBottomColor: THEME.colors.base.gray_700,
    borderBottomWidth: 1,
    padding: 32,
  },
  emptyListContainer: {
    width: '100%',
    height: 260,
    justifyContent: 'center',
    paddingHorizontal: 32
  },
  emptyListText: {
    color: THEME.colors.base.gray_400,
    fontFamily: THEME.font_family.roboto.regular,
    fontSize: THEME.font_size.roboto.text_sm,
    marginTop: 12,
    marginBottom: 32,
  },
  swipeableDelete: {
    width: '100%',
    height: 120,
    paddingHorizontal: 32,
    paddingVertical: 16,
    justifyContent: 'center',
    backgroundColor: THEME.colors.feedback.red_light,
  },
  bottomContainer: {
    width: '100%',
    height: 160,
    padding: 32,
    backgroundColor: THEME.colors.base.white,

    borderTopColor: THEME.colors.base.gray_900,
    borderTopWidth: 1,

    shadowColor: THEME.colors.base.gray_100,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,

    elevation: 24,
  },
  bottomText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  finalValue: {
    color: THEME.colors.base.gray_200,
    fontFamily: THEME.font_family.roboto.regular,
    fontSize: THEME.font_size.roboto.text_md,
  },
  finalPrice: {
    color: THEME.colors.base.gray_200,
    fontFamily: THEME.font_family.baloo.bold,
    fontSize: THEME.font_size.baloo.title_md,
  },
});
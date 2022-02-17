import { StyleSheet } from 'react-native';
import { theme, mixins } from '../../styles';

export default StyleSheet.create({
  dataValue: {
    fontFamily: theme.fontFamily.regular,
    fontSize: theme.fontSize.regular,
    color: theme.color.textPrimary,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  proofContainer: {
    backgroundColor: theme.color.backgroundSecondary,
    borderRadius: theme.borderRadius,
    marginTop: 16,
    padding: 16,
    justifyContent: 'space-between',
  },
  proofText: {
    marginHorizontal: 14,
  },
  modalBodyText: {
    ...mixins.paragraphText,
    textAlign: 'center',
    lineHeight: 24,
    marginVertical: 8,
  },
});

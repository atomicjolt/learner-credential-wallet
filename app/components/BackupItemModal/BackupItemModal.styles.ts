import { StyleSheet } from 'react-native';
import { mixins, theme } from '../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  paragraph: {
    ...mixins.paragraphText,
    fontSize: theme.fontSize.medium,
    marginVertical: 8,
    marginBottom: 16,
  },
  checkboxButtonContainer: {
    flexDirection: 'row',
    padding: 8,
    justifyContent: 'center',
  },
  checkboxContainer: {
    height: 24,
    width: 24,
    marginRight: 16,
  },
  checkboxText: {
    ...mixins.paragraphText,
  },
  passwordForm: {
    marginVertical: 8,
  },
});

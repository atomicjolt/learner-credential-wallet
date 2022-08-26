import React from 'react';
import { ListItem } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';

import { theme } from '../../styles';
import styles from './MenuItem.styles';
import type { MenuItemProps } from './MenuItem.d';

export default function MenuItem({ icon, title, onPress }: MenuItemProps): JSX.Element {
  return (
    <ListItem
      containerStyle={styles.menuItemContainer}
      onPress={onPress}
      hasTVPreferredFocus={undefined}
      tvParallaxProperties={undefined}
    >
      <MaterialIcons
        name={icon}
        size={theme.iconSize}
        color={theme.color.iconInactive}
      />
      <ListItem.Content>
        <ListItem.Title style={styles.menuItemTitle}>{title}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
}

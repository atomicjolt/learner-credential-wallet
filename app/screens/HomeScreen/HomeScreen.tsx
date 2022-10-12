import React, { useState } from 'react';
import { Text, View, FlatList, AccessibilityInfo } from 'react-native';
import { Button } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import Swipeable from 'react-native-swipeable';

import { CredentialItem, NavHeader, ConfirmModal } from '../../components';
import { navigationRef } from '../../navigation';

import { credentialRenderInfo } from '../../components/CredentialCard/CredentialCard';

import dynamicStyleSheet from './HomeScreen.styles';
import { HomeScreenProps, RenderItemProps } from './HomeScreen.d';
import { CredentialRecordRaw } from '../../model';
import { useAppDispatch, useDynamicStyles, useShareCredentials } from '../../hooks';
import { deleteCredential, selectRawCredentialRecords } from '../../store/slices/credential';

export default function HomeScreen({ navigation }: HomeScreenProps): JSX.Element {
  const { styles, theme, mixins } = useDynamicStyles(dynamicStyleSheet);

  const rawCredentialRecords = useSelector(selectRawCredentialRecords);
  const [itemToDelete, setItemToDelete] = useState<CredentialRecordRaw|null>(null);
  const dispatch = useAppDispatch();
  const share = useShareCredentials();

  const itemToDeleteName = itemToDelete?.credential.credentialSubject.hasCredential?.name ?? '';

  function renderItem({ item }: RenderItemProps) {
    const { credential } = item;
    const { issuer } = credential;
    const { title } = credentialRenderInfo(credential);
    const issuerName = (typeof issuer === 'string' ? issuer : issuer?.name) ?? '';
    const onSelect = () => navigation.navigate('CredentialScreen', { rawCredentialRecord: item });
    const issuerImage = typeof issuer === 'string' ? null : issuer.image;

    return (
      <View style={styles.swipeItemOuter}>
        <View>
          <Swipeable
            style={styles.swipeItem}
            leftButtons={[
              <Button
                key="share"
                buttonStyle={[styles.swipeButton, mixins.buttonPrimary]}
                containerStyle={[mixins.buttonIconContainer, styles.noShadow]}
                titleStyle={mixins.buttonIconTitle}
                style={styles.swipeButtonContainer}
                onPress={() => share([item])}
                iconRight
                icon={
                  <MaterialIcons
                    name="share"
                    size={theme.iconSize}
                    color={theme.color.backgroundPrimary}
                  />
                }
              />,
            ]}
            rightButtons={[
              <Button
                key="delete"
                buttonStyle={[styles.swipeButton, mixins.buttonError]}
                containerStyle={[mixins.buttonIconContainer, styles.noShadow]}
                titleStyle={mixins.buttonIconTitle}
                onPress={() => setItemToDelete(item)}
                style={styles.swipeButtonContainer}
                icon={
                  <MaterialIcons
                    name="delete"
                    size={theme.iconSize}
                    color={theme.color.backgroundPrimary}
                  />
                }
              />,
            ]}
          >
            <CredentialItem
              rawCredentialRecord={item}
              showStatusBadges
              title={title}
              subtitle={issuerName}
              image={issuerImage}
              onSelect={onSelect}
              chevron
            />
          </Swipeable>
        </View>
      </View>
    );
  }

  function goToCredentialAdd() {
    if (navigationRef.isReady()) {
      navigationRef.navigate('HomeNavigation', {
        screen: 'AddNavigation',
        params: {
          screen: 'AddScreen',
        },
      });
    }
  }

  function AddCredentialButton(): JSX.Element {
    return (
      <Button
        title="Add Credential"
        buttonStyle={mixins.buttonIcon}
        containerStyle={[mixins.buttonIconContainer, mixins.noFlex]}
        titleStyle={mixins.buttonIconTitle}
        onPress={goToCredentialAdd}
        iconRight
        icon={
          <MaterialIcons
            name="add-circle"
            size={theme.iconSize}
            color={theme.color.iconInactive}
          />
        }
      />
    );
  }

  async function deleteItem() {
    if (itemToDelete === null) return;
    dispatch(deleteCredential(itemToDelete));
    setItemToDelete(null);
    AccessibilityInfo.announceForAccessibility('Credential Deleted');
  }

  return (
    <>
      <NavHeader title="Home" />
      {rawCredentialRecords.length === 0 ? (
        <View style={styles.container}>
          <Text style={styles.header}>Looks like your wallet is empty.</Text>
          <AddCredentialButton />
        </View>
      ) : (
        <FlatList
          contentContainerStyle={mixins.credentialListContainer}
          data={rawCredentialRecords}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${index}-${item._id}`}
          ListHeaderComponent={<AddCredentialButton />}
        />
      )}
      <ConfirmModal
        open={itemToDelete !== null}
        onRequestClose={() => setItemToDelete(null)}
        onConfirm={deleteItem}
        title="Delete Credential"
        confirmText="Delete"
        accessibilityFocusContent
      >
        <Text style={styles.modalBodyText}>
          Are you sure you want to remove {itemToDeleteName} from your wallet?
        </Text>
      </ConfirmModal>
    </>
  );
}

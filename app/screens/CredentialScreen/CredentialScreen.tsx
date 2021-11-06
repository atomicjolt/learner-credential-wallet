import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import { CredentialRecord } from '../../model';
import { VerificationCard } from '../../components';
import { CredentialCard } from '../../components';
import { mixins } from '../../styles';
import { getAllCredentials } from '../../store/slices/wallet';
import { MenuItem, NavHeader, ConfirmModal } from '../../components';
import { useShareCredentials } from '../../hooks';
import { navigationRef } from '../../navigation';

import type { CredentialScreenProps } from './CredentialScreen.d';
import styles from './CredentialScreen.styles';

export default function CredentialScreen({ navigation, route }: CredentialScreenProps): JSX.Element {
  const dispatch = useDispatch();
  const share = useShareCredentials();
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { rawCredentialRecord, noShishKabob = false } = route.params;
  const { credential } = rawCredentialRecord;
  const { credentialSubject } = credential;
  const title = credentialSubject.hasCredential?.name ?? '';

  function onPressShare() {
    setMenuIsOpen(false);
    share([rawCredentialRecord]);
  }

  function onPressDebug() {
    setMenuIsOpen(false);
    if (navigationRef.isReady()) {
      navigationRef.navigate('DebugScreen', { rawCredentialRecord });
    }
  }

  function onPressDelete() {
    setMenuIsOpen(false);
    setModalIsOpen(true);
  }

  function HeaderRightComponent(): JSX.Element | null {
    if (noShishKabob) {
      return null;
    }

    return (
      <MaterialIcons
        name="more-vert"
        style={mixins.headerIcon}
        onPress={() => setMenuIsOpen(!menuIsOpen)}
      />
    );
  }

  return (
    <>
      <NavHeader
        title="Credential Preview"
        goBack={() => navigation.goBack()}
        rightComponent={<HeaderRightComponent />}
      />
      <ConfirmModal
        open={modalIsOpen}
        onRequestClose={() => setModalIsOpen(!modalIsOpen)}
        onConfirm={async () => {
          await CredentialRecord.deleteCredential(rawCredentialRecord);
          dispatch(getAllCredentials());
          navigation.goBack();
        }}
        title="Delete Credential"
        confirmText="Delete"
      >
        <Text style={styles.modalBodyText}>
          Are you sure you want to remove {title} from your wallet?
        </Text>
      </ConfirmModal>
      <View style={styles.outerContainer}>
        {menuIsOpen ? (
          <View style={styles.menuContainer}>
            <MenuItem icon="share" title="Share" onPress={onPressShare} />
            <MenuItem icon="bug-report" title="Debug" onPress={onPressDebug} />
            <MenuItem icon="delete" title="Delete" onPress={onPressDelete} />
          </View>
        ) : null}
        <ScrollView onScrollEndDrag={() => setMenuIsOpen(false)} style={styles.scrollContainer}>
          <TouchableWithoutFeedback onPress={() => setMenuIsOpen(false)}>
            <View style={styles.container}>
              <CredentialCard rawCredentialRecord={rawCredentialRecord} />
              <VerificationCard credential={credential} />
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </View>
    </>
  );
}

import React, { useMemo } from 'react';
import { View, ScrollView } from 'react-native';

import { CredentialCard, VerificationCard } from '../../components';
import { NavHeader } from '../../components';
import type { ApproveCredentialScreenProps } from './ApproveCredentialScreen.d';
import { CredentialRecord } from '../../model';
import dynamicStyleSheet from './ApproveCredentialScreen.styles';
import { useDynamicStyles, usePendingCredential } from '../../hooks';
import { navigationRef } from '../../navigation';

export default function ApproveCredentialScreen({ navigation, route }: ApproveCredentialScreenProps): JSX.Element {
  const { styles } = useDynamicStyles(dynamicStyleSheet);
  const { pendingCredentialId, profileRecordId } = route.params;
  const pendingCredential = usePendingCredential(pendingCredentialId);
  const { credential } = pendingCredential;
  const rawCredentialRecord = useMemo(() => CredentialRecord.rawFrom({ credential, profileRecordId }), [credential]);

  function goToIssuerInfo(issuerId: string) {
    if (navigationRef.isReady()) {
      navigationRef.navigate('HomeNavigation', {
        screen: 'AddCredentialNavigation',
        params: {
          screen: 'IssuerInfoScreen',
          params: { issuerId }
        }
      });
    }
  }

  return (
    <>
      <NavHeader title="Credential Preview" goBack={navigation.goBack} />
      <ScrollView>
        <View style={styles.container}>
          <CredentialCard rawCredentialRecord={rawCredentialRecord} onPressIssuer={goToIssuerInfo} />
          <VerificationCard rawCredentialRecord={rawCredentialRecord} isButton />
        </View>
      </ScrollView>
    </>
  );
}

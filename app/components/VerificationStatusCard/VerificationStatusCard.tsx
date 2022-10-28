import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';

import { VerificationStatusCardProps, StatusItemProps } from './VerificationStatusCard.d';
import dynamicStyleSheet from './VerificationStatusCard.styles';
import { useDynamicStyles } from '../../hooks';
import { resolveIssuerRegistriesFor } from '../../lib/issuer';
import { BulletList } from '../../components';

const DATE_FORMAT = 'MMM D, YYYY';

enum LogId {
  ValidSignature = 'valid_signature',
  Expiration = 'expiration',
  IssuerDIDResolves = 'issuer_did_resolves',
  RevocationStatus = 'revocation_status'
}

export default function VerificationStatusCard({ credential, verifyPayload }: VerificationStatusCardProps): JSX.Element {
  const { styles } = useDynamicStyles(dynamicStyleSheet);
  const { expirationDate, issuer } = credential;

  const issuerId = typeof issuer === 'string' ? null : issuer?.id;
  const registryList = useMemo(() => issuerId ? resolveIssuerRegistriesFor(issuerId).map(({ name }) => name) : null, [issuerId]);

  const details = verifyPayload.result.log?.reduce<Record<string, boolean>>((acc, log) => {
    acc[log.id] = log.valid;
    return acc;
  }, {}) || {};

  const hasExpirationDate = expirationDate !== undefined;
  const expirationDateFmt = moment(expirationDate).format(DATE_FORMAT);
  const isExpired = moment() >= moment(expirationDate);

  const expirationText = hasExpirationDate
    ? isExpired
      ? `(expired on ${expirationDateFmt})`
      : `(expires on ${expirationDateFmt})`
    : '';

  if (verifyPayload.error) {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Verification error:</Text>
        <Text style={styles.bodyText}>
          {verifyPayload.error}
        </Text>
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.headerText}>Issuer</Text>
        <StatusItem
          positiveText="Is an institution registered in:"
          negativeText="Is not a registered institution"
          verified={details[LogId.IssuerDIDResolves]}
        >
          {registryList && <BulletList items={registryList} />}
        </StatusItem>
      </View>
      <View style={styles.container}>
        <Text style={styles.headerText}>Credential</Text>
        <StatusItem
          positiveText="Has a valid digital signature"
          negativeText="Has an invalid digital signature"
          verified={details[LogId.ValidSignature]}
        />
        <StatusItem
          positiveText={`Has not expired ${expirationText}`}
          negativeText={`Has expired ${expirationText}`}
          verified={details[LogId.Expiration]}
        />
        <StatusItem
          positiveText="Has not been revoked by issuer"
          negativeText="Has been revoked by issuer"
          verified={details[LogId.RevocationStatus]}
        />
      </View>
    </>
  );
}

function StatusItem({ positiveText, negativeText, verified = true, children }: StatusItemProps) {
  const { theme, styles } = useDynamicStyles(dynamicStyleSheet);

  return (
    <View style={styles.statusItem}>
      <MaterialIcons
        name={verified ? 'check' : 'close'}
        size={theme.iconSize}
        color={verified ? theme.color.success : theme.color.error}
        accessibilityLabel={verified ?  'Verified, Icon' : 'Not Verified, Icon'}
      />
      <View style={styles.statusItemContent}>
        <Text style={styles.statusItemLabel}>{verified ? positiveText : negativeText}</Text>
        {verified && <View>{children}</View>}
      </View>
    </View>
  );
}

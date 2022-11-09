import React from 'react';
import { credentialDisplayConfigFor } from '../../lib/credentialDisplay';
import { CredentialCardProps } from './CredentialCard.d';

export default function CredentialCard(props: CredentialCardProps): JSX.Element {
  const { credential } = props.rawCredentialRecord;
  const DisplayComponent = credentialDisplayConfigFor(credential).cardComponent;

  return <DisplayComponent {...props} />;
}

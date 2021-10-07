import Share from 'react-native-share';
import * as RNFS from 'react-native-fs';
import uuid from 'react-native-uuid';
import vc from '@digitalcredentials/vc';
import { Ed25519VerificationKey2020 } from '@digitalcredentials/ed25519-verification-key-2020';
import { Ed25519Signature2020 } from '@digitalcredentials/ed25519-signature-2020';

import type { VerifiablePresentation } from '../types/presentation';
import type { CredentialRecordRaw } from '../model/credential';
import type { DidRecordRaw } from '../model/did';
import type { Credential } from '../types/credential';

import { securityLoader } from './documentLoader';

const documentLoader = securityLoader().build();

/**
 * This method wraps the create & sign presentation flow and and allows a 
 * challenge to be specified. If the challenge paramater is not included, 
 * a UUID will be generated and used in it's place.
 */
export async function createVerifiablePresentation(
  credentials: Credential[] = [],
  didRecord: DidRecordRaw,
  challenge = uuid.v4(),
): Promise<VerifiablePresentation> {
  const verificationKeyPair = await Ed25519VerificationKey2020.from(didRecord.verificationKey);
  const suite = new Ed25519Signature2020({ key: verificationKeyPair });

  const presentation = vc.createPresentation({ verifiableCredential: credentials });

  const verifiablePresentation: VerifiablePresentation = await vc.signPresentation({
    presentation,
    suite,
    challenge,
    documentLoader,
  });

  return verifiablePresentation;
}

export async function sharePresentation(rawCredentialRecords: CredentialRecordRaw[], didRecord: DidRecordRaw): Promise<void> {
  const plurality = rawCredentialRecords.length > 1 ? 's' : '';
  const filePath = `${RNFS.DocumentDirectoryPath}/Shared Credential${plurality}.json`;
  const credentials = rawCredentialRecords.map(({ credential }) => credential);

  const verifiablePresentation = await createVerifiablePresentation(credentials, didRecord);

  if (await RNFS.exists(filePath)) {
    await RNFS.unlink(filePath);
  }
  await RNFS.writeFile(filePath, JSON.stringify(verifiablePresentation), 'utf8');

  Share.open({
    title: `Share Credential${plurality}`,
    url: `file://${filePath}`,
    type: 'text/plain',
    subject: `Share Credential${plurality}`,
  });
}

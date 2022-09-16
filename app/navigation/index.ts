// Navigation Components
export { default as RootNavigation } from './RootNavigation/RootNavigation';
export { default as AddCredentialNavigation } from './AddCredentialNavigation/AddCredentialNavigation';
export { default as AppNavigation } from './AppNavigation/AppNavigation';
export { default as CredentialNavigation } from './CredentialNavigation/CredentialNavigation';
export { default as HomeNavigation } from './HomeNavigation/HomeNavigation';
export { default as SettingsNavigation } from './SettingsNavigation/SettingsNavigation';
export { default as SetupNavigation } from './SetupNavigation/SetupNavigation';
export { default as ShareNavigation } from './ShareNavigation/ShareNavigation';

// Type Definitions
export * from './RootNavigation/RootNavigation.d';
export * from './HomeNavigation/HomeNavigation.d';
export * from './SettingsNavigation/SettingsNavigation.d';
export * from './SetupNavigation/SetupNavigation.d';
export * from './AddCredentialNavigation/AddCredentialNavigation.d';
export * from './CredentialNavigation/CredentialNavigation.d';
export * from './ShareNavigation/ShareNavigation.d';

export { navigationRef } from './AppNavigation/AppNavigation';

/**
 * If screens are re-used, we need to make union types for their
 * props
 */
import { CredentialScreenHomeProps } from './CredentialNavigation/CredentialNavigation.d';
import { CredentialScreenShareProps } from './ShareNavigation/ShareNavigation.d';
export type CredentialScreenProps = CredentialScreenHomeProps | CredentialScreenShareProps;

import { DetailsScreenSettingsProps } from './SettingsNavigation/SettingsNavigation.d';
import { DetailsScreenSetupProps } from './SetupNavigation/SetupNavigation.d';
export type DetailsScreenProps = DetailsScreenSettingsProps | DetailsScreenSetupProps;

import { QRScreenCredentialProps } from './AddCredentialNavigation/AddCredentialNavigation.d';
import { QRScreenProfileProps } from './SettingsNavigation/SettingsNavigation.d';
export type QRScreenProps = QRScreenCredentialProps | QRScreenProfileProps;

import { PublicLinkScreenCredentialProps } from './CredentialNavigation/CredentialNavigation.d';
import { PublicLinkScreenShareProps } from './ShareNavigation/ShareNavigation.d';
export type PublicLinkScreenProps = PublicLinkScreenCredentialProps | PublicLinkScreenShareProps;

import { IssuerInfoScreenCredentialProps } from './CredentialNavigation/CredentialNavigation.d';
import { IssuerInfoScreenAddProps } from './AddCredentialNavigation/AddCredentialNavigation.d';
export type IssuerInfoScreenProps = IssuerInfoScreenCredentialProps | IssuerInfoScreenAddProps;

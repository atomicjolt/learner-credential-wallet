import type { NavigatorScreenParams } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import type { CredentialRecordRaw } from '../../model/credential';
import type { VerifyPayload } from '../../hooks';
import type { HomeNavigationParamList } from '../';

export type RootNavigationParamsList = {
  HomeNavigation: NavigatorScreenParams<HomeNavigationParamList>;
  DebugScreen: {
    rawCredentialRecord: CredentialRecordRaw;
  };
  VerificationStatusScreen: {
    verifyPayload: VerifyPayload;
  };
};

export type HomeNavigationProps = StackScreenProps<RootNavigationParamsList, 'HomeNavigation'>
export type DebugScreenProps = StackScreenProps<RootNavigationParamsList, 'DebugScreen'>
export type VerificationStatusScreenProps = StackScreenProps<RootNavigationParamsList, 'VerificationStatusScreen'>

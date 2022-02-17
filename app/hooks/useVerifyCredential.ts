import { useState, useCallback, useEffect } from 'react';

import { verifyCredential } from '../lib/validate';
import { Credential, CredentialError } from '../types/credential';

export type VerifyPayload = {
  loading: boolean;
  verified: boolean | null;
  error: string | null;
}

// Adapted from https://usehooks.com/useAsync/
export function useVerifyCredential(credential?: Credential): VerifyPayload | null {
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (credential === undefined) {
    return null;
  }

  const verify = useCallback(async () => {
    try {
      setVerified(await verifyCredential(credential));
    } catch (err) {
      if (Object.values(CredentialError).includes(err.message)) {
        setError(err.message);
      } else {
        setError('An error was encountered while verifying this credential.');
      }
    } finally {
      setLoading(false);
    }
  }, [setLoading, setVerified]);

  useEffect(() => {
    verify();
  }, [verify]);

  return { loading, verified, error };
}

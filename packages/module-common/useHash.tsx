'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export const useHash = (stripHash = false): string => {
  const router = useRouter();
  const [hash, setHash] = useState<string>('');

  useEffect(() => {
    const updateHash = () => {
      const fullHash = window.location.hash || '';
      setHash(stripHash ? fullHash.replace(/^#/, '') : fullHash);
    };

    updateHash();

    window.addEventListener('hashchange', updateHash);
    router.events?.on?.('routeChangeComplete', updateHash);

    return () => {
      window.removeEventListener('hashchange', updateHash);
      router.events?.off?.('routeChangeComplete', updateHash);
    };
  }, [router, stripHash]);

  return hash;
};

export const removeUrlHash = (router: ReturnType<typeof useRouter>) => {
  if (typeof window !== 'undefined' && window.location.hash) {
    router.replace(
      window.location.pathname + window.location.search,
      undefined,
      {
        shallow: true,
      }
    );
  }
};

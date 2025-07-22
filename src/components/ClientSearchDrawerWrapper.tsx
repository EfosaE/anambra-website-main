'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const GlobalSearchDrawer = dynamic(() => import('./GlobalSearchDrawer'), {
  ssr: false,
});

export default function ClientSearchDrawerWrapper() {
  return (
    <Suspense fallback={null}>
      <GlobalSearchDrawer />
    </Suspense>
  );
}

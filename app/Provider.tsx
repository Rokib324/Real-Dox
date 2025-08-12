'use client';

import React, { useEffect, useState } from 'react'

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div>Loading...</div>;
  }

  // Dynamically import Liveblocks components only on client side
  const LiveblocksProvider = React.lazy(() => import('@liveblocks/react').then(mod => ({ default: mod.LiveblocksProvider })));
  const ClientSideSuspense = React.lazy(() => import('@liveblocks/react').then(mod => ({ default: mod.ClientSideSuspense })));

  return (
    <React.Suspense fallback={<div>Loading Liveblocks...</div>}>
      <LiveblocksProvider authEndpoint={"/api/liveblocks-auth"}>
        <ClientSideSuspense fallback={<div>Loading...</div>}>
          {children}
        </ClientSideSuspense>
      </LiveblocksProvider>
    </React.Suspense>
  )
}

export default Provider
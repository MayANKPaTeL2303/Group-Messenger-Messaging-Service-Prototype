'use client';

import { SessionProvider } from 'next-auth/react';

// AuthProvider component to wrap children with SessionProvider
export default function AuthProvider({ children }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}

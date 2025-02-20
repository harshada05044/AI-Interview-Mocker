// app/page.js
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the sign-in page
    router.replace('/sign-in');
  }, [router]);

  return null; // Render nothing as the user is being redirected
}

import { Inter } from 'next/font/google';
import Link from 'next/link';
import React from 'react';
import { signIn, useSession } from 'next-auth/react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { HomeCategories, Slider, SpecialOffer } from '@/features/catalog';
const inter = Inter({ subsets: ['latin'] });

function HomePage() {
  const { data: session } = useSession();
  React.useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      signIn();
    }
  }, [session]);

  return (
    <main
      className={`flex min-h-screen flex-col bg-white items-center ${inter.className} text-black`}
    >
      <Hero />
      <HomeCategories />
      {/* <Slider /> */}
      <SpecialOffer />
    </main>
  );
}
export default HomePage;


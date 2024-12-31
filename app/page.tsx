'use client';
import React, { useEffect, useState } from 'react';
import { Footer, Header, Loading } from './components';
import Hero from './components/Homepage/Hero';
import About from './components/Homepage/About';
import Features from './components/Homepage/Features';
import MembershipCount from './components/Homepage/MembershipCount';
import SharedMap from './components/Homepage/SharedMap';
import What from './components/Homepage/What';
import Partners from './components/Homepage/Partners';
import Newsletter from './components/Homepage/Newsletter';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import FeatureAnnouncementModal from './components/FeatureAnnouncementModal';
import { useDataStore } from './stores/dataStore';

interface StateData {
  state: string;
  total: number;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const { fetchStats } = useDataStore();
  const [mapData, setMapData] = useState<StateData[]>([]);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setIsLoading(true);
        const response = await fetchStats();
        if (response.success && response.data.resources.states) {
          setMapData(response.data.resources.states);
        } else {
          console.error('Failed to fetch data:', response.message);
        }
      } catch (error) {
        console.error('Error fetching statistics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatistics();
  }, [fetchStats]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <FeatureAnnouncementModal />
      <section className="relative text-primary">
        <Header />
        <Hero data={mapData} />
        <About />
        <Features />
        <MembershipCount />
        <SharedMap />
        <What />
        <Partners />
        <Newsletter />
        <Footer />

        <div className="socials w-16 fixed right-0 top-[40%] bg-primary/50 hover:bg-primary text-white flex flex-col items-center text-xl transition">
          <Link
            href="https://www.facebook.com/sdssnigeria?mibextid=ZbWKwL"
            target="_blank"
            className="h-16 w-16 flex items-center justify-center hover:bg-white hover:text-primary transition"
          >
            <FaFacebookF />
          </Link>
          <Link
            href="https://www.linkedin.com/company/spatial-and-data-science-society/"
            target="_blank"
            className="h-16 w-16 flex items-center justify-center hover:bg-white hover:text-primary transition"
          >
            <FaLinkedinIn />
          </Link>
          <Link
            href="https://x.com/sdss_nigeria"
            target="_blank"
            className="h-16 w-16 flex items-center justify-center hover:bg-white hover:text-primary transition"
          >
            <FaXTwitter />
          </Link>
          <Link
            href="https://www.instagram.com/sdss_nigeria?igsh=MWU3bWgyNG41eGQw"
            target="_blank"
            className="h-16 w-16 flex items-center justify-center hover:bg-white hover:text-primary transition"
          >
            <FaInstagram />
          </Link>
        </div>
      </section>
    </>
  );
}

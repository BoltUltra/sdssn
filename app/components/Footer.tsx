import { logo, logoWhite } from '@/public/images';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <section className="section-container space-y-10">
        <div className="grid md:grid-cols-5 md:gap-0 gap-10">
          <div className="space-y-5 col-span-2">
            <Link href="/">
              <Image src={logoWhite} alt="logo" className="md:w-32 w-52" />
            </Link>
            <p className="pr-20">
              Spatial Data Science Society Of Nigeria (SDSSN) is a
              collaborative, practical and interactive platform, which
              demonstrates collective and shared vision of the Goespatial and
              data science communities.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="font-bold">Resources</h3>
            <div className="space-y-2 flex flex-col">
              <Link href="/articles">Blogs</Link>
              <Link href="/faq">FAQs</Link>
              <Link href="/community-guideline">Community Guidelines</Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-bold">Socials</h3>
            <div className="space-y-2 flex flex-col">
              <Link
                href="https://www.facebook.com/sdssnigeria?mibextid=ZbWKwL"
                target="_blank"
                className="hover:underline underline-offset-4"
              >
                Facebook
              </Link>
              <Link
                href="https://www.linkedin.com/company/spatial-and-data-science-society/"
                target="_blank"
                className="hover:underline underline-offset-4"
              >
                LinkedIn
              </Link>
              <Link
                href="https://www.instagram.com/sdss_nigeria?igsh=MWU3bWgyNG41eGQw"
                target="_blank"
                className="hover:underline underline-offset-4"
              >
                Instagram
              </Link>
              <Link
                href="https://x.com/sdss_nigeria"
                target="_blank"
                className="hover:underline underline-offset-4"
              >
                X (Twitter)
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-bold">Legal</h3>
            <div className="space-y-2 flex flex-col">
              <Link href="/terms">Terms of Service</Link>
            </div>
          </div>
        </div>
        <hr />
        <div className="text-center">
          <p>2024 - SDSSN | &copy; All rights reserved</p>
        </div>
      </section>
    </footer>
  );
};

export default Footer;

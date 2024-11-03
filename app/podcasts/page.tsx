"use client";
import React, { Suspense } from "react";
import { Footer, Header, Loading } from "../components";
import PodcastHero from "../components/Podcasts/PodcastHero";
import PodcastList from "../components/Podcasts/PodcastList";

export default function Podcasts() {
  return (
    <>
      <Header />
      <section className="pt-44 pb-20 bg-background">
        <div className="section-container">
          <PodcastHero />
          <Suspense fallback={<Loading />}>
            <PodcastList />
          </Suspense>
        </div>
      </section>
      <Footer />
    </>
  );
}

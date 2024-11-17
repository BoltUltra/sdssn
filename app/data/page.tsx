'use client';
import React, { Suspense, useEffect, useState } from 'react';
import { Footer, Header, Loading } from '../components';
import { useDataStore } from '../stores/dataStore';
import DataHero from '../components/Data/DataHero';
import DataList from '../components/Data/DataList';

export default function Articles() {
  const [maps, setMaps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { fetchAllPosts } = useDataStore();

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await fetchAllPosts();
      const mapPost = response.data
        .filter((post) => post.category === 'map')
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      console.log('Response', response);
      console.log('User maps:', mapPost);
      setMaps(mapPost);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Header />
      <section className="md:pt-44 pt-20 pb-20 bg-background">
        <div className="section-container">
          <DataHero maps={maps} />
          <Suspense fallback={<Loading />}>
            <DataList maps={maps} />
          </Suspense>
        </div>
      </section>
      <Footer />
    </>
  );
}

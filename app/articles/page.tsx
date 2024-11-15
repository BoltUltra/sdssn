'use client';
import React, { Suspense, useEffect, useState } from 'react';
import { Footer, Header, Loading } from '../components';
import { useDataStore } from '../stores/dataStore';
import { useRouter } from 'next/navigation';
import ArticlesHero from '../components/Articles/ArticlesHero';
import ArticlesList from '../components/Articles/ArticlesList';

export default function Articles() {
  const router = useRouter();
  const [articles, setArticles] = useState([]);
  const { fetchAllPosts } = useDataStore();

  const fetchArticles = async () => {
    try {
      const response = await fetchAllPosts();
      console.log('response:', response);
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };
  useEffect(() => {
    fetchArticles();
  }, []);
  return (
    <>
      <Header />
      <section className="md:pt-44 pt-20 pb-20 bg-background">
        <div className="section-container">
          <ArticlesHero articles={articles} />
          <Suspense fallback={<Loading />}>
            <ArticlesList articles={articles} />
          </Suspense>
        </div>
      </section>
      <Footer />
    </>
  );
}

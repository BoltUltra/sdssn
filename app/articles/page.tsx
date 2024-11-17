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
  const [isLoading, setIsLoading] = useState(true);
  const { fetchAllPosts } = useDataStore();

  const fetchArticles = async () => {
    setIsLoading(true);

    try {
      const response = await fetchAllPosts();
      const allArticles = response.data
        .filter((post) => post.category === 'discussion')
        // Sort by createdAt date in descending order (newest first)
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      setArticles(allArticles);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setIsLoading(false);
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

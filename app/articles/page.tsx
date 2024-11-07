'use client';
import React, { Suspense, useEffect, useState } from 'react';
import { Footer, Header, Loading } from '../components';
import PodcastHero from '../components/Podcasts/PodcastHero';
import PodcastList from '../components/Podcasts/PodcastList';
import { useDataStore } from '../stores/dataStore';
import { useRouter } from 'next/navigation';
import ArticlesHero from '../components/Articles/ArticlesHero';
import ArticlesList from '../components/Articles/ArticlesList';

export default function Articles() {
  const router = useRouter();
  const [articles, setArticles] = useState([]);
  const { fetchAllPosts } = useDataStore();

  const goToUpload = () => {
    router.push('/dashboard/projects?tab=upload');
  };
  const fetchArticles = async () => {
    try {
      const response = await fetchAllPosts();
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
      <section className="pt-44 pb-20 bg-background">
        <div className="section-container">
          <ArticlesHero articles={articles} />
          <Suspense fallback={<Loading />}>
            <ArticlesList />
          </Suspense>
        </div>
      </section>
      <Footer />
    </>
  );
}

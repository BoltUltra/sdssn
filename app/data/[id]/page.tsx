'use client';
import React, { useEffect, useState } from 'react';
import { Footer, Header, Loading } from '../../components';
import { useDataStore } from '../../stores/dataStore';
import { useRouter, useParams } from 'next/navigation';
import { formatDate, sanitizeHTML } from '@/app/helpers';
import Image from 'next/image';
import Link from 'next/link';
import { FaComment, FaFacebook, FaRegEye } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { RiMailSendFill } from 'react-icons/ri';
import { AiFillLike } from 'react-icons/ai';
import { CiShare2 } from 'react-icons/ci';
import toast, { Toaster } from 'react-hot-toast';
import { IoReturnDownBack } from 'react-icons/io5';
import { GiPadlock } from 'react-icons/gi';
import ShareModal from '@/app/components/ShareModal';

export default function ArticleDetails() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const {
    fetchSingleArticle,
    fetchProjectComments,
    addComment,
    likePost,
    sharePost,
  } = useDataStore();
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    content: '',
  });

  // const user = localStorage.getItem('isAuthenticated');

  const fetchArticleDetails = async (id: string) => {
    try {
      const response = await fetchSingleArticle(id);
      console.log('Fetched article:', response.data);
      setArticle(response.data);
    } catch (error) {
      console.error('Error fetching article:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async (id: string) => {
    try {
      const response = await fetchProjectComments(id);
      console.log('Fetched comments:', response.data);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching article:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    setIsLoading(true);
    try {
      await addComment(id, formData);
      fetchComments(id);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setFormData({ content: '' });
      setIsLoading(false);
    }
  };

  const likeArticle = async () => {
    try {
      await likePost(id);
      fetchArticleDetails(id);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };
  const shareArticle = async () => {
    try {
      await sharePost(id);
      fetchArticleDetails(id);
    } catch (error) {
      console.error('Error sharing post:', error);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedAuth = JSON.parse(
        localStorage.getItem('isAuthenticated') || 'false'
      );
      setUser(storedAuth);
    }

    fetchArticleDetails(id);
    fetchComments(id);
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!article) {
    return <p className="text-center">Article not found</p>;
  }

  return (
    <>
      <Toaster />
      <Header />
      <section className="md:pt-44 pt-20 pb-20 bg-background">
        <div className="section-container">
          <div className="md:w-[70%] mx-auto relative">
            <div className="absolute -top-20">
              <Link
                href="/data"
                className="text-primary flex items-center space-x-1"
              >
                <IoReturnDownBack />
                <span>go back</span>
              </Link>
            </div>
            <div className="text-center mb-10">
              <h1 className="md:text-[3.5rem] md:leading-none md:px-20 mb-4 uppercase">
                {article?.title}
              </h1>
              <div className="space-y-3 mt-3">
                <p className="hover:underline underline-offset-4">
                  <Link
                    href={`/user/${article?.user?.name}`}
                  >{`By ${article?.user?.first_name} ${article?.user?.last_name}`}</Link>
                </p>{' '}
                <p className="text-sm text-gray-500">
                  {formatDate(article?.created_at)}
                </p>
                <div className="flex space-x-5 justify-center">
                  <Link href={article?.user?.socials?.faceboo || ''}>
                    <FaFacebook />
                  </Link>
                  <Link href={article?.user?.socials?.facebook || ''}>
                    <FaSquareXTwitter />
                  </Link>
                  <Link href={`mailto:${article?.user?.email}`}>
                    <RiMailSendFill />
                  </Link>
                </div>
              </div>
            </div>
            <div>
              <Image
                src={article?.banner?.url}
                alt="Article image"
                width={600}
                height={500}
                className="w-full h-[500px] object-cover"
              />

              <div className="mt-6">{article?.content}</div>
              <div
                dangerouslySetInnerHTML={sanitizeHTML(article?.description)}
                className="article-description space-y-5 text-justify mb-10"
              ></div>
            </div>
            <hr />

            <div className="flex space-x-5 justify-end mt-5">
              <button
                disabled={!user}
                onClick={likeArticle}
                className="flex items-center space-x-2 disabled:bg-transparent"
              >
                <AiFillLike size={20} /> <span>{article?.likes}</span>
              </button>
              <button
                disabled={!user}
                className="flex items-center space-x-2 disabled:bg-transparent"
              >
                <FaComment size={20} /> <span>{comments?.length}</span>
              </button>
              <button
                className="flex items-center space-x-2"
                onClick={() => setIsShareModalOpen(true)}
              >
                <CiShare2 size={20} /> <span>{article?.shares}</span>
              </button>
              <button className="flex items-center space-x-2">
                <FaRegEye size={20} /> <span>{`${article?.views} views`}</span>
              </button>
            </div>

            <div className="mt-10">
              {user ? (
                <>
                  <div className="border-2 w-full border-primary">
                    <textarea
                      name="content" // Changed from "comment" to match formData structure
                      id="comment"
                      rows={5}
                      className="border-none outline-none block w-full bg-transparent p-3"
                      onChange={handleChange}
                      placeholder="Write a comment..."
                      value={formData.content}
                    ></textarea>
                  </div>
                  <div className="flex items-center justify-end mt-5">
                    <button
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="text-sm bg-primary text-white flex items-center justify-center md:w-[20%] w-[40%] py-3"
                    >
                      {isLoading ? (
                        <div className="loader"></div>
                      ) : (
                        'Post Comment'
                      )}
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center mt-5 bg-primary text-white flex flex-col items-center py-10 rounded-xl space-y-5">
                  <div>
                    <GiPadlock size={60} />
                  </div>
                  <Link href="/login">
                    <span className="font-semibold underline">Login</span> to
                    post a comment
                  </Link>
                </div>
              )}
              <h3 className="text-2xl mt-10">Comments</h3>
              <div className="mt-5">
                {comments.length === 0 && <p>No comments yet</p>}
                {comments.map((comment) => (
                  <div key={comment?.id} className="flex space-x-3 mb-5">
                    <div className="w-10 h-10 rounded-full bg-gray-300">
                      <Image
                        src={`https://api.dicebear.com/9.x/identicon/svg?seed=${comment?.user?.name}`}
                        height={40}
                        width={40}
                        className="rounded-full border-4 border-white mx-auto"
                        alt="user-image"
                        unoptimized
                      />
                    </div>
                    <div>
                      <p className="font-semibold">
                        {`${comment?.user?.first_name} ${comment?.user?.last_name}`}
                      </p>
                      <p>{comment?.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => {
          shareArticle(), setIsShareModalOpen(false);
        }}
        url={typeof window !== 'undefined' ? window.location.href : ''}
        title={article?.title || ''}
      />
    </>
  );
}

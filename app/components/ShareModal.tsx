// components/ShareModal.tsx
import { useState } from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
  FaTelegramPlane,
  FaPinterestP,
  FaRedditAlien,
} from 'react-icons/fa';
import { MdContentCopy, MdCheck } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
}

export default function ShareModal({
  isOpen,
  onClose,
  url,
  title,
}: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const shareLinks = [
    {
      name: 'Facebook',
      icon: <FaFacebookF size={20} />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      color: '#3b5998',
    },
    {
      name: 'Twitter',
      icon: <FaTwitter size={20} />,
      url: `https://twitter.com/intent/tweet?text=${title}&url=${url}`,
      color: '#1DA1F2',
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedinIn size={20} />,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`,
      color: '#0077b5',
    },
    {
      name: 'WhatsApp',
      icon: <FaWhatsapp size={20} />,
      url: `https://api.whatsapp.com/send?text=${title} ${url}`,
      color: '#25D366',
    },
    {
      name: 'Telegram',
      icon: <FaTelegramPlane size={20} />,
      url: `https://t.me/share/url?url=${url}&text=${title}`,
      color: '#0088cc',
    },
    {
      name: 'Pinterest',
      icon: <FaPinterestP size={20} />,
      url: `https://pinterest.com/pin/create/button/?url=${url}&description=${title}`,
      color: '#E60023',
    },
    {
      name: 'Reddit',
      icon: <FaRedditAlien size={20} />,
      url: `https://reddit.com/submit?url=${url}&title=${title}`,
      color: '#FF4500',
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Share this article</h3>
          <button onClick={onClose} className="p-1">
            <IoClose size={24} />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          {shareLinks.map((platform) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2"
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: platform.color }}
              >
                {platform.icon}
              </div>
              <span className="text-xs text-center">{platform.name}</span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 bg-gray-100 p-3 rounded">
          <input
            type="text"
            value={url}
            readOnly
            className="bg-transparent flex-1 text-sm outline-none"
          />
          <button
            onClick={copyToClipboard}
            className="p-2 bg-primary text-white rounded"
          >
            {copied ? <MdCheck size={20} /> : <MdContentCopy size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
}

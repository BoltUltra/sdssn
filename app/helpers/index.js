import DOMPurify from 'dompurify';

export const truncateText = (html, maxLength) => {
  const plainText = html.replace(/<\/?[^>]+(>|$)/g, ''); // Strip HTML tags
  return plainText.length > maxLength
    ? plainText.substring(0, maxLength) + '...'
    : plainText;
};

export const formatDate = (dateString) => {
  if (!dateString) return 'Unknown';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
};

export const sanitizeHTML = (html) => {
  return { __html: DOMPurify.sanitize(html) };
};

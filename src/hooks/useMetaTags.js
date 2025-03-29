import { useEffect } from 'react';

const useMetaTags = ({ title, description, image }) => {
  useEffect(() => {
    // Update title
    document.title = title;

    // Update meta tags
    const metaTags = {
      description: description,
      'og:title': title,
      'og:description': description,
      'og:image': image,
    };

    Object.entries(metaTags).forEach(([name, content]) => {
      let tag = document.querySelector(`meta[name="${name}"]`) || 
                document.querySelector(`meta[property="${name}"]`);
      
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(name.startsWith('og:') ? 'property' : 'name', name);
        document.head.appendChild(tag);
      }
      
      tag.setAttribute('content', content);
    });
  }, [title, description, image]);
};

export default useMetaTags;
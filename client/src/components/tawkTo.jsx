import { useEffect } from 'react';

const TawkToWidget = () => {
  useEffect(() => {
    if (!document.getElementById('tawk-script')) {
      const s1 = document.createElement('script');
      s1.id = 'tawk-script';
      s1.async = true;
      s1.src = 'https://embed.tawk.to/684e8189603cf9190a79a856/1itpak0ne';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');

      const s0 = document.getElementsByTagName('script')[0];
      s0.parentNode.insertBefore(s1, s0);
    }
  }, []);

  return null;
};

export default TawkToWidget;

import React, { useEffect } from 'react';

const TawkTo = () => {
  useEffect(() => {
    var Tawk_API = window.Tawk_API || {};
    var Tawk_LoadStart = new Date();

    if (!document.getElementById('tawk-script')) {
      var s1 = document.createElement('script');
      s1.id = 'tawk-script';
      s1.async = true;
      s1.src = 'https://embed.tawk.to/684e31c99a4b03190ad925c5/1iton4uuk';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');

      var s0 = document.getElementsByTagName('script')[0];
      s0.parentNode.insertBefore(s1, s0);
    }
  }, []);

  return null; // אין צורך להחזיר JSX כי הסקריפט נטען במציאות DOM
};

export default TawkTo;

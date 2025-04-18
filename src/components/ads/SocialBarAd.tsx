import { useEffect, useRef } from 'react';

export default function SocialBarAd(): JSX.Element {
  const socialBar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (socialBar.current && !socialBar.current.firstChild) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = '//pl26414651.profitableratecpm.com/f7/23/b5/f723b55ae002a39dd0622610d3c8bfb0.js';
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      socialBar.current.appendChild(script);
    }
  }, [socialBar]);

  return <div ref={socialBar}></div>;
}
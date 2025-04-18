import { useEffect, useRef } from 'react';

export default function NativeBannerAd(): JSX.Element {
  const nativeBanner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (nativeBanner.current && !nativeBanner.current.firstChild) {
      const container = document.createElement('div');
      container.id = 'container-1b4afdeb4302d1360af3e1f3b5317e1b';
      
      const script = document.createElement('script');
      script.src = '//pl26414544.profitableratecpm.com/1b4afdeb4302d1360af3e1f3b5317e1b/invoke.js';
      script.async = true;
      script.setAttribute('data-cfasync', 'false');

      nativeBanner.current.appendChild(container);
      nativeBanner.current.appendChild(script);
    }
  }, [nativeBanner]);

  return <div className="mx-2 my-5" ref={nativeBanner}></div>;
}
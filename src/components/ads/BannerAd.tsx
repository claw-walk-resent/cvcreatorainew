import { useEffect, useRef } from 'react';

export default function BannerAd(): JSX.Element {
  const banner = useRef<HTMLDivElement>(null);

  const atOptions = {
    'key': 'f84fadd3bf4cf6f80715c729406abefb',
    'format': 'iframe',
    'height': 60,
    'width': 468,
    'params': {}
  };

  useEffect(() => {
    if (banner.current && !banner.current.firstChild) {
      const conf = document.createElement('script');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `//www.highperformanceformat.com/${atOptions.key}/invoke.js`;
      script.setAttribute('data-cfasync', 'false');
      conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`;

      banner.current.appendChild(conf);
      banner.current.appendChild(script);
    }
  }, [banner]);

  return <div className="mx-2 my-5 flex justify-center" ref={banner}></div>;
}
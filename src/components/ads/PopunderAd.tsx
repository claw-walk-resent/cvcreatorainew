import { useEffect, useRef } from 'react';

export default function PopunderAd(): JSX.Element {
  const popunder = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (popunder.current && !popunder.current.firstChild) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = '//pl26414119.profitableratecpm.com/c0/97/25/c0972568e18612d5d32a261b5ae3ab5e.js';
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      popunder.current.appendChild(script);
    }
  }, [popunder]);

  return <div ref={popunder}></div>;
}
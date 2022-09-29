import type { NextPage } from 'next'
import Script from 'next/script';
import { useRouter } from 'next/router';

const g: any = global || {};

const Route: NextPage = ( { config }: any ): any => {
  if (global.window) {
    
  }
  
  const Router = useRouter();
  
  var urlEnc = config.config[config.proxy].encodeUrl;
  
  return (
    <>
      <Script id="script-route">
        {`
          (async function() {
            if ('serviceWorker' in navigator) {
            
              var xor = {key: 2};
              var enc = (e) => ${urlEnc.toString()}(e).replace(new RegExp("\\/$", "g"), '');

              async function init() {if (window.openFrame) await window.openFrame("${config.config[config.proxy].prefix}"+enc(new self.URLSearchParams(location.search).get('query')).replace(/\\/$/g, ''), true);document.querySelector('iframe').removeEventListener('load', init)};
              await init();
            }
          })();
        `}
      </Script>
    </>
  );
}

/*Route.getInitialProps = (load) => {
  console.log(load)
  return load
}*/

export default Route;
import { UserProvider } from "@auth0/nextjs-auth0";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect } from "react";

import { GA_TRACKING_ID, GOOGLE_SITE_VERIFICATION_CODE } from "../lib/env";
import * as gtag from "../lib/gtag";
import "../styles/globals.css";
import theme from "../theme";

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <title>Paredes de Coura Fan Weekend</title>
        <meta name="description" content="Paredes de Coura Fan Weekend" />
        <meta name="keywords" content="paredes, coura, fan, weekend" />
        <meta name="author" content="Comunidade 0937" />
        <meta name="google-site-verification" content={GOOGLE_SITE_VERIFICATION_CODE} />
        <link rel="icon" href="/favicon.gif" />
      </Head>
      <UserProvider>
        <ChakraProvider resetCSS theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </UserProvider>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${GA_TRACKING_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}

export default App;

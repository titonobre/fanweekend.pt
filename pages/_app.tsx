import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Head from "next/head";

import "../styles/globals.css";
import theme from "../theme";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Paredes de Coura Fan Weekend</title>
        <meta name="description" content="Paredes de Coura Fan Weekend" />
        <meta name="keywords" content="paredes, coura, fan, weekend" />
        <meta name="author" content="Comunidade 0937" />

        <meta name="application-name" content="Fan Weekend" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#fc7f5f" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover" />

        <link rel="icon" href="favicon.gif" />
      </Head>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default App;

import type { AppProps /*, AppContext */ } from "next/app";
import NextNprogress from "nextjs-progressbar";
import AuthContextProvider from "../contexts/AuthContext";
import BorrowerTypeContextProvider from "../contexts/BorrowerTypeContext";
import "../styles/index.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <BorrowerTypeContextProvider>
        {/*  This component shows the progress bar  */}
        <NextNprogress
          color="#29D"
          startPosition={0.3}
          stopDelayMs={200}
          height={1}
          options={{ easing: "ease", speed: 500, showSpinner: false }}
        />
        <Component {...pageProps} />
        <style global jsx>
          {`
            body {
              background: #eee;
            }
          `}
        </style>
      </BorrowerTypeContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp;

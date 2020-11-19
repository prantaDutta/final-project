import "../styles/index.css";
import type { AppProps /*, AppContext */ } from "next/app";
import AuthContextProvider from "../contexts/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
      <style global jsx>
        {`
          .body-bg {
            background-color: #9921e8;
            background-image: linear-gradient(315deg, #9921e8 0%, #5f72be 50%);
          }
        `}
      </style>
    </AuthContextProvider>
  );
}

export default MyApp;

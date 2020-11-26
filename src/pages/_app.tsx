import "../styles/index.css";
import type { AppProps /*, AppContext */ } from "next/app";
import AuthContextProvider from "../contexts/AuthContext";
import BorrowerTypeContextProvider from "../contexts/BorrowerTypeContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <BorrowerTypeContextProvider>
        <Component {...pageProps} />
        <style global jsx>
          {`
            .body-bg {
              background-color: #9921e8;
              background-image: linear-gradient(
                315deg,
                #9921e8 0%,
                #5f72be 50%
              );
            }
          `}
        </style>
      </BorrowerTypeContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp;

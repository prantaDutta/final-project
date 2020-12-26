import { AnimatePresence, motion } from "framer-motion";
import type { AppProps /*, AppContext */ } from "next/app";
import NextNprogress from "nextjs-progressbar";
import React from "react";
import AuthContextProvider from "../contexts/AuthContext";
import BorrowerTypeContextProvider from "../contexts/BorrowerTypeContext";
import "../styles/index.css";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <AuthContextProvider>
      <BorrowerTypeContextProvider>
        {/*  This component shows the progress bar  */}
        <NextNprogress
          color="#29D"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          options={{ easing: "ease", speed: 500, showSpinner: false }}
        />
        <AnimatePresence exitBeforeEnter>
          <motion.div key={router.route} {...pageMotionProps}>
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
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

// animation
const pageVariants = {
  pageInitial: {
    // backgroundColor: "#eee",
    // filter: `invert()`,
    opacity: 0,
  },
  pageAnimate: {
    // backgroundColor: "transparent",
    // filter: ``,
    opacity: 1,
  },
  pageExit: {
    // backgroundColor: "#eee",
    // filter: `invert()`,
    opacity: 0,
  },
};

const pageMotionProps = {
  initial: "pageInitial",
  animate: "pageAnimate",
  exit: "pageExit",
  variants: pageVariants,
};

import React, { ReactElement } from "react";
import { useLoading, LoaderProvider } from "@agney/react-loading";

function App() {
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
  });
  return <section {...containerProps}>{indicatorEl}</section>;
}

interface ReactLoaderProps {
  component: ReactElement;
}

const ReactLoader: React.FC<ReactLoaderProps> = ({ component }) => {
  return (
    <LoaderProvider indicator={component}>
      <App />
    </LoaderProvider>
  );
};

export default ReactLoader;

{
  /* <BallTriangle width="50" /> */
}

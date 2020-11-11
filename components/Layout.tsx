import React, { ReactChildren } from "react";
import Nav from "./nav";

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Nav />
      {children}
    </div>
  );
};

export default Layout;

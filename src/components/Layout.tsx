import React from "react";
import Footer from "./footer";
import Nav from "./nav";

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Nav />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;

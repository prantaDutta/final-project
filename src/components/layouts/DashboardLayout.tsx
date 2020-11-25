import React from "react";
import MainContentNav from ".././dashboard/DashboardNav";
import Sidebar from ".././dashboard/Sidebar";

interface DashboardLayoutProps {}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="grid grid-cols-5 h-screen">
      <Sidebar />
      <div className="col-span-4">
        <MainContentNav />
        <div className="grid grid-cols-6 gap-4">
          <div className="col-start-2 col-span-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

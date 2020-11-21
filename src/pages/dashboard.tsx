import MainContent from "../components/dashboard/MainContent";
import Sidebar from "../components/dashboard/Sidebar";

interface dashboardProps {}

const dashboard: React.FC<dashboardProps> = () => {
  return (
    <div>
      <div className="grid grid-cols-5 h-screen">
        <Sidebar />
        <MainContent />
      </div>
    </div>
  );
};

export default dashboard;

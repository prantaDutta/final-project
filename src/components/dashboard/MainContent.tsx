import MainContentNav from "./MainContentNav";

interface MainContentProps {}

const MainContent: React.FC<MainContentProps> = ({}) => {
  return (
    <div className="col-span-4">
      <MainContentNav />
    </div>
  );
};

export default MainContent;

import MainContentNav from "./MainContentNav";

interface MainContentProps {}

const MainContent: React.FC<MainContentProps> = ({}) => {
  return (
    <div className="col-span-4">
      <MainContentNav />
      <div className="grid grid-cols-6 gap-4">
        <div className="col-start-2 col-span-4">
          <h2>Hello World</h2>
        </div>
      </div>
    </div>
  );
};

export default MainContent;

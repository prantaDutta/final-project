interface MainContentNavProps {}

const MainContentNav: React.FC<MainContentNavProps> = ({}) => {
  return (
    <div className="flex justify-end items-center bg-gray-200 p-4">
      <div className="flex items-center mr-4">
        <div>
          <svg
            className="w-6 h-6 mx-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            ></path>
          </svg>
        </div>
        <div>
          <h4 className="">Balance: </h4>
          <h4 className="font-semibold">Tk. 2000</h4>
        </div>
      </div>
      <div className="flex items-center mr-4">
        <div>
          <svg
            className="w-6 h-6 mx-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            ></path>
          </svg>
        </div>
        <div>
          <h4 className="">Welcome, </h4>
          <h4 className="font-semibold">Pranta Dutta</h4>
        </div>
      </div>
      <div>
        <h4 className="p-2 cursor-pointer rounded-full border-solid border-2 border-purple-800 hover:bg-purple-900">
          Log Out
        </h4>
      </div>
    </div>
  );
};

export default MainContentNav;

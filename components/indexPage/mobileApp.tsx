interface mobileAppProps {}

const MobileApp: React.FC<mobileAppProps> = ({}) => {
  return (
    <section className="bg-img-with-opacity2 pt-10">
      <div className="container text-gray-400">
        <div className="flex justify-center items-center">
          <h2 className="text-4xl font-bold">Our Brand New Mobile App</h2>
        </div>

        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-2 text-left pl-16 pt-10">
            <h4 className="font-semibold text-xl">
              A convenient option - Manage investments over mobile effortlessly
              with Investor 2.0
            </h4>
            {features &&
              features.map((f) => {
                return (
                  <div className="flex mt-4" key={f.title}>
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                      ></path>
                    </svg>
                    <p className="ml-8">{f.title}</p>
                  </div>
                );
              })}
            <div className="flex items center justify-center p-2 py-2 my-3">
              <img
                className="p-2 rounded-full"
                src="/google-play-badge.png"
                alt="Google Play Badge"
              />
              <img
                className="p-2 rounded-full"
                src="/app-store-badge.png"
                alt="App Store Badge"
              />
            </div>
          </div>
          <div className="col-span-1 text-left pl-16 pt-10">
            <img
              src="/android-screen.png"
              className="h-full w-full object-fit"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const features = [
  {
    title: "Brand New UI- Revamped dashboards, portfolio and invest pages",
  },
  {
    title:
      "Bulk and Auto-Invest- Invest in multiple loan profiles while making utmost utilisation of your funds",
  },
  {
    title: "UPI Enabled- Add funds instantly using UPI",
  },
  {
    title:
      "Live Return Calculator and XIRR report with many more exciting features, click here to know more",
  },
];

export default MobileApp;

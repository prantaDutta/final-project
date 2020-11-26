export default function Introduction() {
  return (
    <header className="px-4">
      <div className="flex justify-center items-center text-gray-300 w-full py-5 md:py-16">
        <div>
          <h1 className="font-medium md:font-semibold text-3xl md:text-5xl text-center">
            The Best p2p lending platform in Bangladesh
          </h1>
          <br />
          <p className="font-medium md:font-2xl text-xl md:text-4xl text-center">
            Lend and Borrow Money Anytime
          </p>
          <br />
          <div className="block text-center md:flex justify-center items-center m-3 md:m-6">
            {buttons.map((btn) => (
              <button
                key={btn}
                className="bg-indigo-800 mb-2 md:mb-0  rounded-full text-white text-sm md:text-lg px-2 md:px-4 py-1.5 md:py-3 uppercase mr-3"
              >
                {btn}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

const buttons = ["Get Started", "Watch Tutorials"];

export default function Introduction() {
  return (
    <header className="bg-img-with-opacity">
      <div className="flex justify-center items-center text-gray-400 w-full py-16">
        <div>
          <h1 className="font-semibold text-5xl text-center">
            The Best p2p lending platform in Bangladesh
          </h1>
          <br />
          <p className="font-medium text-4xl text-center">
            Lend and Borrow Money Anytime
          </p>
          <br />
          <div className="flex justify-center items-center m-6">
            <button className="bg-indigo-800 rounded-full text-white px-4 py-3 uppercase mr-3">
              Get Started
            </button>
            <button className="bg-indigo-800 rounded-full text-white px-4 py-3 uppercase">
              Watch Tutorials
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

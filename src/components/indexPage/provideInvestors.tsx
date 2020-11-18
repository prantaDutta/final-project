interface provideInvestorsProps {}

const ProvideInvestors: React.FC<provideInvestorsProps> = ({}) => {
  return (
    <section className="bg-img-with-opacity">
      <div className="container text-gray-400">
        <div className="flex justify-center items-center">
          <h2 className="text-4xl font-bold">We Provide Investors With</h2>
        </div>

        <div className="grid grid-cols-4 gap-5">
          {investors &&
            investors.map((investor) => {
              return (
                <div className="p-5 mt-5 text-center" key={investor.title}>
                  <h4 className="font-semibold text-2xl">{investor.title}</h4>
                  <p className="font-normal text-lg mt-5">{investor.content}</p>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

const investors = [
  {
    title: "Verified Borrowers",
    content:
      "Need not worry about your finances, LDC follows a 5 step LenDen screening mechanism which ensures lesser defaults and easy tracing of borrowers. “Click here” to understand the 5 step process in detail.",
  },
  {
    title: "Solid Returns",
    content:
      "The average Rate of Interest offered to borrowers is 28% p.a. However, 15% – 17% p.a is the net returns after adjustment of defaulted borrowers and the platform fees. “Learn more” to earn more.",
  },
  {
    title: "Diversified Investment",
    content:
      "It’s simpler to get started with a minimal investment of Rs.500 and the porfolio is better managed when your investment is spread across multiple borrowers. “Find out more“",
  },
  {
    title: "Monthly Cash Flow",
    content:
      "Monthly returns, are collected in an ESCROW account through auto-debit. Unlike other traditional investing instruments, cash flow starts immediately after the investment. “Know more“",
  },
];

export default ProvideInvestors;

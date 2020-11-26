import Image from "next/image";

interface sponsorsProps {}

const Sponsors: React.FC<sponsorsProps> = ({}) => {
  return (
    <section className="pt-10">
      <div className="text-gray-300">
        <div className="flex justify-center items-center">
          <h2 className="text-2xl md:text-4xl font-semibold md:font-bold text-center">
            Our Verified Sponsors
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {images &&
            images.map((img) => {
              return (
                <div
                  className="p-2 md:pt-4 lg:pt-4 mt-3 md:mt-5 text-center"
                  key={img.img}
                >
                  <div className="flex justify-center items-center mb-2 md:mb-4">
                    <Image
                      src={img.img}
                      alt="Picture of the author"
                      width="200"
                      height="200"
                      className="object-contain"
                    ></Image>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

const images = [
  {
    img: "/bkash.png",
  },
  {
    img: "/nogod.png",
  },
  {
    img: "/rocket.png",
  },
  {
    img: "/sure_cash_logo.png",
  },
];

export default Sponsors;

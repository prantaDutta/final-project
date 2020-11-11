// import Image from "next/image";

interface sponsorsProps {}

const Sponsors: React.FC<sponsorsProps> = ({}) => {
  return (
    <section className="bg-img-with-opacity2 pt-10">
      <div className="container text-gray-400">
        <div className="flex justify-center items-center">
          <h2 className="text-4xl font-bold">Our Verified Sponsors</h2>
        </div>

        <div className="grid grid-cols-4 gap-5">
          {images &&
            images.map((img) => {
              return (
                <div className="p-5 mt-5 text-center" key={img.img}>
                  <div className="flex justify-center items-center mb-4">
                    {/* This doesn't work */}
                    {/* <Image
                      src={img.img}
                      alt="Picture of the author"
                      width={500}
                      height={500}
                    ></Image> */}
                    {/* This works */}
                    <img
                      src={img.img}
                      className="bg-mint text-mint fill-current"
                      alt="provider image"
                    />
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
    img: "/images/bkash.png",
  },
  {
    img: "/images/nogod.png",
  },
  {
    img: "/images/rocket.png",
  },
  {
    img: "/images/sure_cash_logo.png",
  },
];

export default Sponsors;

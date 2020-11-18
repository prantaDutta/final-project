interface footerProps {}

const Footer: React.FC<footerProps> = ({}) => {
  return (
    <section className="body-bg">
      <div className="flex justify-center items-center px-4 py-3 text-gray-200">
        &copy; GrayScale 2020
      </div>
      <style global jsx>
        {`
          .body-bg {
            background-color: #9921e8;
            background-image: linear-gradient(315deg, #9921e8 0%, #5f72be 74%);
          }
        `}
      </style>
    </section>
  );
};

export default Footer;

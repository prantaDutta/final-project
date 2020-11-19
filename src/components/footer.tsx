interface footerProps {}

const Footer: React.FC<footerProps> = ({}) => {
  return (
    <section className="body-bg">
      <div className="flex justify-center items-center px-4 py-3 text-gray-200">
        &copy; GrayScale 2020
      </div>
    </section>
  );
};

export default Footer;

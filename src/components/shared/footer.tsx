interface footerProps {}

const Footer: React.FC<footerProps> = ({}) => {
  return (
    <section className="body-bg">
      <div className="flex justify-center tracking-wider font-bold md:font-semibold text-ls md:text-ls items-center px-4 py-3 text-white">
        &copy; GrayScale 2020
      </div>
    </section>
  );
};

export default Footer;

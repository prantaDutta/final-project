interface footerProps {}

const Footer: React.FC<footerProps> = ({}) => {
  return (
    <section>
      <div className="flex justify-center items-center px-4 py-2 bg-indigo-900 text-gray-200">
        &copy; GrayScale 2020
      </div>
    </section>
  );
};

export default Footer;

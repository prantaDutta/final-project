import Layout from "../components/layouts/Layout";

interface aboutProps {}

const about: React.FC<aboutProps> = ({}) => {
  return (
    <Layout>
      <div className="text-center text-gray-600">
        <h2 className="text-4xl font-bold">About GrayScale</h2>
        <div className="bg-white mt-10 md:mx-56">
          <p className="p-2">
            GrayScale is one of the fastest growing peer to peer (P2P) lending
            platforms in Bangladesh. It connects investors or lenders looking
            for high returns with creditworthy borrowers looking for short term
            personal loans.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default about;

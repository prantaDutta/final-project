import Introduction from "../components/indexPage/introduction";
import ProvideInvestors from "../components/indexPage/provideInvestors";
import ProvideBorrowers from "../components/indexPage/provideBorrowers";
import Sponsors from "../components/indexPage/sponsors";
import MobileApp from "./../components/indexPage/mobileApp";
import UpperFooter from "../components/indexPage/upperFooter";
import Layout from "../components/Layout";

export default function IndexPage() {
  return (
    <Layout>
      <div className="bg-img-with-opacity">
        <Introduction />
        <ProvideInvestors />
        <ProvideBorrowers />

        <Sponsors />
        <MobileApp />
        <UpperFooter />
      </div>

      <hr className="border-gray-700 border-t" />
    </Layout>
  );
}

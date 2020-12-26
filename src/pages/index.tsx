import Introduction from "../components/indexPage/introduction";
import ProvideBorrowers from "../components/indexPage/provideBorrowers";
import ProvideInvestors from "../components/indexPage/provideInvestors";
import Sponsors from "../components/indexPage/sponsors";
import UpperFooter from "../components/indexPage/upperFooter";
import Layout from "../components/layouts/Layout";
import MobileApp from "./../components/indexPage/mobileApp";

// This is the home page
// the components of this page are in the components folder

export default function IndexPage() {
  return (
    <Layout>
      <Introduction />
      <ProvideInvestors />
      <ProvideBorrowers />
      <Sponsors />
      <MobileApp />
      <UpperFooter />

      {/* <hr className="border-gray-700 border-t" /> */}
    </Layout>
  );
}

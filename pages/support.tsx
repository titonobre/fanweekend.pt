import type { NextPage } from "next";

import Info from "../components/message/Info";
import GenericPage from "../components/page/GenericPage";
import useTawkTo from "../lib/hooks/useTawkTo";

const SupportPage: NextPage = () => {
  useTawkTo();

  return (
    <GenericPage>
      <Info title="Support" message="If you need some help, please use the floating green button on the bottom right corner." />
    </GenericPage>
  );
};

export default SupportPage;

import type { NextPage } from "next";

import Info from "../components/message/Info";
import GenericPage from "../components/page/GenericPage";

const ForumsPage: NextPage = () => {
  return (
    <GenericPage>
      <Info
        title="Forums Disabled"
        message="The forums used in previous years are disabled. The main form of communication between the organization and the participants will be the Fan Weekend website. Login and head to your account."
      />
    </GenericPage>
  );
};

export default ForumsPage;

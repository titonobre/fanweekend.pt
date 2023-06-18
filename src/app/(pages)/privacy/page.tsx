import dynamic from "next/dynamic";

import PrivacyPolicy from "../../../documents/privacy-policy.md";

const AcceptPrivacyPolicy = dynamic(() => import("./accept-privacy-policy"), { ssr: false });

export default function PrivacyPolicyPage() {
  return (
    <div className="thin-container flex flex-col gap-10 py-10">
      <div className="prose prose-neutral dark:prose-invert prose-headings:font-normal prose-h1:text-3xl prose-h2:mb-3 prose-h2:mt-6 prose-h2:text-2xl prose-li:my-1">
        <PrivacyPolicy />
      </div>
      <div className="flex flex-col gap-2">
        <AcceptPrivacyPolicy />
      </div>
    </div>
  );
}

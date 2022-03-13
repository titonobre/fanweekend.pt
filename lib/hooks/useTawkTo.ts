import { useEffect } from "react";

import TawkToWidget from "tawkto-react";

import { TAWK_TO_PROPERTY_ID, TAWK_TO_WIDGET_ID } from "../env";

const propertyId = TAWK_TO_PROPERTY_ID;
const widgetId = TAWK_TO_WIDGET_ID;

export type UserData = {
  name?: string;
  email?: string;

  tawkToHash?: string;
};

export default function useTawkTo({ name, email, tawkToHash: hash }: UserData = { name: "", email: "", tawkToHash: "" }) {
  useEffect(() => {
    if (!propertyId || !widgetId) {
      return;
    }

    try {
      const tawk = new TawkToWidget(propertyId, widgetId);

      const setAttributes = () => {
        name && tawk.setAttributes({ name });
        email && tawk.setAttributes({ email, hash });
      };

      tawk.onLoad(setAttributes);

      setAttributes();
    } catch (error) {
      console.error(error);
    }
  }, [name, email, hash]);
}

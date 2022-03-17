import { useEffect, useMemo } from "react";

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
  const tawk = useMemo(() => {
    if (!propertyId || !widgetId) {
      return;
    }

    try {
      return new TawkToWidget(propertyId, widgetId);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (!tawk) {
      return;
    }

    try {
      const tawk = new TawkToWidget(propertyId, widgetId);

      const setAttributes = () => {
        if (name) {
          tawk.setAttributes({ name });
        }
        if (email) {
          tawk.setAttributes({ email, hash });
        }
      };

      if (name || email) {
        tawk.onLoad(setAttributes);
      }

      setAttributes();
    } catch (error) {
      console.error(error);
    }
  }, [tawk, name, email, hash]);

  const showChat = () => {
    if (!tawk) {
      return;
    }

    tawk.maximize();
  };

  return { showChat };
}

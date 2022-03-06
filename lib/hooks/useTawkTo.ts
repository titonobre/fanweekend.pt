import { useEffect } from "react";

import TawkToWidget from "tawkto-react";

import { TAWK_TO_PROPERTY_ID, TAWK_TO_WIDGET_ID } from "../env";
import useUserData from "./userUserData";

const propertyId = TAWK_TO_PROPERTY_ID;
const widgetId = TAWK_TO_WIDGET_ID;

export default function useTawkTo() {
  const { user, isLoading } = useUserData();

  useEffect(() => {
    if (!propertyId || !widgetId || !user || isLoading) {
      return;
    }

    const tawk = new TawkToWidget(propertyId, widgetId);

    tawk.onLoad(() => {
      tawk.setAttributes({
        name: user.name,
        email: user.email,
        hash: user.tawkToHash,
      });
    });
  }, [user, isLoading]);
}

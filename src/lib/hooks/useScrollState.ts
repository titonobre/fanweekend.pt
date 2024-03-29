import { useLayoutEffect } from "react";

import { useThrottle } from "@react-hook/throttle";

type Direction = "up" | "down";
type ScrollState = [position: number, direction: Direction];

export default function useScrollState() {
  const [scrollState, setScrollState] = useThrottle<ScrollState>([0, "up"], 10);

  useLayoutEffect(() => {
    let oldScrollY = 0;

    const handleScroll = () => {
      const direction = window.scrollY > oldScrollY ? "down" : "up";

      setScrollState([window.scrollY, direction]);

      oldScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });

  return scrollState;
}

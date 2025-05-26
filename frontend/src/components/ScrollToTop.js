import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // 1. Standard way
    try {
      window.scrollTo({ top: 0, behavior: "instant" });
    } catch (e) {
      console.error("Standard scrollTo failed:", e);
    }

    // 2. Alternative methods
    const html = document.documentElement;
    const body = document.body;

    html.style.scrollBehavior = "auto";
    body.style.scrollBehavior = "auto";

    html.scrollTop = 0;
    body.scrollTop = 0;

    // 3. Force reflow
    html.getBoundingClientRect();
  }, [pathname]);

  return null;
}

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
const ScrollToTop = () => {
  const location = useLocation();
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual"; // Disable scroll restoration
    }
    window.scrollTo(0, 0); // Page ko top pe le jao
  }, [location.pathname]);
  return null;
};
export default ScrollToTop;

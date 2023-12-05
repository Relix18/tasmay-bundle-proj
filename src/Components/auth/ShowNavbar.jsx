import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ShowNavbar = ({ children }) => {
  const location = useLocation();

  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    if (
      location.pathname === "/login" ||
      location.pathname === "/signup" ||
      location.pathname === "/forget-password"
    ) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
  }, [location]);
  return <div>{showNavbar && children}</div>;
};

export default ShowNavbar;

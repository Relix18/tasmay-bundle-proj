import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../../redux/auth/authSlice";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  //   const navigate = useNavigate();
  const user = useSelector(selectLoggedInUser);
  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
};

export default Protected;

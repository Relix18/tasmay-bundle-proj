import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser, singOutAsync } from "../../redux/auth/authSlice";
import { Navigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    dispatch(singOutAsync());
  }, [dispatch]);

  return <>{!user && <Navigate to="/" replace={true} />}</>;
};

export default Logout;

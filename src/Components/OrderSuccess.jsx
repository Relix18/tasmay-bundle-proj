import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { resetOrder } from "../redux/order/orderSlice";
import { resetCartAsync } from "../redux/cart/cartSlice";
import img from "../assets/successful.png";
import "../styles/OrderSuccess.scss";
import { selectLoggedInUser } from "../redux/auth/authSlice";

const OrderSuccess = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    dispatch(resetCartAsync(user.id));
    dispatch(resetOrder());
  }, [dispatch, user.id]);

  return (
    <div id="order">
      <div className="main">
        <img src={img} />
        <p className="p1">Order Successful</p>
        <p className="p2">Order Id: {params.id}</p>
        <p className="p3">You can check your order in My Orders</p>
        <Link className="btn" to="/">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;

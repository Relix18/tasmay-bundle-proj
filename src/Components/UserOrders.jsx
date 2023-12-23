import { useEffect } from "react";
import "../styles/UserOrders.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLoggedInUserOrdersAsync,
  selectUserInfo,
  selectUserOrders,
} from "../redux/user/userSlice";

const UserOrders = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const orders = useSelector(selectUserOrders);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync(user.id));
  }, [dispatch, user]);

  return (
    <div id="Orders">
      <h1>My Orders</h1>
      {orders.map((order) => (
        <>
          {order.items.map((item) => (
            <div key={item.id} className="order">
              <div className="orderId">
                <h2>Order # {item.id}</h2>
                <div className="orderStatus">Order Status: {order.status}</div>
              </div>
              <div className="orderItems">
                <div className="orderDetails">
                  <img src={item.thumbnail} />
                  <div className="details">
                    <h3>{item.title}</h3>
                    <h4 className="brand">{item.brand}</h4>
                    <h4 className="qty">Qty : {item.qty}</h4>
                  </div>
                </div>
                <div className="orderPrice">${item.price}</div>
              </div>
              <div className="orderTotal">
                <div>
                  <div>Total :</div>
                  <div>Total Items : </div>
                  <p>Order placed to this address:</p>
                </div>
                <div>
                  <div>${order.total}</div>
                  <div>{order.totalItems} items</div>
                </div>
              </div>
              <div className="address">
                <div className="row">
                  <div className="col-1">
                    <p className="name-p">{order.address.name}</p>
                    <p className="address-p">{order.address.street}</p>
                    <p className="pin-p">{order.address.zip}</p>
                  </div>
                  <div className="col-2">
                    <p className="phone-p">Phone: {order.address.phone}</p>
                    <p className="city-p">{order.address.city}</p>
                    <p className="state-p">{order.address.state}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      ))}
    </div>
  );
};

export default UserOrders;

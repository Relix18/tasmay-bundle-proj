import React from "react";
import "../styles/Cart.scss";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const { cartItems, subTotal, tax, shipping, total } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();

  const increment = (id) => {
    dispatch({
      type: "addToCart",
      payload: { id },
    });
    dispatch({ type: "calculatePrice" });
  };

  const decrement = (id) => {
    dispatch({
      type: "decrement",
      payload: id,
    });
    dispatch({ type: "calculatePrice" });
  };

  const deleteHandler = (id) => {
    dispatch({
      type: "deleteFromCart",
      payload: id,
    });
    dispatch({ type: "calculatePrice" });
  };

  return (
    <>
      <div id="Cart">
        <div className="items box">
          <h3>Shopping Cart</h3>
          {cartItems.length > 0 ? (
            cartItems.map((i) => (
              <Card
                thumbnail={i.thumbnail}
                title={i.title}
                price={i.price}
                qty={i.quantity}
                id={i.id}
                brand={i.brand}
                key={i.id}
                increment={increment}
                decrement={decrement}
                deleteHandler={deleteHandler}
              />
            ))
          ) : (
            <div id="emptyCart">
              <h2>Your Tasmay Cart is empty</h2>
            </div>
          )}
        </div>
        <div id="price">
          <h3>Price Details</h3>
          <div className="details">
            <table>
              <tbody>
                <tr>
                  <td>Sub Total</td>
                  <td>${subTotal}</td>
                </tr>
                <tr>
                  <td>tax</td>
                  <td>${tax}</td>
                </tr>
                <tr>
                  <td>Delivery Charges</td>
                  <td>${shipping}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="total">
            <table>
              <thead>
                <tr>
                  <td>Total</td>
                  <td>${total}</td>
                </tr>
              </thead>
            </table>
          </div>
          <button>Place Order</button>
        </div>
      </div>
    </>
  );
};

const Card = ({
  thumbnail,
  title,
  price,
  brand,

  id,
  qty,
  increment,
  decrement,
  deleteHandler,
}) => (
  <div className="itemCard">
    <div className="itemDetail">
      <img src={thumbnail} alt="" />
      <div className="pClass">
        <p className="productName">{title}</p>
        <p className="productBrand">{brand}</p>

        <p className="amount">${price}</p>
      </div>
      <div className="quantityBtn">
        <button onClick={() => decrement(id)}> -</button>
        <p>{qty}</p>
        <button onClick={() => increment(id)}>+</button>
      </div>
    </div>
    <div className="buttons">
      <button className="btn1">Save For Later</button>
      <button onClick={() => deleteHandler(id)} className="btn2">
        Remove
      </button>
    </div>
  </div>
);

export default Cart;

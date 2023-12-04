import React, { useEffect, useState } from "react";
import "../styles/Cart.scss";
import { useDispatch, useSelector } from "react-redux";
import { cartAsync, deleteAsync, updateAsync } from "../redux/cart/cartSlice";
import { Navigate } from "react-router-dom";

const Cart = () => {
  const items = useSelector((state) => state.cart.items);

  const sum = items.reduce((acc, item) => item.price * item.qty + acc, 0);
  const subTotal = sum;
  const shipping = subTotal > 500 ? 0 : 50;
  const tax = +(subTotal * 0.18).toFixed();
  const total = subTotal + tax + shipping;

  useEffect(() => {
    dispatch(cartAsync());
  }, []);
  const dispatch = useDispatch();

  return (
    <>
      <div id="Cart">
        <div className="items box">
          <h3>Shopping Cart</h3>
          {items.length > 0 ? (
            items.map((i) => (
              <Card
                thumbnail={i.thumbnail}
                title={i.title}
                price={i.price}
                qty={i.qty}
                id={i.id}
                brand={i.brand}
                key={i.id}
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

const Card = ({ thumbnail, title, price, brand, id, qty }) => {
  const [quantity, setQuantity] = useState(qty);
  const dispatch = useDispatch();

  const increment = (id) => {
    setQuantity(quantity + 1);
    dispatch(updateAsync({ id, change: { qty: quantity + 1 } }));
  };

  const decrement = (id) => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
    dispatch(
      updateAsync({
        id,
        change: {
          qty: quantity > 1 ? quantity - 1 : "",
        },
      })
    );
  };

  const deleteHandler = (id) => {
    dispatch(deleteAsync(id));
  };

  return (
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
          <p>{quantity}</p>
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
};

export default Cart;

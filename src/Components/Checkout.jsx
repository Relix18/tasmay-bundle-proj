import "../styles/Checkout.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  cartAsync,
  deleteAsync,
  selectItems,
  updateAsync,
} from "../redux/cart/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { State, City } from "country-state-city";
import toast from "react-hot-toast";
const Checkout = () => {
  const [show, setShow] = useState(true);
  const [city, setCity] = useState();

  const items = useSelector(selectItems);
  const navigate = useNavigate();
  const states = State.getStatesOfCountry("IN");
  const cities = City.getCitiesOfState("IN", city);
  const sum = items.reduce((acc, item) => item.price * item.qty + acc, 0);
  const subTotal = sum;
  const shipping = subTotal > 500 ? 0 : 50;
  const tax = +(subTotal * 0.18).toFixed();
  const total = subTotal + tax + shipping;

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  useEffect(() => {
    if (items.length === 0) {
      navigate("/");
    }
  }, [navigate, items]);

  return (
    <div id="Checkout">
      <div className="address-section column">
        {show ? (
          <button className="add-btn" onClick={() => setShow(false)}>
            Add Address
          </button>
        ) : (
          <div className="form-section">
            <h1>Personal Information</h1>
            <p>Use a permanent address where you can receive mail</p>
            <div className="form">
              <div className="name">
                <label className="label">Full name</label>
                <div className="name-input">
                  <input type="text" className="input sec-1" />
                </div>
              </div>
              <div className="email">
                <label className="label">Email</label>
                <div className="email-input">
                  <input type="text" className="input sec-1" />
                </div>
              </div>
              <div>
                <label className="label">Phone</label>
                <div>
                  <input type="number" className="input phone-input" />
                </div>
              </div>
              <div>
                <label className="label">Street address</label>
                <div>
                  <input type="text" className="input street-input" />
                </div>
              </div>

              <div className="main-col">
                <div className="col">
                  <label className="label">City</label>
                  <div>
                    <select className="input col-input state">
                      <option>Select...</option>
                      {cities.map((city, index) => (
                        <option key={index} value={city.name}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col">
                  <label className="label">State</label>
                  <div>
                    <select
                      className="input col-input state"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    >
                      <option>Select...</option>
                      {states.map((state, index) => (
                        <option key={index} value={state.isoCode}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col">
                  <label className="label">ZIP / Postal Code</label>
                  <div>
                    <input type="number" className="input col-input" />
                  </div>
                </div>
              </div>
            </div>
            <button className="add-btn" onClick={() => setShow(true)}>
              Add Address
            </button>
          </div>
        )}
        <div className="address-container">
          <h1>Address</h1>
          <p>Choose the address you want to use</p>
          <div className="address">
            <input type="radio" name="address-radio" id="address-radio" />
            <label htmlFor="address-radio"></label>
            <div className="row">
              <div className="col-1">
                <p className="name-p">Relix</p>
                <p className="address-p">123 Main Street</p>
                <p className="pin-p">229001</p>
              </div>
              <div className="col-2">
                <p className="phone-p">Phone: 434343</p>
                <p className="city-p">Raebareli</p>
                <p className="state-p">Uttar Pradesh</p>
              </div>
            </div>
          </div>
        </div>
        <div className="payment-option">
          <div>
            <input type="radio" name="payment" id="payment1" />
            <label htmlFor="payment1">Cash Payment</label>
          </div>
          <div>
            <input type="radio" name="payment" id="payment2" />
            <label htmlFor="payment2">Online Payment</label>
          </div>
        </div>
      </div>
      <div className="item-section column">
        <h1>Cart</h1>
        <div className="item-container">
          <div className="items">
            {items.map((item, index) => (
              <CheckoutCart
                key={index}
                id={item.id}
                thumbnail={item.thumbnail}
                title={item.title}
                price={item.price}
                brand={item.brand}
                qty={item.qty}
              />
            ))}
          </div>
          <div className="summary">
            <div>
              <h3>Subtotal</h3>
              <h3>Total Items</h3>
            </div>
            <div>
              <h3>${total}</h3>
              <h3>{items.length}</h3>
            </div>
          </div>
          <p className="p-summary">Shipping and taxes included.</p>
          <button className="order-btn">Proceed</button>
          <Link to="/" className="continue-btn">
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

const CheckoutCart = ({ id, thumbnail, title, price, brand, qty }) => {
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
          qty: quantity > 1 ? quantity - 1 : 1,
        },
      })
    );
  };
  const deleteHandler = (id) => {
    dispatch(deleteAsync(id));
    toast.success("Item Removed");
  };
  return (
    <div className="item">
      <img src={thumbnail} alt="" />
      <div className="item-details">
        <div className="details">
          <p className="item-name">{title}</p>
          <p className="item-brand">{brand}</p>
          <div className="qty">
            <p>Qty</p>
            <button
              onClick={() => {
                decrement(id);
              }}
            >
              -
            </button>
            <p className="qty-p">{quantity}</p>
            <button
              onClick={() => {
                increment(id);
              }}
            >
              +
            </button>
          </div>
        </div>
        <div className="price">
          <p className="price-p">${price}</p>
          <button onClick={() => deleteHandler(id)}>Remove</button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

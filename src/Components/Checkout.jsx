import "../styles/Checkout.scss";
import { useDispatch, useSelector } from "react-redux";
import { deleteAsync, selectItems, updateAsync } from "../redux/cart/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { State } from "country-state-city";
import toast from "react-hot-toast";
import { createOrderAsync, selectOrderPlaced } from "../redux/order/orderSlice";
import { useForm } from "react-hook-form";
import { selectUserInfo, updateUserAsync } from "../redux/user/userSlice";
const Checkout = () => {
  const [show, setShow] = useState(true);
  const [address, setAddress] = useState(null);
  const [payment, setPayment] = useState("cash");
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const order = useSelector(selectOrderPlaced);
  const navigate = useNavigate();
  const states = State.getStatesOfCountry("IN");
  const sum = items.reduce((acc, item) => item.price * item.qty + acc, 0);
  const subTotal = sum;
  const shipping = subTotal > 500 ? 0 : 50;
  const tax = +(subTotal * 0.18).toFixed();
  const total = subTotal + tax + shipping;
  const user = useSelector(selectUserInfo);
  const totalItems = items.reduce((amount, item) => item.qty + amount, 0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (items.length === 0) {
      navigate("/");
    }
    {
      order && navigate(`/order-success/${order.id}`);
    }
  }, [navigate, items, order, user]);

  const handleProceed = () => {
    if (!address) {
      toast.error("Please select an address");
      return;
    }
    const order = {
      items,
      total,
      user,
      totalItems,
      payment,
      address,
      status: "pending",
    };
    dispatch(createOrderAsync(order));
  };

  const handleAddress = (e) => {
    setAddress(user.addresses[e.target.value]);
  };

  const handlePayment = (e) => {
    setPayment(e.target.value);
  };

  return (
    <div id="Checkout">
      <div className="address-section column">
        {show ? (
          <button className="add-btn" onClick={() => setShow(!show)}>
            Add Address
          </button>
        ) : (
          <form
            noValidate
            onSubmit={handleSubmit((data) => {
              dispatch(
                updateUserAsync({
                  ...user,
                  addresses: [...user.addresses, data],
                })
              );
              reset();
            })}
          >
            <div className="form-section">
              <h1>Personal Information</h1>
              <p>Use a permanent address where you can receive mail</p>
              <div className="form">
                <div>
                  <label className="label" htmlFor="name">
                    Full name
                  </label>
                  <div className="name-input sec-1">
                    <input
                      type="text"
                      id="name"
                      {...register("name", { required: "name is required" })}
                    />
                  </div>
                </div>
                <div>
                  <label className="label" htmlFor="email">
                    Email
                  </label>
                  <div className="email-input sec-1">
                    <input
                      id="email"
                      type="text"
                      {...register("email", { required: "email is required" })}
                    />
                  </div>
                </div>
                <div>
                  <label className="label" htmlFor="phone">
                    Phone
                  </label>
                  <div className="phone-input">
                    <input
                      type="number"
                      id="phone"
                      {...register("phone", {
                        required: "phone number is required",
                      })}
                    />
                  </div>
                </div>
                <div>
                  <label className="label" htmlFor="street">
                    Street address
                  </label>
                  <div className="street-input">
                    <input
                      type="text"
                      id="street"
                      {...register("street", {
                        required: "street address is required",
                      })}
                    />
                  </div>
                </div>

                <div className="main-col">
                  <div className="col">
                    <label className="label">City</label>
                    <div className="col-input">
                      <input
                        id="city"
                        type="text"
                        {...register("city", { required: true })}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <label className="label" htmlFor="state">
                      State
                    </label>
                    <div className="select">
                      <select
                        id="state"
                        {...register("state", { required: true })}
                      >
                        {states.map((state, index) => (
                          <option key={index} value={state.name}>
                            {state.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col">
                    <label className="label" htmlFor="zip">
                      ZIP / Postal Code
                    </label>
                    <div className="col-input">
                      <input
                        type="number"
                        id="zip"
                        {...register("zip", { required: true })}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <button className="add-btn" type="submit">
                Add Address
              </button>
            </div>
          </form>
        )}
        <div className="address-container">
          <h1>Address</h1>
          <p>Choose the address you want to use</p>

          {user.addresses.map((address, index) => (
            <div className="address" key={index}>
              <input
                type="radio"
                name="address-radio"
                onChange={handleAddress}
                value={index}
                id={`address-radio${index}`}
              />
              <label htmlFor={`address-radio${index}`}></label>
              <div className="row">
                <div className="col-1">
                  <p className="name-p">{address.name}</p>
                  <p className="address-p">{address.street}</p>
                  <p className="pin-p">{address.zip}</p>
                </div>
                <div className="col-2">
                  <p className="phone-p">Phone: {address.phone}</p>
                  <p className="city-p">{address.city}</p>
                  <p className="state-p">{address.state}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="payment-option">
          <div>
            <input
              type="radio"
              name="payment"
              value={"cash"}
              onChange={handlePayment}
              id="payment1"
              checked={payment === "cash"}
            />
            <label htmlFor="payment1">Cash Payment</label>
          </div>
          <div>
            <input
              type="radio"
              value={"card"}
              onChange={handlePayment}
              name="payment"
              id="payment2"
            />
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
              <h3>{totalItems}</h3>
            </div>
          </div>
          <p className="p-summary">Shipping and taxes included.</p>
          <button className="order-btn" onClick={handleProceed}>
            Proceed
          </button>
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

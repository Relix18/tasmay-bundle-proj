import React from "react";
import "../styles/Cart.scss";

const Cart = () => {
  const isEmpty = true;
  return (
    <>
      {isEmpty === true ? (
        <div id="emptyCart">
          <h2>Your Tasmay Cart is empty</h2>
        </div>
      ) : (
        <div id="Cart">
          <div className="items box">
            <h3>Shopping Cart</h3>
            <div className="itemCard">
              <div className="itemDetail">
                <img
                  src="https://i.dummyjson.com/data/products/1/thumbnail.jpg"
                  alt=""
                />
                <div className="pClass">
                  <p className="productName">Iphone 9</p>
                  <p className="productBrand">Apple</p>
                  <p className="amount">$288</p>
                </div>
                <div className="quantityBtn">
                  <button> -</button>
                  <p>1</p>
                  <button>+</button>
                </div>
              </div>
              <div className="buttons">
                <button className="btn1">Save For Later</button>
                <button className="btn2">Remove</button>
              </div>
            </div>
            <div className="itemCard">
              <div className="itemDetail">
                <img
                  src="https://i.dummyjson.com/data/products/1/thumbnail.jpg"
                  alt=""
                />
                <div className="pClass">
                  <p className="productName">Iphone 9</p>
                  <p className="productBrand">Apple</p>
                  <p className="amount">$288</p>
                </div>
                <div className="quantityBtn">
                  <button> -</button>
                  <p>1</p>
                  <button>+</button>
                </div>
              </div>
              <div className="buttons">
                <button className="btn1">Save For Later</button>
                <button className="btn2">Remove</button>
              </div>
            </div>
          </div>
          <div className="price box">
            <h3>Price Details</h3>
            <div className="details">
              <table>
                <tr>
                  <td>Price</td>
                  <td>$548</td>
                </tr>
                <tr>
                  <td>No. of items</td>
                  <td>2</td>
                </tr>
                <tr>
                  <td>Discount</td>
                  <td>$0</td>
                </tr>
                <tr>
                  <td>Delivery Charges</td>
                  <td>$0</td>
                </tr>
              </table>
            </div>
            <div className="total">
              <table>
                <tr>
                  <td>Subtotal ( 2 items)</td>
                  <td>$548</td>
                </tr>
              </table>
            </div>
            <button>Place Order</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;

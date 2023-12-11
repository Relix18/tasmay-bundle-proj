import "../styles/Checkout.scss";

const Checkout = () => {
  return (
    <div id="Checkout">
      <div className="address-section">
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
                <input type="text" className="input col-input" />
              </div>
            </div>
            <div className="col">
              <label className="label">State</label>
              <div>
                <input type="text" className="input col-input" />
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
        <button className="add-btn">Add Address</button>
      </div>
      <div className="item-section"></div>
    </div>
  );
};

export default Checkout;

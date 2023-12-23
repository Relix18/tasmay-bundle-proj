import { useDispatch, useSelector } from "react-redux";
import "../styles/UserProfile.scss";
import { selectUserInfo, updateUserAsync } from "../redux/user/userSlice";
import { useForm } from "react-hook-form";
import { State } from "country-state-city";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const states = State.getStatesOfCountry("IN");
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
  const [addNew, setAddNew] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const handleEdit = (addressUpdate, index) => {
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(index, 1, addressUpdate);
    dispatch(updateUserAsync(newUser));
    setSelectedEditIndex(-1);
  };

  const handleEditForm = (index) => {
    setSelectedEditIndex(index);
    const address = user.addresses[index];
    setValue("name", address.name);
    setValue("email", address.email);
    setValue("phone", address.phone);
    setValue("street", address.street);
    setValue("city", address.city);
    setValue("state", address.state);
    setValue("zip", address.zip);
  };

  const handleDelete = (e, index) => {
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser));
  };

  const handleAdd = (data) => {
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.push(data);
    dispatch(updateUserAsync(newUser));
    setAddNew(false);
  };

  return (
    <div id="Profile">
      <h1>My Profile</h1>
      <div key={user.id} className="user">
        <div className="userId">
          <div className="userName">
            Name: {user.name ? user.name : "New User"}
          </div>
          <div className="email">email address : {user.email}</div>
          <button
            onClick={() => {
              setAddNew(!addNew);
              setSelectedEditIndex(-1);
            }}
          >
            Add New Address
          </button>
          {addNew ? (
            <form
              noValidate
              onSubmit={handleSubmit((data) => {
                handleAdd(data);
                reset();
              })}
            >
              <div className="form-section">
                <div className="form">
                  <div>
                    <label className="label" htmlFor="name">
                      Full name
                    </label>
                    <div className="name-input sec-1">
                      <input
                        type="text"
                        id="name"
                        {...register("name", {
                          required: "name is required",
                        })}
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
                        {...register("email", {
                          required: "email is required",
                        })}
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
                <div className="btns">
                  <button className="add-btn" type="submit">
                    Add Address
                  </button>
                </div>
              </div>
            </form>
          ) : null}
        </div>
        <h3>Addresses</h3>
        {user.addresses.map((address, index) => (
          <div key={index}>
            {selectedEditIndex === index ? (
              <form
                noValidate
                onSubmit={handleSubmit((data) => {
                  handleEdit(data, index);
                  reset();
                })}
              >
                <div className="form-section">
                  <div className="form">
                    <div>
                      <label className="label" htmlFor="name">
                        Full name
                      </label>
                      <div className="name-input sec-1">
                        <input
                          type="text"
                          id="name"
                          {...register("name", {
                            required: "name is required",
                          })}
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
                          {...register("email", {
                            required: "email is required",
                          })}
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
                  <div className="btns">
                    <button
                      className="cancel-btn"
                      type="submit"
                      onClick={() => setSelectedEditIndex(-1)}
                    >
                      Cancel
                    </button>
                    <button className="add-btn" type="submit">
                      Edit Address
                    </button>
                  </div>
                </div>
              </form>
            ) : null}
            <div className="address">
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
                <div className="col-3">
                  <button onClick={(e) => handleEditForm(index)}>Edit</button>
                  <button onClick={(e) => handleDelete(e, index)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;

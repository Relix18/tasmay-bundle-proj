import "../../styles/Login.scss";
import img from "../../assets/woman.png";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  checkUserAsync,
  selectError,
  selectLoggedInUser,
} from "../../redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { greeting, index } from "../utils/common";

const Login = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const user = useSelector(selectLoggedInUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      {user && <Navigate to="/" replace={true} />}
      {console.log(user)}
      <div id="Login">
        <div className="main">
          <div className="imgSection">
            <img src={img} />
          </div>
          <div className="formSection">
            <p className="p1">Hello!</p>
            <p className="p2">{greeting[index]}.</p>
            <form
              className="form"
              onSubmit={handleSubmit((data) => {
                dispatch(
                  checkUserAsync({
                    email: data.email,
                    password: data.password,
                    addresses: [],
                  })
                );
              })}
            >
              <p className="p3">Login to your account</p>
              <div className="inputBox">
                <label>email</label>
                <input
                  className="fill"
                  {...register("email", {
                    required: "email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "invalid email address",
                    },
                  })}
                  type="email"
                />
                {errors.email && (
                  <p className="error email-err"> {errors.email.message}</p>
                )}
              </div>
              <div className="inputBox">
                <label> password</label>
                <input
                  className="fill"
                  {...register("password", {
                    required: "password is required",
                  })}
                  type="password"
                />
                {errors.password && (
                  <p className="error "> {errors.password.message}</p>
                )}
                {error && <p className="error "> {error.message}</p>}
              </div>
              <div className="resetDiv">
                <Link className="resetPass" to="/forget-password">
                  Forget Password?
                </Link>
              </div>
              <button type="submit">Login</button>
            </form>
            <Link to="/signup" className="signup">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

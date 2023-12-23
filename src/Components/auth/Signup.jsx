import "../../styles/Signup.scss";
import img from "../../assets/shopping.png";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserAsync,
  selectLoggedInUser,
} from "../../redux/auth/authSlice";

const Signup = () => {
  const greeting = ["Good Morning", "Good Afternoon", "Good Evening"];
  const hours = new Date().getHours();
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const index = hours >= 12 && hours < 17 ? 1 : hours >= 17 ? 2 : 0;

  return (
    <>
      {user && <Navigate to="/" replace={true} />}
      <div id="Signup">
        <div className="main">
          <div className="imgSection">
            <img src={img} />
          </div>
          <div className="formSection">
            <p className="p1">Hello!</p>
            <p className="p2">{greeting[index]}.</p>
            <form
              className="form"
              onSubmit={handleSubmit((data) =>
                dispatch(
                  createUserAsync({
                    email: data.email,
                    password: data.password,
                    name: "New User",
                  })
                )
              )}
            >
              <p className="p3">Create account</p>
              <div className="inputBox">
                <label>email</label>
                <input
                  className="fill"
                  type="text"
                  {...register("email", {
                    required: "email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="error email-err"> {errors.email.message}</p>
                )}
              </div>
              <div className="inputBox">
                <label> password</label>
                <input
                  className="fill"
                  type="password"
                  {...register("password", {
                    required: "password is required",
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                      message: `at least 8 characters, must contain uppercase letter, lowercase letter, number and special characters`,
                    },
                  })}
                />
                {errors.password && (
                  <p className="error password-err">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="inputBox">
                <label> confirm password</label>
                <input
                  className="fill"
                  type="password"
                  {...register("confirmPassword", {
                    required: "confirm password is required",
                    validate: (value, formValues) =>
                      value === formValues.password || "password not matching",
                  })}
                />
                {errors.confirmPassword && (
                  <p className="error"> {errors.confirmPassword.message}</p>
                )}
              </div>

              <button type="submit">Sign up</button>
            </form>
            <div className="login">
              <span>Already have account?</span>{" "}
              <Link to="/login" className="link">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;

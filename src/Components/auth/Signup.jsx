import "../../styles/Signup.scss";
import img from "../../assets/shopping.png";
import { Link } from "react-router-dom";

const Signup = () => {
  const greeting = ["Good Morning", "Good Afternoon", "Good Evening"];
  const hours = new Date().getHours();

  const index = hours >= 12 && hours < 17 ? 1 : hours >= 17 ? 2 : 0;

  return (
    <>
      <div id="Signup">
        <div className="main">
          <div className="imgSection">
            <img src={img} />
          </div>
          <div className="formSection">
            <p className="p1">Hello!</p>
            <p className="p2">{greeting[index]}.</p>
            <form className="form">
              <p className="p3">Create account</p>
              <div className="inputBox">
                <input className="fill" type="text" required />
                <label>email</label>
              </div>
              <div className="inputBox">
                <input className="fill" type="password" required />
                <label> password</label>
              </div>
              <div className="inputBox">
                <input className="fill" type="password" required />
                <label> confirm password</label>
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

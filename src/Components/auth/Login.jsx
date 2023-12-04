import "../../styles/Login.scss";
import img from "../../assets/woman.png";
import { Link } from "react-router-dom";

const Login = () => {
  const greeting = ["Good Morning", "Good Afternoon", "Good Evening"];
  const day = new Date().getHours();

  const index = day >= 12 && day < 17 ? 1 : day >= 17 ? 2 : 0;

  return (
    <>
      <div className="blurDiv"></div>
      <div id="Login">
        <div className="main">
          <div className="imgSection">
            <img src={img} />
          </div>
          <div className="formSection">
            <p className="p1">Hello!</p>
            <p className="p2">{greeting[index]}.</p>
            <form className="form">
              <p className="p3">Login to your account</p>
              <div className="inputBox">
                <input className="fill" type="text" required />
                <label>username</label>
              </div>
              <div className="inputBox">
                <input className="fill" type="password" required />
                <label> password</label>
              </div>
              <Link className="resetPass" to="/forget-password">
                Forget Password?
              </Link>
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

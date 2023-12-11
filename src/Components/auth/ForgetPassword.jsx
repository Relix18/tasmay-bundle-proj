import "../../styles/ForgetPassword.scss";
import img from "../../assets/forgot-password.png";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  const greeting = ["Good Morning", "Good Afternoon", "Good Evening"];
  const day = new Date().getHours();

  const index = day >= 12 && day < 17 ? 1 : day >= 17 ? 2 : 0;

  return (
    <>
      <div id="ForgetPassword">
        <div className="main">
          <div className="imgSection">
            <img src={img} />
          </div>
          <div className="formSection">
            <p className="p1">Hello!</p>
            <p className="p2">{greeting[index]}.</p>
            <form className="form">
              <p className="p3">Reset Password</p>
              <div className="inputBox">
                <input className="fill" type="email" required="required" />
                <label>enter your email</label>
              </div>

              <button type="submit">Send</button>
            </form>
            <Link to="/login" className="signup">
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;

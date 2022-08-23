import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Register = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    username: "",
    firstName: "",
    lastName: "",
    type: "user",
  });



  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const signUp = async (e) => {
    e.preventDefault();

    try {

      const resp = await axios.post(
        "http://localhost:5000/auth/register",
        userData
      );

      if(!resp.data.status){
        return navigate('/login');
      }

    } catch (e) {
      console.log(e.response.data);
    }
  };

  return (
    <div className="container-fluid">
      <div
        className="card"
        style={{ width: "30%", margin: "auto", marginTop: "6%" }}
      >
        <div className="card-body">
          <h5 className="card-title text-center">Register</h5>
          <div className="row">
            <form id="login-form" method="POST" className="col-xs-12 col-md-12">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type={"email"}
                name={"email"}
                id={"email"}
                placeholder={"Email"}
                className={"form-control"}
                autoComplete={"on"}
                onChange={handleChange}
              />

              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type={"password"}
                name={"password"}
                id={"password"}
                placeholder={"Password"}
                className={"form-control"}
                autoComplete={"off"}
                onChange={handleChange}
              />

              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type={"text"}
                name={"username"}
                id={"username"}
                placeholder={"Username"}
                className={"form-control"}
                autoComplete={"on"}
                onChange={handleChange}
              />

              <label htmlFor="firstname" className="form-label">
                Firstname
              </label>
              <input
                type={"text"}
                name={"firstName"}
                id={"firstname"}
                placeholder={"Firstname"}
                className={"form-control"}
                autoComplete={"on"}
                onChange={handleChange}
              />

              <label htmlFor="lastname" className="form-label">
                Lastname
              </label>
              <input
                type={"text"}
                name={"lastName"}
                id={"lastname"}
                placeholder={"Lastname"}
                className={"form-control"}
                autoComplete={"on"}
                onChange={handleChange}
              />

              <button
                type="submit"
                className="btn btn-secondary"
                style={{
                  width: "100%",
                  marginTop: "10px",
                  fontWeight: "bolder",
                }}
                onClick={(e) => signUp(e)}
              >
                Register
              </button>

              <Link
                to={"/login"}
                style={{ textDecoration: "none", borderRadius: "10px" }}
              >
                <button
                  className="list-group-item"
                  style={{ marginTop: "15px", width: "100%" }}
                >
                  Login
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

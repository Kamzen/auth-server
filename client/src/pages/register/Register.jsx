import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import AxiosInstance from "../../adapters/xhr";

const Register = () => {

  useEffect(() => {

    (async () => {
        const resp = await AxiosInstance.get('http://localhost:5000/auth/authorized');

        console.log(resp);
        
    })()

  },[])

  const signUp = async (e) => {
    e.preventDefault();
    const data = new FormData(document.getElementById("login-form"));

    data.append("type", "user");

    const resp = await axios({
      url: "http://localhost:5000/auth/authorized",
      method: "GET",
      data: {
        type: "user",
        email: "kamzen1994@gmail.com",
        password: "@Kamzen1998",
        username: "KamzenTheNigga",
        firstName: "Themba",
        lastName: "Makamu",
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    localStorage.setItem("token", resp.data.message.token);
    localStorage.setItem("refresh", resp.data.message.refresh);
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

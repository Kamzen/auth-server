import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  useEffect(() => {
    // check token in localStorage
    if(localStorage.getItem('userInfo')) navigate('/home')
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    try {

      const resp = await axios({
        url : "http://localhost:5000/auth/login",
        data : formData,
        method : 'POST',
        withCredentials : true
    });

      if(!resp.data.status){
        
        localStorage.setItem('token', resp.data.message.token);
        localStorage.setItem('refresh', resp.data.message.refresh);
        localStorage.setItem('userInfo',JSON.stringify(resp.data.message));
        return navigate('/home');
      }

    } catch (e) {

      console.log(e.response.data);

    }
  };

  return (
    <>
      <div
        className="card"
        style={{ width: "30%", margin: "auto", marginTop: "10%" }}
      >
        <div className="card-body">
          <h5 className="card-title text-center">Login</h5>
          <form id="login-form" method="POST">
            <label htmlFor="email" className="form-label">
              Email/Username
            </label>
            <input
              type={"email"}
              id={"email"}
              placeholder={"Email/Username"}
              name={"email"}
              className={"form-control"}
              autoComplete={"on"}
              onChange={handleChange}
            />

            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type={"password"}
              id={"password"}
              placeholder={"Password"}
              name={"password"}
              className={"form-control"}
              autoComplete={"off"}
              onChange={handleChange}
            />

            <button
              type="submit"
              onClick={login}
              className="btn btn-secondary"
              style={{ width: "100%", marginTop: "10px", fontWeight: "bolder" }}
            >
              Login
            </button>

            <Link
              to={"/signup"}
              style={{ textDecoration: "none", borderRadius: "10px" }}
            >
              <button
                className="list-group-item"
                style={{ marginTop: "15px", width: "100%" }}
              >
                Register
              </button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

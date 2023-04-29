import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../Model/User";
import { login } from "../../Api/UserApi";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  return (
    <div className="Login-form-container">
      <form className="Login-form">
        <div className="Login-form-content">
          <h3 className="Login-form-title">Sign In</h3>
          <div className="text-center">
            Not registered yet?{" "}
            <span
              className="link-primary"
              onClick={() => {
                navigate("/register", {
                  replace: true,
                });
              }}
            >
              Sign Up
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              onChange={(x) => {
                setEmail(x.currentTarget.value);
              }}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={(x) => {
                setPassword(x.currentTarget.value);
              }}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="submit-btn btn btn-primary"
              onClick={async () => {
                const user: User = {
                  email: email,
                  password: password,
                };
                try {
                  await login(user);
                } catch (error) {
                  toast((error as Error).message, {
                    type: "error",
                  });
                }
              }}
            >
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
            <a href="#">Forgot password?</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;

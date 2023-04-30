import React, { useState } from "react";
import { User } from "../../Model/User";
import { useNavigate } from "react-router-dom";
import { register } from "../../Api/UserApi";
import { toast } from "react-toastify";
import { checkIfIsEmailValid } from "../../Utilities/Utilities";

export const Register = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const checkIfAllInputFieldsAreCorrect = () => {
    return !(
      name === "" ||
      email === "" ||
      password === "" ||
      checkIfIsEmailValid(email) === false
    );
  };

  return (
    <div className="Login-form-container">
      <form className="Login-form">
        <div className="Login-form-content">
          <h3 className="Login-form-title">Create an account</h3>
          <div className="text-center">
            Already registered?{" "}
            <span
              className="link-primary"
              onClick={() => {
                navigate("/login", {
                  replace: true,
                });
              }}
            >
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
              onChange={(x) => {
                setName(x.target.value);
              }}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="jado@awesomecompany.com"
              onChange={(x) => {
                setEmail(x.target.value);
              }}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              onChange={(x) => {
                setPassword(x.target.value);
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
                  name: name,
                };
                try {
                  await register(user);
                  navigate("/mainpage", {
                    replace: true,
                  });
                } catch (error) {
                  toast((error as Error).message, {
                    type: "error",
                  });
                }
              }}
              disabled={!checkIfAllInputFieldsAreCorrect()}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

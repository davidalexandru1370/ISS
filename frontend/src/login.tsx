import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { User } from "./Model/User";

export default function () {
  const [authMode, setLoginMode] = useState("signin");
  const [user, setUser] = useState<User>();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const changeLoginMode = () => {
    setLoginMode(authMode === "signin" ? "signup" : "signin");
  };

  if (authMode === "signin") {
    return (
      <div className="Login-form-container">
        <form className="Login-form">
          <div className="Login-form-content">
            <h3 className="Login-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeLoginMode}>
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
                  setEmail(x.currentTarget.innerText);
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
                  setPassword(x.currentTarget.innerText);
                }}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="submit-btn btn btn-primary">
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
  }

  return (
    <div className="Login-form-container">
      <form className="Login-form">
        <div className="Login-form-content">
          <h3 className="Login-form-title">Create an account</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeLoginMode}>
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
                setName(x.currentTarget.innerText);
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
                setEmail(x.currentTarget.innerText);
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
                setPassword(x.currentTarget.innerText);
              }}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="submit-btn btn btn-primary"
              onClick={async () => {
                const url = "https://localhost:7179/api/User/register";
                setUser({ email: email, name: name, password: password });
                let header: RequestInit = {
                  body: JSON.stringify({
                    email: email,
                    name: name,
                    password: password,
                  }),
                  method: "POST",
                  credentials: "include",
                  headers: {
                    "Content-type": "application/json",
                  },
                  mode: "cors",
                };
                let response = await fetch(url, header);
                console.log(response);
                //await response;
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

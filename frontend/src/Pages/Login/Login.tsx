import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../../Api/UserApi";
import { User } from "../../Model/User";
import { checkIfIsEmailValid } from "../../Utilities/Utilities";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const checkIfInputFieldsAreCorrect = (): boolean => {
    return (
      email === "" || password === "" || checkIfIsEmailValid(email) === false
    );
  };

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
              className="submit-btn btn btn-primary"
              onClick={async (e) => {
                e.preventDefault();
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
              disabled={checkIfInputFieldsAreCorrect()}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;

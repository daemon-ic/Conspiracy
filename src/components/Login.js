import React from "react";
import "../App.css";

const Login = ({
  email,
  setEmail,
  password,
  setPassword,
  setHasAccount,
  emailError,
  passwordError,
  handleLogin,
  handleSignup,
  hasAccount,
  name,
  setName,
}) => {
  return (
    <div>
      <div className="ui stacked segment">
        <h1> Conspiracy </h1>
        <p> It's like Twitter, but edgy. </p>
        <div className="ui input">
          <input
            placeholder="Email"
            type="text"
            autoFocus
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {hasAccount ? null : (
          <React.Fragment>
            <br />
            <div className="ui input">
              <input
                placeholder="Full Name"
                type="text"
                autoFocus
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </React.Fragment>
        )}

        <br />
        <div className="ui input">
          <input
            placeholder="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <p>{emailError}</p>
      <p>{passwordError}</p>
      <div>
        {hasAccount ? (
          <>
            <button
              className="ui fluid large black submit button"
              onClick={handleLogin}
            >
              Sign In
            </button>
            <br />
            <p>
              Don't have an account?{" "}
              <span
                onClick={() => setHasAccount(!hasAccount)}
                style={{
                  flexDirection: "row",
                  fontWeight: "bold",
                }}
              >
                Sign Up
              </span>
            </p>
          </>
        ) : (
          <>
            <button
              className="ui fluid large black submit button"
              onClick={handleSignup}
            >
              Sign Up
            </button>
            <br />
            <p>
              Already have an account?{" "}
              <span
                onClick={() => setHasAccount(!hasAccount)}
                style={{
                  flexDirection: "row",
                  fontWeight: "bold",
                }}
              >
                Sign In
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;

import React from "react";
import "../App.css";
import TextField from "@material-ui/core/TextField";

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
      <div
        className="ui stacked segment"
        style={{
          width: "250px",
          paddingTop: "40px",
          paddingBottom: "40px",
        }}
      >
        <h1> Conspiracy </h1>
        <p> It's like Twitter, but edgy. </p>

        <TextField
          style={{
            paddingTop: "10px",
            paddingBottom: "10px",
          }}
          id="standard-basic"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {hasAccount ? null : (
          <React.Fragment>
            <br />

            <TextField
              style={{
                paddingTop: "10px",
                paddingBottom: "10px",
              }}
              id="standard-basic"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </React.Fragment>
        )}
        <br />

        <TextField
          style={{
            paddingTop: "10px",
            paddingBottom: "10px",
          }}
          id="standard-basic"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
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

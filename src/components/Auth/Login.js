import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { Form, Card, Alert } from "react-bootstrap";

import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import googleLogo from "../../assets/googleLogo.png";

import useStyles from "./LoginStyles";

import { signInWithGoogle } from "../../firebase";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const classes = useStyles();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }

  const paperStyle = {
    padding: 20,
    width: 280,
  };
  const avatarStyle = { backgroundColor: "#b39ddb" };
  const btnstyle = { margin: "8px 0" };
  const inputField = {
    backgroundColor: "#d1c4e9",
    border: 0,
    padding: 2,
    marginBottom: 5,
  };

  return (
    <>
      <main className={classes.content}>
        <Grid className={classes.loginForm} container justify="center">
          <Paper elevation={10} style={paperStyle}>
            <Grid align="center">
              <Avatar style={avatarStyle}>
                <LockOutlinedIcon />
              </Avatar>
              <h2>Sign In</h2>
            </Grid>
            <Card.Body className={classes.loginForm}>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Control
                    style={inputField}
                    type="email"
                    ref={emailRef}
                    required
                  />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Control
                    style={inputField}
                    type="password"
                    ref={passwordRef}
                    required
                  />
                </Form.Group>
                <Button
                  variant="contained"
                  style={btnstyle}
                  fullWidth
                  disabled={loading}
                  className={classes.loginButton}
                  type="submit"
                >
                  Log In
                </Button>
              </Form>
              <div className="w-100 text-center mt-3">
                <Typography>
                  <Link to="/forgot-password">Forgot Password?</Link>
                </Typography>
              </div>
            </Card.Body>

            <div>
              <Typography>Need an account?</Typography>{" "}
              <Typography>
                <Link to="/signup">Sign Up</Link>
              </Typography>
            </div>
            <div>
              <Card>
                <button
                  className="login-provider-button"
                  onClick={signInWithGoogle}
                >
                  <img
                    className={classes.loginLogos}
                    src={googleLogo}
                    alt="google icon"
                  />
                </button>
              </Card>
              <span className={classes.formEndtext}>Continue with Google</span>
            </div>
          </Paper>
        </Grid>
      </main>
    </>
  );
}

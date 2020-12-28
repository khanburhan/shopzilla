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

import useStyles from "./LoginStyles";

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

  return (
    <>
      <main className={classes.content}>
        <Grid container justify="center">
          <Paper elevation={10} style={paperStyle}>
            <Grid align="center">
              <Avatar style={avatarStyle}>
                <LockOutlinedIcon />
              </Avatar>
              <h2>Sign In</h2>
            </Grid>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <TextField>
                    <Form.Control type="email" ref={emailRef} required />
                  </TextField>
                </Form.Group>
                <Form.Group id="password">
                  <TextField>
                    <Form.Control type="password" ref={passwordRef} required />
                  </TextField>
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
            <div className="w-100 text-center mt-2">
              <Typography>Need an account?</Typography>{" "}
              <Typography>
                <Link to="/signup">Sign Up</Link>
              </Typography>
            </div>
          </Paper>
        </Grid>
      </main>
    </>
  );
}

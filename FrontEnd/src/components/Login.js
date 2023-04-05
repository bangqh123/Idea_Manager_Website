import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Divider,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Button,
  Box,
  OutlinedInput,
  IconButton,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

import { AuthContext } from "../contexts/AuthContext";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";



function Login() {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate()


  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [values, setValues] = useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });


  const { email, password } = loginForm;

  const onChangeLoginForm = (event) =>
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });

  const login = async (event) => {
    event.preventDefault();
    try {
      const LoginData = await loginUser(loginForm);
      if (LoginData.data) {
        if (LoginData.data.role !== "Staff") {
          return navigate('/home/dashboard')
        }
        else if (LoginData.data.role === "Staff") {
          return navigate('/home/view-ideas')
        }
      }
      else {
        return alert('Email or password incorrect!')
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  return (
    <>
      <form onSubmit={login}>
        <Grid>
          <Paper elevation={10} style={stylePaper}>
            <Grid align="center">
              <h1>Sign in</h1>
            </Grid>
            <Divider orientation="horizontal" />
            <Grid style={{ marginTop: "20px" }}>
              <TextField
                required
                name="email"
                fullWidth
                placeholder="Your email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon style={{ color: "black" }} />
                    </InputAdornment>
                  ),
                }}
                value={email}
                onChange={onChangeLoginForm}
              />
            </Grid>
            <FormControl
              required
              sx={{ mt: 2, width: "100%" }}
              variant="outlined"
            >
              <OutlinedInput
                type={values.showPassword ? "text" : "password"}
                name="password"
                onChange={onChangeLoginForm}
                placeholder="Your password"
                startAdornment={
                  <InputAdornment position="start">
                    <LockIcon style={{ color: "black" }} />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                value={password}
              />
            </FormControl>
            <Grid display={"flex"}
              sx={{ mt: 5, mb: 5, alignItems: 'center', justifyContent: 'center' }}>
              <Box style={{ width: "50%", textAlign: "right" }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  style={{ height: '50px', width: "100%" }}
                >
                  Login
                </Button>
              </Box>
            </Grid>
          </Paper>
        </Grid>
      </form>
    </>
  );
}
export default Login;
const stylePaper = {
  padding: 20,
  width: 480,
  margin: "50px auto",
};

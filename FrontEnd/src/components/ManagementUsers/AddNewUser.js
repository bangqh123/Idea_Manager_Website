import {
  Box,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Button,
} from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const AddNewUser = () => {
  const { register } = useContext(AuthContext)

  const [AccountForm, setAccountForm] = React.useState({
    username: '',
    email: '',
    password: '',
    role: ''
  })
  const navigate = useNavigate()
  const handleChangeAccountForm = (event) => { setAccountForm({ ...AccountForm, [event.target.name]: event.target.value }) }

  const { username, email, password, role } = AccountForm

  const onSubmit = async () => {
    const response = await register(AccountForm)
    console.log("response", response)
    navigate('/home/management-users')
  }
  return (
    <Grid
      sx={{
        width: "80%",
        paddingBottom: 5,
        backgroundColor: "#F9CB9C",
        margin: "50px auto",
        borderRadius: 15,
        border: 1,
        textAlign: "center",
      }}
    >
      <h1> Add New User</h1>
      <Box
        display={"flex"}
        sx={{
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "15%", marginLeft: 10, textAlign: "left" }}>
          <h3>Username:</h3>
        </Box>
        <Box sx={{ width: "70%" }}>
          <TextField value={username} name='username' sx={{ background: "white" }} fullWidth size="small" 
          onChange={handleChangeAccountForm} />
        </Box>
      </Box>
      <Box
        display={"flex"}
        sx={{
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "15%", marginLeft: 10, textAlign: "left" }}>
          <h3>Email:</h3>
        </Box>
        <Box sx={{ width: "70%" }}>
          <TextField sx={{ background: "white" }} value={email} name='email' fullWidth size="small"
            onChange={handleChangeAccountForm} />
        </Box>
      </Box>
      <Box
        display={"flex"}
        sx={{
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "15%", marginLeft: 10, textAlign: "left" }}>
          <h3>Password:</h3>
        </Box>
        <Box sx={{ width: "70%" }}>
          <TextField
            sx={{ background: "white" }}
            value={password}
            name="password"
            fullWidth
            size="small"
            type={"password"}
            onChange={handleChangeAccountForm}
          />
        </Box>
      </Box>
      <Box display={"flex"}>
        <Box sx={{ width: "15%", marginLeft: 10, textAlign: "left" }}>
          <h3>Role:</h3>
        </Box>
        <Box sx={{ minWidth: 150 }}>
          <FormControl fullWidth>

            <Select
              value={AccountForm.role}
              name='role'
              sx={{ background: "white" }}
              onChange={handleChangeAccountForm}
            >
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="QA">Manager</MenuItem>
              <MenuItem value="Coordinator">Coordinator</MenuItem>
              <MenuItem value="Staff">Staff</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Grid sx={{ textAlign: "center" }}>
        <Box
          display={"flex"}
          sx={{
            mt: 5,
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ width: "50%" }}>
            <Button
              variant="contained"
              color="success"
              sx={{
                ml: 9,
                height: 50,
                width: 120,
              }}
              onClick={() => onSubmit()}
            >
              Add
            </Button>
          </Box>
          <Box sx={{ width: "50%" }}>
            <Button
              variant="contained"
              color="error"
              sx={{
                height: 50,
                width: 120,
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AddNewUser;

import React, { useContext, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { mainNavbarItems } from "./const/navbarItems";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate, Outlet } from "react-router-dom";
import MyBreadcrumbs from "./Breadcrumbs/MyBreadcrumbs";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { makeStyles } from "@material-ui/core";

import { LOCAL_STORAGE_TOKEN_NAME } from "../../contexts/constants";

//context
import { AuthContext } from '../../contexts/AuthContext';

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const useStyles = makeStyles((theme) => ({
  searchBtn: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  profileText: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },

  notifyBtn: {
    [theme.breakpoints.down("sm")]: {
      marginRight: 0,
    },
  },
  addIdeaBtn: {
    [theme.breakpoints.down("sm")]: {
      marginRight: 1,
    },
  },
}));

export default function Navbar() {
  const navigate = useNavigate();


  const theme = useTheme();
  const [open, setOpen] = React.useState(false);


  const { authState: { user, authLoading }, loadUser } = useContext(AuthContext)
  React.useEffect(() => loadUser(), [])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const logout = async () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
    navigate('/')
  }

  const classes = useStyles();
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            GREENWICH
          </Typography>

          <Box display={"flex"} sx={{ marginLeft: "auto", justifyContent: "center" }}>
            <IconButton onClick={() => { }} sx={{ mr: 3 }} className={classes.notifyBtn}>
              <Badge badgeContent={4} color="error">
                <NotificationsIcon sx={{ color: "white" }} />
              </Badge>
            </IconButton>

            <Box className={classes.profileAvatar}>
              <Avatar alt="Remy Sharp" />
            </Box>
            {authLoading ?
              <Box className={classes.profileText} sx={{ ml: 1 }}>
                <Typography ></Typography>
                <Typography></Typography>
              </Box> : <Box marginLeft={2}>
                <Typography >{user.user}</Typography>
              </Box>}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "	rgb(26, 26, 26)",
            color: "rgb(217, 217, 217)",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{justifyContent: "center"}}>
          <Typography onClick={handleDrawerClose}>GREENWICH</Typography>
        </DrawerHeader>
        <Divider />
        <List>

          {user.role && mainNavbarItems.map((item, index) => (
            user.role === item.roles[0] || user.role === item.roles[1] || user.role === item.roles[2] || user.role === item.roles[3] ?
              <ListItem button key={item.id} onClick={() => navigate(item.route)}>
                <ListItemIcon sx={{ color: "rgb(217, 217, 217)" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
              : null
          ))}
        </List>
        <ListItem
          button
          onClick={() => logout()}
          sx={{ marginTop: -1 }}
        >
          <ListItemIcon sx={{ color: "rgb(217, 217, 217)" }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary={"Logout"} />
        </ListItem>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <MyBreadcrumbs />
        <Outlet />
      </Main>
    </Box>
  );
}

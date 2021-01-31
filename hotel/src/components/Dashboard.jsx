import React, { useEffect } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
import NotificationsIcon from "@material-ui/icons/Notifications";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AddBoxIcon from "@material-ui/icons/AddBox";
import EditIcon from "@material-ui/icons/Edit";
import AssessmentIcon from "@material-ui/icons/Assessment";
import HelpIcon from "@material-ui/icons/Help";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {
  Typography,
  MenuList,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Hidden,
} from "@material-ui/core";
import { useAuth } from "./context/AuthContext";
import { db } from "../firebase";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    backgroundColor: "#1a3efd",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "white",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: "#F7FAFC",
    padding: theme.spacing(3),
    maxHeight: "100vh",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

function Dashboard({ children, location: { pathname } }) {
  const classes = useStyles();
  const { currentUser, logout } = useAuth();
  const [userData, setUserData] = React.useState({});
  const history = useHistory();
  async function handleLogOut() {
    try {
      await logout();
      history.push("/signin");
    } catch {
      console.error("Logout Error");
    }
  }
  const currentTab = (pathname, path) => {
    if (pathname === path) {
      return { color: "#1a3efd" };
    }
  };
  useEffect(() => {
    if (currentUser !== null) {
      db.collection("hotels")
        .doc(currentUser.uid)
        .get()
        .then((doc) => {
          setUserData(doc.data());
        });
    }
  }, [currentUser]);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.header}>
          <Typography variant="h6">Bon Voyage</Typography>
          <NotificationsIcon />
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <Hidden smDown>
          <div className={classes.toolbar} />
        </Hidden>

        <List>
          <ListItem
            style={{
              display: "flex",
              flexDirection: "column",
              alignSelf: "center",
            }}
          >
            <ListItemAvatar>
              <Avatar>
                <PersonIcon style={{ fontSize: "40px" }} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText>
              <Typography variant="subtitle1" align="center" gutterBottom>
                {userData.name}
              </Typography>
              <Typography variant="subtitle2" align="center">
                {userData.city}
              </Typography>
            </ListItemText>
          </ListItem>
        </List>
        <Divider />
        <MenuList style={{ padding: "5px" }}>
          <MenuItem
            component={Link}
            to="/dashboard/overview"
            style={currentTab(pathname, "/dashboard/overview")}
          >
            <DashboardIcon />
            <Typography variant="subtitle1" style={{ marginLeft: "15px" }}>
              Overview
            </Typography>
          </MenuItem>
          <MenuItem
            component={Link}
            to="/dashboard/guests"
            style={currentTab(pathname, "/dashboard/guests")}
          >
            <EditIcon />
            <Typography variant="subtitle1" style={{ marginLeft: "15px" }}>
              Guests List
            </Typography>
          </MenuItem>
          {/* <MenuItem
            component={Link}
            to="/admin/dashboard/results"
            style={currentTab(pathname, "/admin/dashboard/results")}
          >
            <AssessmentIcon />
            <Typography variant="subtitle1" style={{ marginLeft: "15px" }}>
              Result
            </Typography>
          </MenuItem> */}
          <Divider />
          <MenuItem
            component={Link}
            to="admin/dashboard/support"
            style={currentTab(pathname, "admin/dashboard/support")}
          >
            <HelpIcon />
            <Typography variant="subtitle1" style={{ marginLeft: "15px" }}>
              Support
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleLogOut}>
            <ExitToAppIcon />
            <Typography variant="subtitle1" style={{ marginLeft: "15px" }}>
              Logout
            </Typography>
          </MenuItem>
        </MenuList>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}

export default withRouter(Dashboard);

import React, { useEffect } from "react";
import {
  TextField,
  makeStyles,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  ButtonGroup,
} from "@material-ui/core";
import Dashboard from "./Dashboard";
import { useAuth } from "./context/AuthContext";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { db } from "../firebase";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 24,
  },
  number: {
    fontSize: 36,
    color: "blue",
  },
  listItem: {
    width: "100%",
  },
  list: {
    width: "70%",
  },
});

function GuestsList() {
  const classes = useStyles();
  const [list, setList] = React.useState([]);

  useEffect(() => {
    db.collection("bookings")
      .where("status", "==", "accept")
      .onSnapshot((snapShot) => {
        if (snapShot.size) {
          let myList = [];
          snapShot.forEach((doc) => myList.push({ ...doc.data() }));
          setList(myList);
        }
      });
  }, [list]);

  return (
    <Dashboard>
      <Grid container xs={12} spacing={1}>
        <List className={classes.list}>
          {list.map((request, index) => {
            return (
              <ListItem button className={classes.listItem}>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary={request.guestName} />
                <ButtonGroup>
                  <Button color="primary">Check In</Button>
                </ButtonGroup>
              </ListItem>
            );
          })}
        </List>
      </Grid>
    </Dashboard>
  );
}

export default GuestsList;

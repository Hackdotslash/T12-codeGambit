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
  Modal,
} from "@material-ui/core";
import Dashboard from "./Dashboard";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { db } from "../firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 200,
  },
  title: {
    fontSize: 24,
  },
  number: {
    fontSize: 30,
    color: "#1a3efd",
  },
  actions: {
    alignItems: "center",
  },
  paper: {
    position: "absolute",
    width: 600,
    backgroundColor: theme.palette.background.paper,
    // border: '1px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}

function GuestsList() {
  const classes = useStyles();
  const [list, setList] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const handleCheckIn = (index) => {
    handleOpen();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    handleClose();
  };

  const modalbody = (
    <div style={modalStyle} className={classes.paper}>
      <Grid container xs={12} spacing={1}>
        <Grid item xs={12} style={{ display: "flex", flexDirection: "row" }}>
          <TextField
            variant="outlined"
            margin="normal"
            label="Temperature"
            fullWidth
          />
          <TextField
            variant="outlined"
            margin="normal"
            label="Oximeter"
            fullWidth
            style={{ marginLeft: "5px" }}
          />
        </Grid>
        <Button
          type="submit"
          size="large"
          variant="contained"
          color="primary"
          disableElevation
          style={{ marginLeft: "5px" }}
          // disabled={busy}
          className={classes.submit}
          onClick={handleSubmit}
        >
          Add
        </Button>
      </Grid>
    </div>
  );

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
      <List className={classes.list}>
        {list.map((request, index) => {
          return (
            <ListItem button className={classes.listItem}>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary={request.guestName} />
              <ButtonGroup>
                <Button onClick={() => handleCheckIn(index)} color="primary">
                  Check In
                </Button>
              </ButtonGroup>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
              >
                {modalbody}
              </Modal>
            </ListItem>
          );
        })}
      </List>
    </Dashboard>
  );
}

export default GuestsList;

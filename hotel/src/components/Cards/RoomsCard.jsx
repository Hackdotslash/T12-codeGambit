import React, { useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextField } from "@material-ui/core";
import { db } from '../../firebase';

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
    position: 'absolute',
    width: 600,
    backgroundColor: theme.palette.background.paper,
    // border: '1px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

function RoomsCard({ currentUser }) {
  const classes = useStyles();
  const [openAvailModal, setAvailOpen] = React.useState(false);
  const [openOccupModal, setOccupOpen] = React.useState(false);
  const [roomData, setRoomData] = React.useState({});
  const occupied = React.useRef();
  const available = React.useRef();
  const price = React.useRef();
  const [open, setOpen] = React.useState(false);
  const [modalStyle] = React.useState(getModalStyle);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const loadData = () => {
    if (currentUser !== null) {
      db.collection('hotels').doc(currentUser.uid).get().then((doc) => {
        console.log("Doc", doc);
        setRoomData(doc.data());
      });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentUser !== null) {
      try {
        db.collection('hotels').doc(currentUser.uid).set({
          availableRooms: available.current.value,
          occupiedRooms: occupied.current.value,
          price: price.current.value
        }, { merge: true });
      } catch (err) {
        console.log(err);
      }
    }
    available.current.value = "";
    occupied.current.value = "";
    price.current.value = "";
    loadData();
    handleClose();
  };

  const modalbody = (
    <div style={modalStyle} className={classes.paper}>
      <Grid container xs={12} spacing={1}>
        <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row' }}>
          <TextField
            variant="outlined"
            margin="normal"
            label="Available"
            inputRef={available}
            fullWidth
          />
          <TextField
            variant="outlined"
            margin="normal"
            label="Occupied"
            inputRef={occupied}
            fullWidth
            style={{ marginLeft: '5px' }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            label="Price"
            inputRef={price}
            fullWidth
            style={{ marginLeft: '5px' }}
          />
        </Grid>
        <Button
          type="submit"
          size="large"
          variant="contained"
          color="primary"
          disableElevation
          style={{ marginLeft: '5px' }}
          // disabled={busy}
          className={classes.submit}
          onClick={handleSubmit}
        >Update</Button>
      </Grid>
    </div>
  );

  useEffect(() => {
    loadData();
    console.log(roomData);
  }, []);

  return (
    <React.Fragment>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h4" style={{ color: '#1a3efd' }} gutterBottom>
            Rooms
        </Typography>
          <Grid>
            <Grid container spacing={2}>
              <Grid item xs>
                <Button
                  className={classes.roomBtns}
                  onClick={() => {
                    setAvailOpen(true);
                  }}
                  variant="outlined"
                >
                  <Typography variant="h6">Available</Typography>
                </Button>
                <Typography variant="h6" className={classes.number}> {roomData.availableRooms} </Typography>
              </Grid>
              <Grid item xs>
                <Button
                  className={classes.roomBtns}
                  onClick={() => {
                    setOccupOpen(true);
                  }}
                  variant="outlined"
                >
                  <Typography variant="h6">Occupied</Typography>
                </Button>
                <div className={classes.number}> {roomData.occupiedRooms} </div>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions className={classes.actions}>
          <Button onClick={handleOpen} style={{ borderColor: '#1a3efd', color: '#1a3efd' }} variant="outlined">Update</Button>
        </CardActions>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {modalbody}
      </Modal>
    </React.Fragment>
  );
}

export default RoomsCard;

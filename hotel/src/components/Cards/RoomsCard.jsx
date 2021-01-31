import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minHeight: 200,
  },
  title: {
    fontSize: 24,
  },
  number: {
    fontSize: 36,
    color: "blue",
  },
  actions: {
    alignItems: "center",
  },
});

function RoomsCard() {
  const classes = useStyles();
  const [openAvailModal, setAvailOpen] = React.useState(false);
  const [openOccupModal, setOccupOpen] = React.useState(false);

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="primary" gutterBottom>
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
                <div>Available</div>
              </Button>
              <div className={classes.number}> 10 </div>
            </Grid>
            <Grid item xs>
              <Button
                className={classes.roomBtns}
                onClick={() => {
                  setOccupOpen(true);
                }}
                variant="outlined"
              >
                <div>Occupied</div>
              </Button>
              <div className={classes.number}> 5 </div>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button size="small">Show More</Button>
      </CardActions>
    </Card>
  );
}

export default RoomsCard;

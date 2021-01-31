import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid } from "@material-ui/core";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";

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
  staffcon: {
    margin: 5,
    padding: 5,
    fontSize: 16,
  },
});

function StaffCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Staff Members
        </Typography>

        <Grid>
          <Grid container spacing={2}>
            <Grid item xs>
              <Container className={classes.staffcon}>
                <AssignmentIndIcon />
                <div> Himesh </div>
              </Container>
            </Grid>
            <Grid item xs>
              <Container className={classes.staffcon}>
                <AssignmentIndIcon />
                <div> Rajesh </div>
              </Container>
            </Grid>
            <Grid item xs>
              <Container className={classes.staffcon}>
                <AssignmentIndIcon />
                <div> Raj </div>
              </Container>
            </Grid>
            <Grid item xs>
              <Container className={classes.staffcon}>
                <AssignmentIndIcon />
                <div> Avni </div>
              </Container>
            </Grid>
            <Grid item xs>
              <Container className={classes.staffcon}>
                <AssignmentIndIcon />
                <div> Hema </div>
              </Container>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button size="small">Add More</Button>
      </CardActions>
    </Card>
  );
}

export default StaffCard;

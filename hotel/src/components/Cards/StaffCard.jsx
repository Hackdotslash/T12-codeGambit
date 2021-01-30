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
    minWidth: 275,
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

function StaffCard() {
  const classes = useStyles();

  return (
    <Card>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Staff
        </Typography>

        <Grid>
          <Grid container spacing={2}>
            <Grid item xs>
              <Container>
                <AssignmentIndIcon />
                <div> Staff </div>
              </Container>
            </Grid>
            <Grid item xs>
              <Container>
                <AssignmentIndIcon />
                <div> Staff </div>
              </Container>
            </Grid>
            <Grid item xs>
              <Container>
                <AssignmentIndIcon />
                <div> Staff </div>
              </Container>
            </Grid>
            <Grid item xs>
              <Container>
                <AssignmentIndIcon />
                <div> Staff </div>
              </Container>
            </Grid>
            <Grid item xs>
              <Container>
                <AssignmentIndIcon />
                <div> Staff </div>
              </Container>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

export default StaffCard;

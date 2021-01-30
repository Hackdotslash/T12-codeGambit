import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

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

function RequestsCard() {
  const classes = useStyles();

  return (
    <Card>
      <CardContent>
        <Typography className={classes.title} color="primary" gutterBottom>
          List of Requests
        </Typography>
      </CardContent>
      <CardActions>
        <Button className={classes.button} size="small">
          Show More
        </Button>
      </CardActions>
    </Card>
  );
}

export default RequestsCard;

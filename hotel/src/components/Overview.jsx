import React from "react";
import Dashboard from "./Dashboard";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import RoomsCard from "./Cards/RoomsCard";
import StaffCard from "./Cards/StaffCard";
import RequestsCard from "./Cards/RequestsCard";
import { useAuth } from "./context/AuthContext";

const useStyles = makeStyles({});

function Overview() {
  const classes = useStyles();
  const { currentUser } = useAuth();

  return (
    <Dashboard>
      <Grid>
        <Grid container spacing={5}>
          <Grid item xs>
            <RoomsCard currentUser={currentUser} />
          </Grid>
          <Grid item xs>
            <StaffCard />
          </Grid>
        </Grid>

        <Grid container spacing={5}>
          <Grid item xs>
            <RequestsCard />
          </Grid>
        </Grid>
      </Grid>
    </Dashboard>
  );
}

export default Overview;

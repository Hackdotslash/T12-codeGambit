import React, { useEffect } from 'react';
import { TextField, makeStyles, Grid } from '@material-ui/core';
import Dashboard from './Dashboard';
import { useAuth } from "./context/AuthContext";
import { db } from "../firebase";

function Profile() {
  const { currentUser } = useAuth();
  const [userData, setUserData] = React.useState({});
  console.log(userData);

  useEffect(() => {
    if (currentUser !== null) {
      db.collection('hotels').doc(currentUser.uid).get().then(doc => {
        setUserData(doc.data());
      })
    }
  }, [currentUser]);

  return (
    <Dashboard>
      <Grid container xs={12} spacing={1}>
        <TextField
          id="outlined-helperText"
          label="Name"
          defaultValue={userData.name}
          variant="outlined"
        />
      </Grid>
    </Dashboard>
  )
}

export default Profile;

import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { TextField, Paper, InputAdornment, CssBaseline, Typography, Button, Grid, Container, makeStyles } from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import CallIcon from '@material-ui/icons/Call';

import { useAuth } from "./context/AuthContext";
import bk from "./images/bk1.png";

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  paper: {
    margin: theme.spacing(1, 5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  sub: {
    padding: theme.spacing(2),
  },

  logo: {
    padding: theme.spacing(1, 0, 2, 3),
    // display: 'flex',
    // flexDirection: 'column',
    alignItems: 'left',
    fontSize: '35px',
    fontFamily: 'Abril Fatface'
    // fontFamily:theme.typography.fontFamily('')
  },

  image: {
    backgroundImage: `url(${bk})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  avatar: {
    width: '70px',
    alignContent: 'center',
    marginTop: theme.spacing(2)
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
    alignItems: 'center'
  },
}));

export default function Signup(props) {
  const classes = useStyles();
  const email = useRef();
  const password = useRef();
  const name = useRef();
  const gstn = useRef();
  const city = useRef();
  const pincode = useRef();
  const phnNum = useRef();
  const { signup } = useAuth();
  const [busy, setBusy] = React.useState(false);
  const [error, seterror] = React.useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      seterror("");
      setBusy(true);
      signup(email.current.value, password.current.value, name.current.value, city.current.value, pincode.current.value, phnNum.current.value, gstn.current.value);
      props.history.push("/signin");
    } catch (err) {
      seterror(err);
    }
    setBusy(false);
  };

  const signUpForm = () => {
    return (
      <React.Fragment>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5" className={classes.paper}><b>Sign Up</b></Typography>
          <form onSubmit={handleSubmit} className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="Name"
              label="Name"
              inputRef={name}
              autoFocus
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircleIcon />
                  </InputAdornment>
                ),
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                id="Name"
                label="City"
                inputRef={city}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationCityIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                id="Name"
                label="Pincode"
                inputRef={pincode}
                style={{ marginLeft: '5px' }}
              />
            </div>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="Name"
              label="Contact Number"
              inputRef={phnNum}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CallIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="Name"
              label="GST Number"
              inputRef={gstn}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ConfirmationNumberIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              inputRef={email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AlternateEmailIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              inputRef={password}
              autoComplete="current-password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Grid container justify="center" alignItems="center">
              <Button
                type="submit"
                size="large"
                variant="contained"
                color="primary"
                disableElevation
                disabled={busy}
                className={classes.submit}
                onClick={handleSubmit}
              >Sign Up</Button>
            </Grid>
          </form>
          {/* <Grid container> */}
          <Grid item>
            {/* <Link href="./Signup.js" variant="body2">
              {"Don't have an account? Sign Up"}
              </Link> */}
              Already have an Account? <Link to="/signin">Sign In</Link>
          </Grid>
          {/* </Grid> */}
        </div>
      </React.Fragment>
    );
  };

  const logo = () => {
    return (
      <React.Fragment>
        <Grid container direction="column" justify="flex-start" alignItems="flex-start">
          <Grid item xs>
            <Typography className={classes.logo} variant="h3">Bon Voyage</Typography>
          </Grid>
        </Grid>
        <Grid container className={classes.sub} direction="row" justify="flex-start" alignItems="center">
          <Grid item >
            <InputAdornment><CheckCircleIcon color="primary" /></InputAdornment>
          </Grid>
          <Grid item>
            <Typography variant="h6">Get Started Quickly</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit.</Typography>
          </Grid>
        </Grid>
        <Grid container className={classes.sub} direction="row" justify="flex-start" alignItems="center">
          <Grid item>
            <InputAdornment><CheckCircleIcon color="primary" /></InputAdornment>
          </Grid>
          <Grid item>
            <Typography variant="h6">Get Started Quickly</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit.</Typography>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <div className={classes.image}>
      <Container>
        <Grid container component="main" className={classes.root} alignItems="center">
          <CssBaseline />
          <Grid item sm={4} md={7}>
            {logo()}
          </Grid>
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6}>
            {signUpForm()}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
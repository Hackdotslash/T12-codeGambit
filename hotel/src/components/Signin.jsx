import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { TextField, Paper, InputAdornment, CssBaseline, Typography, Button, Grid, Container, makeStyles } from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import { useAuth } from "./context/AuthContext";
import { auth } from '../firebase';
import bk from "./images/bk1.png";

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    // marginTop:theme.spacing(1),
    // opacity:'0.8'
  },
  paper: {
    margin: theme.spacing(1, 5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

  },

  logo: {
    alignItems: 'left',
    fontSize: '30px',
    fontFamily: 'Roboto Condensed'
    // fontFamily:theme.typography.fontFamily('')

  },

  image: {
    backgroundImage: `url(${bk})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    // opacity:'0.8'
  },

  avatar: {
    width: '70px',
    alignContent: 'center',
    marginTop: theme.spacing(2)
    // marginLeft:theme.spacing(18)
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
    alignItems: 'center',
    // background:'#0B75F4'
  },
}));

export default function Signin(props) {
  const classes = useStyles();
  const email = useRef();
  const password = useRef();
  const { signin } = useAuth();
  const [busy, setBusy] = React.useState(false);
  const [error, seterror] = React.useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      seterror("");
      setBusy(true);
      auth
        .signInWithEmailAndPassword(email.current.value, password.current.value)
        .then(async (cred) => {
          props.history.push("/dashboard");
        });
    } catch (err) {
      seterror(err);
    }
    setBusy(false);
  };

  const logo = () => {
    return (
      <React.Fragment>
        <div className={classes.logo}>
          <Grid container direction="row" justify="flex-start" alignItems="center">
            <p><b>Bon Voyage</b></p>
          </Grid>
        </div>
      </React.Fragment>
    )
  }

  const signInForm = () => {
    return (
      <React.Fragment>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5" className={classes.paper}><b>Sign In</b></Typography>
          <form onSubmit={handleSubmit} className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              inputRef={email}
              autoComplete="email"
              autoFocus
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
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
                  </Link>
            </Grid>
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
              >Sign In</Button>
            </Grid>
          </form>
          <Grid item >
            Don't have an Account? <Link to="/signup">Sign Up</Link>
          </Grid>
        </div>
      </React.Fragment>
    );
  };

  return (
    <div className={classes.image}>
      <Grid container component="main" className={classes.root} direction="column" justify="center" alignItems="center">
        <CssBaseline />
        {logo()}
        <Grid item xs={false} sm={8} md={5} component={Paper}>
          <Container elevation={6} >
            {signInForm()}
          </Container>
        </Grid>
      </Grid>
    </div>
  );
}

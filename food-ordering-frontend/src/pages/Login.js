import React, { useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { authStore } from "../store/AuthStore";
import { navigate, Link as RouterLink } from "@reach/router";
export default function SignIn() {
  const classes = useStyles();

  const authState = useContext(authStore);
  const { dispatch } = authState;

  const [fields, setFields] = React.useState({
    username: "",
    password: ""
  });

  const [loginPoruka, setloginPoruka] = React.useState("");

  const [fieldErrors, setFieldErrors] = React.useState({
    username: "",
    password: ""
  });

  const initialFieldErrors = {
    username: "",
    password: ""
  };

  const handleLogin = event => {
    event.preventDefault();

    fetch("http://localhost:8080/api/admin/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        //"Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        username: fields.username,
        password: fields.password
      })
    })
      .then(response => {
        if (!response.ok) {
          throw response;
        }
        return response.json(); //we only get here if there is no error
      })
      .then(json => {
        setFieldErrors(initialFieldErrors);
        setloginPoruka(`uspjesan login! token je: ${JSON.stringify(json)}`);
        //ovde treba login handle

        dispatch({
          type: "login",
          payload: {
            token: json.token,
            username: fields.username
          }
        });
        //nakon uspjesnog logina idi na home
        navigate("/");
      })
      .catch(err => {
        if (err.text) {
          err.text().then(errorMessage => {
            const errObj = JSON.parse(errorMessage);
            console.log(errObj);
            setFieldErrors({
              ...initialFieldErrors,
              username: "The username or password you have entered is invalid."
            });
          });
        } else {
          setFieldErrors(initialFieldErrors);
          console.log(err);
          setloginPoruka("Cudna greska! err: " + JSON.stringify(err));
        }
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <p>{loginPoruka ? loginPoruka : ""}</p>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} validate="true" onSubmit={handleLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            type="email"
            value={fields.username}
            onChange={event => {
              setFields({ ...fields, username: event.target.value });
            }}
            helperText={fieldErrors.username}
            error={!!fieldErrors.username}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={fields.password}
            onChange={event => {
              setFields({ ...fields, password: event.target.value });
            }}
            helperText={fieldErrors.password}
            error={!!fieldErrors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link component={RouterLink} to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        Aljosa Vukotic
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

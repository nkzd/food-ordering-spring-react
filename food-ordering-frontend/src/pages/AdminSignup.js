import React from "react";
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
import { Link as RouterLink, navigate } from "@reach/router";

export default function SignUp() {
  const classes = useStyles();

  const [isLoading, setIsLoading] = React.useState(false);

  const [fields, setFields] = React.useState({
    username: "",
    password: "",
    confirmPassword: ""
  });
  const initialFieldErrors = {
    username: "",
    password: "",
    confirmPassword: ""
  };
  const [fieldErrors, setFieldErrors] = React.useState(initialFieldErrors);

  const handleRegister = () => {
    setIsLoading(true);

    fetch("http://localhost:8080/api/admin/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: fields.username,
        password: fields.password,
        confirmPassword: fields.confirmPassword
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
        navigate("/admin/login");
      })
      .catch(err => {
        if (err.text) {
          err.text().then(errorMessage => {
            const errObj = JSON.parse(errorMessage);

            setFieldErrors({ ...initialFieldErrors, ...errObj });
          });
        } else {
          setFieldErrors(initialFieldErrors);
        }
      });
    setIsLoading(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <p>{isLoading ? "Loading..." : ""}</p>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form
          className={classes.form}
          //noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                value={fields.username}
                onChange={event => {
                  setFields({ ...fields, username: event.target.value });
                }}
                helperText={fieldErrors.username}
                error={!!fieldErrors.username}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={fields.password}
                helperText={fieldErrors.password}
                error={!!fieldErrors.password}
                onChange={event => {
                  setFields({ ...fields, password: event.target.value });
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                helperText={fieldErrors.confirmPassword}
                value={fields.confirmPassword}
                error={!!fieldErrors.confirmPassword}
                onChange={event => {
                  setFields({ ...fields, confirmPassword: event.target.value });
                }}
              />
            </Grid>
          </Grid>
          <Button
            onClick={handleRegister}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
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
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

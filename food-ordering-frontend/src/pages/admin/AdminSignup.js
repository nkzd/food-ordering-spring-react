import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link as RouterLink, navigate } from "@reach/router";
import ServerErrorMessage from "../../components/admin/ServerErrorMessage";
import {apiUrl} from "../../App";
import CircularProgress from '@material-ui/core/CircularProgress';
const SignUp = () => {
  const classes = useStyles();
  const [serverError, setServerError] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const initialFields = {
    username: "",
    password: "",
    confirmPassword: ""
  };
  const [fields, setFields] = useState(initialFields);
  const [fieldErrors, setFieldErrors] = useState(initialFields);

  const handleRegister = () => {
    setLoading(true);
    fetch(`${apiUrl}/api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: fields.username,
        password: fields.password,
        confirmPassword: fields.confirmPassword,
        role: "ADMIN"
      })
    })
      .then(response => {
        if (!response.ok) {
          throw response;
        }
        setFieldErrors(initialFields);
        setLoading(false);
        navigate("/admin/login",{ state: { sucReg: true }});
      })
      .catch(err => {
        if (err.text) {
          err.text().then(errorMessage => {
            const errObj = JSON.parse(errorMessage);
            setLoading(false);
            setFieldErrors({ ...initialFields, ...errObj });
          });
        } else {
          setLoading(false);
          setServerError(true)
          setFieldErrors(initialFields);
        }
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <ServerErrorMessage error={serverError}/>
        {loading && <CircularProgress />}
        <form
          className={classes.form}
          validate="true"
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
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
                required
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
                required
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
              <Link component={RouterLink} to="/admin/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
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
export default SignUp;
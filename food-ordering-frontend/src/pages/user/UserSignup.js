import React, {useState} from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import mealImage from "../../images/pizza5.jpg";
import {apiUrl} from "../../App"
import ServerErrorMessage from "../../components/admin/ServerErrorMessage";
import { Link as RouterLink, navigate } from "@reach/router";

const UserSignup = () => {
  const classes = useStyles();

  const [serverError, setServerError] = useState(false);
  const [loading, setLoading] = useState(false);

  const initialFields = {
    username: "",
    password: "",
    confirmPassword: "",
    firstName:"",
    lastName:"",
    address:""
  };
  const [fields, setFields] = useState(initialFields);
  const [fieldErrors, setFieldErrors] = useState(initialFields);

  const handleRegister = (event) => {
    event.preventDefault();
    setLoading(true);
    fetch(`${apiUrl}/api/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: fields.username,
        password: fields.password,
        confirmPassword: fields.confirmPassword,
        role: "USER",
        userInfo: {
          firstName: fields.firstName,
          lastName: fields.lastName,
          address: fields.address,
        }
      })
    })
    .then(response => {
      if (!response.ok) {
        throw response;
      }
      setLoading(false);
      setFieldErrors(initialFields);
      navigate("/login",{ state: { sucReg: true }});
    })
    .catch(err => {
      setLoading(false);
      if (err.text) {
        err.text().then(errorMessage => {
          const errObj = JSON.parse(errorMessage);
          setFieldErrors({ ...initialFields, ...errObj });
        });
      } else {
        setServerError(true);
        setFieldErrors(initialFields);
      }
    });
  };


  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <ServerErrorMessage error={serverError}/>
          <form className={classes.form} validate="true" onSubmit={handleRegister}>
            <Grid container spacing={2}>
              
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Email Address"
                  name="username"
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
                  onChange={event => {
                    setFields({ ...fields, password: event.target.value });
                  }}
                  helperText={fieldErrors.password}
                  error={!!fieldErrors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  value={fields.confirmPassword}
                  onChange={event => {
                    setFields({ ...fields, confirmPassword: event.target.value });
                  }}
                  helperText={fieldErrors.confirmPassword}
                  error={!!fieldErrors.confirmPassword}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={fields.firstName}
                  onChange={event => {
                    setFields({ ...fields, firstName: event.target.value });
                  }}
                  helperText={fieldErrors.firstName}
                  error={!!fieldErrors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  value={fields.lastName}
                  onChange={event => {
                    setFields({ ...fields, lastName: event.target.value });
                  }}
                  helperText={fieldErrors.lastName}
                  error={!!fieldErrors.lastName}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  autoComplete="address"
                  name="address"
                  variant="outlined"
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  value={fields.address}
                  onChange={event => {
                    setFields({ ...fields, address: event.target.value });
                  }}
                  helperText={fieldErrors.address}
                  error={!!fieldErrors.address}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={loading}
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
      </Grid>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
    </Grid>
  );
}


const useStyles = makeStyles(theme => ({
    root: {
      height: "100vh"
    },
    image: {
      backgroundImage: `url(${mealImage})`,
      backgroundRepeat: "no-repeat",
      backgroundColor:
        theme.palette.type === "dark"
          ? theme.palette.grey[900]
          : theme.palette.grey[50],
      backgroundSize: "cover",
      backgroundPosition: "center"
    },
    paper: {
      margin: theme.spacing(8, 4),
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

  export default UserSignup;
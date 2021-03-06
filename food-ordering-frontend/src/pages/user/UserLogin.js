import React, {useState, useContext} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import pizzaImage from "../../images/pizza2.jpg";
import { navigate, Link as RouterLink } from "@reach/router";
import CircularProgress from '@material-ui/core/CircularProgress';
import { authStore } from "../../store/AuthStore";
import {apiUrl} from "../../App";
import ServerErrorMessage from "../../components/admin/ServerErrorMessage";
const UserLogin = (props) => {
  const classes = useStyles();

  const authState = useContext(authStore);
  const { dispatch } = authState;
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);


  const initialFields = {
    username: "",
    password: "",
    checked: false
  };

  const [fields, setFields] = useState(initialFields);

  const [fieldErrors, setFieldErrors] = useState(initialFields);

  //Show successful registration message if user just registrated.
  let showSuccessAfterRegistration=false;
  try{
    if(props.location.state.sucReg===true)
      showSuccessAfterRegistration=true;
  }catch(err){
    showSuccessAfterRegistration=false;
  }

  const handleLogin = event => {
    event.preventDefault();
    setLoading(true);
    fetch(`${apiUrl}/api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
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
        return response.json(); 
      })
      .then(json => {
        setFieldErrors(initialFields);

        dispatch({
          type: "userLogin",
          payload: {
            token: json.token,
            username: fields.username,
            rememberMe: fields.checked
          }
        });
        setServerError(false);
        setLoading(false);
        navigate("/");
      })
      .catch(err => {
        if (err.text) {
            setLoading(false);
            setFieldErrors({
              ...initialFields,
              username: "The username or password you have entered is invalid."
          });
        } else {
          setLoading(false);
          setServerError(true);
          setFieldErrors(initialFields);
        }
      });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {showSuccessAfterRegistration && 
          <Typography className={classes.successfulRegistration} gutterBottom>
              Registration successful. Please login.
          </Typography>}
          <ServerErrorMessage error={serverError}/>
          {loading && <CircularProgress />}
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" checked={fields.checked} 
              onChange={event=>{
                setFields({ ...fields, checked: event.target.checked });
              }}/>}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={loading}
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
      </Grid>
    </Grid>
  );
}


const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${pizzaImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  successfulRegistration: {
    color: "#26a69a",
    textAlign: "center",
    marginTop: theme.spacing(2)
  }
}));

export default UserLogin;
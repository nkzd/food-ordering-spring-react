import React,{useContext, useState, useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { authStore } from "../../store/AuthStore";
import {apiUrl} from "../../App";
import HeroOverlay from "../../components/user/HeroOverlay";
import CircularProgress from '@material-ui/core/CircularProgress';
import ServerErrorMessage from "../../components/admin/ServerErrorMessage";
import { Typography } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Footer from "../../components/user/Footer";
import Link from "@material-ui/core/Link";
import { navigate, Link as RouterLink } from "@reach/router";

const UserProfile = () => {

    const authContext = useContext(authStore);
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState(false);
    const [openSnack, setOpenSnack] = React.useState(false);

    const initialProfileFields = {
        firstName:"",
        lastName:"",
        address:""
    };
    const [profileFields, setProfileFields] = useState(initialProfileFields);
    const [profileFieldErrors, setProfileFieldErrors] = useState(initialProfileFields);

    
    const initialPasswordFields = {
      password: "",
      confirmPassword: ""
    }

    const [passwordFields, setPasswordFields] = useState(initialPasswordFields);
    const [passwordFieldErrors, setPasswordFieldErrors] = useState(initialPasswordFields);

    useEffect(()=>{

        fetch(`${apiUrl}/api/user/userinfo`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: authContext.state.userState.token
            }
          })
          .then(response => {
            if (!response.ok) {
              throw response;
            }
            return response.json(); 
          }).then(json=>{
            setProfileFields(json)
          })
          .catch(err => {

          });
    },[])

    const handleCloseSnack = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }

      setOpenSnack(false);
    };

    const handleProfileChange = (event) => {
      event.preventDefault();
      setLoading(true);
      fetch(`${apiUrl}/api/user/userinfo`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: authContext.state.userState.token
        },
        body: JSON.stringify({
            firstName: profileFields.firstName,
            lastName: profileFields.lastName,
            address: profileFields.address
        })
      })
      .then(response => {
        if (!response.ok) {
          throw response;
        }
        setLoading(false);
        setProfileFieldErrors(initialProfileFields);
        setServerError(false);
        setOpenSnack(true);
      })
      .catch(err => {
        setLoading(false);
        if (err.text) {
          err.text().then(errorMessage => {
            const errObj = JSON.parse(errorMessage);
            setProfileFieldErrors({ ...initialProfileFields, ...errObj });
          });
        } else {
          setServerError(true);
          setProfileFieldErrors(initialProfileFields);
        }
      });
    };   
    const handlePasswordChange = (event) => {
      event.preventDefault();
      setLoading(true);
      fetch(`${apiUrl}/api/user/changepassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authContext.state.userState.token
        },
        body: JSON.stringify({
            password: passwordFields.password,
            confirmPassword: passwordFields.confirmPassword
        })
      })
      .then(response => {
        if (!response.ok) {
          throw response;
        }
        setLoading(false);
        setPasswordFields(initialPasswordFields);
        setPasswordFieldErrors(initialPasswordFields);
        setServerError(false);
        setOpenSnack(true);
      })
      .catch(err => {
        setLoading(false);
        if (err.text) {
          err.text().then(errorMessage => {
            const errObj = JSON.parse(errorMessage);
            setPasswordFieldErrors({ ...initialPasswordFields, ...errObj });
          });
        } else {
          setServerError(true);
          setPasswordFieldErrors(initialPasswordFields);
        }
      });

    }
    return (
        <React.Fragment>
          <CssBaseline />
          <HeroOverlay imageSelection="waiter"/>
          <br/>

            <Container maxWidth="sm">
                <Grid container justify = "center">
                    {loading && <CircularProgress />}
                </Grid>
              <ServerErrorMessage error={serverError}/>
                <Paper className={classes.paper}>
                <Typography variant="h5">
                    Profile details
                </Typography>
                <Typography variant="body2">
                    Don&apos;t forget to submit your profile changes.
                </Typography>
                <form validate="true" onSubmit={handleProfileChange}>
                    <Grid container
                    direction="row"
                    justify="center"
                    alignItems="flex-start">
                        
                        <Grid
                        className={classes.firstRow}
                        item
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing={5}
                        >
                            <Grid item>
                                <TextField
                                id="firstName"
                                label="First Name"
                                required
                                value={profileFields.firstName}
                                onChange={event => {
                                  setProfileFields({ ...profileFields, firstName: event.target.value });
                                }}
                                helperText={profileFieldErrors.firstName}
                                error={!!profileFieldErrors.firstName}
                                />
                            </Grid>
                            <Grid item>
                            <TextField
                                id="lastName"
                                label="Last name"
                                required
                                value={profileFields.lastName}
                                onChange={event => {
                                  setProfileFields({ ...profileFields, lastName: event.target.value });
                                }}
                                helperText={profileFieldErrors.lastName}
                                error={!!profileFieldErrors.lastName}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={10}>
                            <TextField
                                id="address"
                                label="Address"
                                required
                                fullWidth
                                value={profileFields.address}
                                error={!!profileFieldErrors.address}
                                onChange={event => {
                                  setProfileFields({ ...profileFields, address: event.target.value });
                                }}
                                helperText={profileFieldErrors.address}
                            />
                        </Grid>
                        <Grid item xs={10} align="center">
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={loading}
                            >
                            Update details
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <br/>
                <br/>
                {/*PASSWORD*/}
                <Typography variant="h5" gutterBottom>
                  Change password
                </Typography>
                
                <form validate="true" onSubmit={handlePasswordChange}>
                    <Grid container
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
                    spacing={3}
                    >
                        
                        <Grid item xs={10}>
                            <TextField
                                id="password"
                                label="New password"
                                type="password"
                                required
                                fullWidth
                                value={passwordFields.password}
                                onChange={event => {
                                    setPasswordFields({ ...passwordFields, password: event.target.value });
                                }}
                                helperText={passwordFieldErrors.password}
                                error={!!passwordFieldErrors.password}
                            />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField
                                id="confirmPassword"
                                label="Confirm new password"
                                type="password"
                                required
                                fullWidth
                                value={passwordFields.confirmPassword}
                                onChange={event => {
                                  setPasswordFields({ ...passwordFields, confirmPassword: event.target.value });
                                }}
                                helperText={passwordFieldErrors.confirmPassword}
                                error={!!passwordFieldErrors.confirmPassword}
                            />
                        </Grid>
                        <Grid item xs={10} align="center">
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={loading}
                            >
                            Change Password
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <br/>
                <Grid container>
                  <Grid item>
                    <Link component={RouterLink} to={`/restaurants/`} variant="body2">
                      {"< Back to restaurants"}
                    </Link>
                  </Grid>
                </Grid>
                </Paper>
                <Footer/>
            </Container>
            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              open={openSnack}
              autoHideDuration={6000}
              onClose={handleCloseSnack}
              >
                <SnackbarContent style={{
                  backgroundColor: (!serverError) ? "#4caf50" :  "#f44336"
                  }}
                  message={<span id="client-snackbar">Successfully changed!</span>}
                />
              </Snackbar>
        </React.Fragment>
      );
} 

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(3)
    },
    firstRow:{
        marginTop:theme.spacing(1),
        marginBottom:theme.spacing(1)
    },
    submit: {
        marginTop: theme.spacing(5)
    },
    successBar: {
      backgroundColor: "#4caf50"
    }
  }));

  export default UserProfile;
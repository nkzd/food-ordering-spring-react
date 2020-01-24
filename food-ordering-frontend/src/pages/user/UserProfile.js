import React,{useContext, useState, useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { authStore } from "../../store/AuthStore";
import { navigate } from "@reach/router";
import {apiUrl} from "../../App";
import HeroOverlay from "../../components/user/HeroOverlay";
import CircularProgress from '@material-ui/core/CircularProgress';
import ServerErrorMessage from "../../components/admin/ServerErrorMessage";
import { Typography } from '@material-ui/core';

const UserProfile = () => {

    const authContext = useContext(authStore);
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState(false);

    const initialFields = {
        firstName:"",
        lastName:"",
        address:""
    };
    const [fields, setFields] = useState(initialFields);
    const [fieldErrors, setFieldErrors] = useState(initialFields);

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
              setFields(json)
          })
          .catch(err => {

          });
    },[])
    
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
              firstName: fields.firstName,
              lastName: fields.lastName,
              address: fields.address
          })
        })
        .then(response => {
          if (!response.ok) {
            throw response;
          }
          setLoading(false);
          setFieldErrors(initialFields);
          setServerError(false);
          navigate("/restaurants");
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
        <React.Fragment>
          <CssBaseline />
          <HeroOverlay/>
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
                                value={fields.firstName}
                                onChange={event => {
                                    setFields({ ...fields, firstName: event.target.value });
                                }}
                                helperText={fieldErrors.firstName}
                                />
                            </Grid>
                            <Grid item>
                            <TextField
                                id="lastName"
                                label="Last name"
                                required
                                value={fields.lastName}
                                onChange={event => {
                                    setFields({ ...fields, lastName: event.target.value });
                                }}
                                helperText={fieldErrors.lastName}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={10}>
                            <TextField
                                id="address"
                                label="Address"
                                required
                                fullWidth
                                value={fields.address}
                                onChange={event => {
                                    setFields({ ...fields, address: event.target.value });
                                }}
                                helperText={fieldErrors.address}
                            />
                        </Grid>
                        <Grid item xs={10}>
                        <Button
                            type="submit"
                            fullWidth
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
                </Paper>
            </Container>
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
    }
  }));

  export default UserProfile;
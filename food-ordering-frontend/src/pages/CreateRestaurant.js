import React, {useState, useContext} from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Copyright from "../components/Copyright";
import { navigate } from "@reach/router";
import {authStore} from "../store/AuthStore"
export default function SignUp() {
  const classes = useStyles();
  const authContext = useContext(authStore);

  const initialFields = {
    name: "",
    email: "",
    address:"",
    description: "",
    pictureUrl: ""
  }

  const initialFieldsErrors = {
    name: "",
    email: "",
    address:"",
    description: "",
    pictureUrl: ""
  }

  const [restaurantFields, setRestaurantFields] = useState(initialFields);

  const [fieldErrors, setFieldErrors] = useState(initialFieldsErrors);

  const handleCreate = event => {
    event.preventDefault();
  
    fetch("http://localhost:8080/api/admin/restaurant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": authContext.state.token
      },
      body: JSON.stringify({
        name: restaurantFields.name,
        email: restaurantFields.email,
        address: restaurantFields.address,
        description: restaurantFields.description,
        pictureUrl: restaurantFields.pictureUrl
      })
    })
      .then(response => {
        if (!response.ok) {
          throw response;
        }
        return response.json(); //we only get here if there is no error
      })
      .then(json => {
        setFieldErrors(initialFields)
      })
      .then(() => {
        navigate("/admin/restaurants/");
      })
      .catch(err => {
        if (err.text) {
          err.text().then(errorMessage => {
            const errObj = JSON.parse(errorMessage);
            console.log(errObj);

            setFieldErrors({
              ...initialFieldsErrors,
              ...errObj
            });
          });
        } else {
          setFieldErrors(initialFields);
        }
      });
  };


  return (
  
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <RestaurantIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add new restaurant
          
        </Typography>
        <form className={classes.form} validate="true" onSubmit={handleCreate}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                id="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                label="Restaurant Name"
                value={restaurantFields.name}
                onChange={event=>{
                  setRestaurantFields({...restaurantFields, name: event.target.value});
                }}
                helperText={fieldErrors.name}
                error={!!fieldErrors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="email"
                name="email"
                variant="outlined"
                required
                fullWidth
                label="Email address"
                autoComplete="email"
                value={restaurantFields.email}
                onChange={event=>{
                  setRestaurantFields({...restaurantFields, email: event.target.value});
                }}
                helperText={fieldErrors.email}
                error={!!fieldErrors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="address"
                name="address"
                variant="outlined"
                required
                fullWidth
                label="Restaurant address"
                value={restaurantFields.address}
                onChange={event=>{
                  setRestaurantFields({...restaurantFields, address: event.target.value});
                }}
                helperText={fieldErrors.address}
                error={!!fieldErrors.address}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="description"
                name="description"
                variant="outlined"
                fullWidth
                label="Restaurant description"
                multiline
                rows="4"
                value={restaurantFields.description}
                onChange={event=>{
                  setRestaurantFields({...restaurantFields, description: event.target.value});
                }}
                helperText={fieldErrors.description}
                error={!!fieldErrors.description}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="picture"
                name="picture"
                variant="outlined"
                fullWidth
                label="Picture URL"
                value={restaurantFields.pictureUrl}
                onChange={event=>{
                  setRestaurantFields({...restaurantFields, pictureUrl: event.target.value});
                }}
                helperText={fieldErrors.pictureUrl}
                error={!!fieldErrors.pictureUrl}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
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
import React, { useEffect, useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { authStore } from "../../store/AuthStore";
import { navigate, Link as RouterLink } from "@reach/router";
import ServerErrorMessage from "../../components/admin/ServerErrorMessage";
import CircularProgress from '@material-ui/core/CircularProgress';
import {apiUrl} from "../../App";

const EditRestaurant = (props) => {
  const classes = useStyles();

  const authContext = useContext(authStore);

  const initialFields = {
    name: "",
    email: "",
    address:"",
    description: "",
    pictureUrl: ""
  }
  const [serverError, setServerError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [restaurantFields, setRestaurantFields] = useState(initialFields);

  const [fieldErrors, setFieldErrors] = useState(initialFields);

  useEffect(() => {
    setLoading(true);
    fetch(`${apiUrl}/api/admin/restaurant/${props.restaurantId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: authContext.state.token
      }
    })
      .then(response => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then(json => {
        //you should not assign null values to fields.
        Object.keys(json).forEach((key) => {
          if(json[key] === null)
          json[key]=""; 
        });
        setLoading(false);
        setRestaurantFields(json);
      })
      .catch(err => {
        if (err.text) {
          
          setLoading(false);
          authContext.dispatch({type: "logout"});
          navigate("/admin/login/");
          
        } else {
          setLoading(false);
          setServerError(true);
        }
      });
  }, []);

  const handleEdit = event => {
    event.preventDefault();
    setLoading(true);
    fetch(`${apiUrl}/api/admin/restaurant`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": authContext.state.token
      },
      body: JSON.stringify({
        id: props.restaurantId,
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
        setFieldErrors(initialFields);
        navigate("/admin/restaurants/");
      })
      .catch(err => {
        if (err.text) {
          err.text().then(errorMessage => {
            const errObj = JSON.parse(errorMessage);
            setLoading(false);
            setFieldErrors({
              ...initialFields,
              ...errObj
            });
          });
        } else {
          setLoading(false);
          setFieldErrors(initialFields);
          setServerError(true);
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
          Edit restaurant
        </Typography>
        <ServerErrorMessage error={serverError}/>
        {loading && <CircularProgress />}
        <form className={classes.form} validate="true" onSubmit={handleEdit}>
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
                onChange={event => {
                  setRestaurantFields({
                    ...restaurantFields,
                    username: event.target.value
                  });
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
                type="email"
                value={restaurantFields.email}
                onChange={event => {
                  setRestaurantFields({
                    ...restaurantFields,
                    email: event.target.value
                  });
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
                onChange={event => {
                  setRestaurantFields({
                    ...restaurantFields,
                    description: event.target.value
                  });
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
                onChange={event => {
                  setRestaurantFields({
                    ...restaurantFields,
                    pictureUrl: event.target.value
                  });
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
          <Grid container>
            <Grid item>
              <Link component={RouterLink} to="/admin/restaurants" variant="body2">
                {"Back to home"}
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
    marginTop: theme.spacing(5)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default EditRestaurant;
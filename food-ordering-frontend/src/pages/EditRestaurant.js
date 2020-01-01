import React, { useEffect, useState } from "react";
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
import { authStore } from "../store/AuthStore";
import { navigate } from "@reach/router";

export default function SignUp(props) {
  const classes = useStyles();

  const authContext = useContext(authStore);

  const [restaurantFields, setRestaurantFields] = useState({
    name: "",
    email: "",
    description: "",
    pictureUrl: ""
  });

  useEffect(() => {
    fetch(`http://localhost:8080/api/admin/restaurant/${props.restaurantId}`, {
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
        console.log(json);
        //setData(json);
      })
      .catch(err => {
        if (err.text) {
          err.text().then(errorMessage => {
            const errObj = JSON.parse(errorMessage);
            console.log(errObj);
          });
        } else {
          console.log(err);
        }
      });
  }, []);

  const handleEdit = event => {
    event.preventDefault();
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
                onChange={event => {
                  setRestaurantFields({
                    ...restaurantFields,
                    email: event.target.value
                  });
                }}
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

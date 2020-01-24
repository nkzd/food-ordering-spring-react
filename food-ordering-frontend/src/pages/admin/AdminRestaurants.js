import React, { useState, useEffect, useContext } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AdminBar from "../../components/admin/AdminBar";
import { authStore } from "../../store/AuthStore";
import { navigate } from "@reach/router";
import foodImage from "../../images/food.jpeg";
import ServerErrorMessage from "../../components/admin/ServerErrorMessage";
import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteDialog from "../../components/admin/DeleteDialog";
import {apiUrl} from "../../App";

const Restaurants = () => {
  const authContext = useContext(authStore);
  const classes = useStyles();
  const [refreshOnDelete, setRefreshOnDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ restaurants: [] });
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${apiUrl}/api/admin/restaurant/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: authContext.state.adminState.token
      }
    })
      .then(response => {
        if (!response.ok) {
          throw response;
        }
        return response.json(); 
      })
      .then(json => {
        setLoading(false);
        setServerError(false);
        setData({ restaurants: json });
      })
      .catch(err => {
        if (err.text) {
          setLoading(false);
          authContext.dispatch({type: "adminLogout"});
          navigate("/admin/login/");
        } else {
          setLoading(false);
          setServerError(true);
        }
      });
  }, [refreshOnDelete]);

  return (
    <React.Fragment>
      <CssBaseline />
      <AdminBar pageName="Restaurants" />
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <ServerErrorMessage error={serverError}/>
          <Grid container justify = "center">
            {loading && <CircularProgress />}
          </Grid>
          { data.restaurants.length ==0 &&
          <Grid container justify = "center">
             <Typography>You have no restaurants in your account.</Typography>
          </Grid>
          }
          <Grid container spacing={4}>
            {data.restaurants.map(restaurant => (
              <Grid item key={restaurant.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={
                      restaurant.pictureUrl ? restaurant.pictureUrl : foodImage
                    }
                    title="Restaurant image"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {restaurant.name}
                    </Typography>
                    <Typography>{restaurant.description}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="medium"
                      color="primary"
                      onClick={() => {
                        navigate(
                          `/admin/restaurants/${restaurant.id}`
                        );
                      }}
                    >
                      View
                    </Button>
                    <Button
                      size="medium"
                      color="primary"
                      onClick={() => {
                        navigate(
                          `/admin/restaurants/${restaurant.id}/edit`
                        );
                      }}
                    >
                      Edit
                    </Button>
                    <DeleteDialog deleteId={restaurant.id} refresh=
                    {
                      {
                        refreshOnDelete,
                        setRefreshOnDelete
                      }
                    }
                    type="restaurant"
                    />
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}

const useStyles = makeStyles(theme => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  }
}));
export default Restaurants;
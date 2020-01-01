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
import AdminBar from "../components/AdminBar";
import Copyright from "../components/Copyright";
import { authStore } from "../store/AuthStore";
import { navigate } from "@reach/router";
import foodImage from "../images/food.jpeg";
export default function Album() {
  const authContext = useContext(authStore);

  const classes = useStyles();

  const [data, setData] = useState({ restaurants: [] });

  useEffect(() => {
    fetch("http://localhost:8080/api/admin/restaurant/all", {
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
        return response.json(); //we only get here if there is no error
      })
      .then(json => {
        console.log(json);
        setData({ restaurants: json });
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

  return (
    <React.Fragment>
      <CssBaseline />
      <AdminBar pageName="Restaurants" />
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {data.restaurants.map(restaurant => (
              <Grid item key={restaurant.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    //restaurant.urlSlike
                    image={
                      restaurant.urlSlike ? restaurant.urlSlike : foodImage
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
                          `http://localhost:8080/api/admin/restaurant/${restaurant.id}`
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
                          `http://localhost:8080/api/admin/restaurant/${restaurant.id}/edit`
                        );
                      }}
                    >
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
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
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

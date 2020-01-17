import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from "@material-ui/core/styles";
import waiterImage from "../../images/waiter.jpg";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import RestaurantCard from "../../components/user/RestaurantCard"
import Search from "../../components/user/Search"
import FoodArticleList from "../../components/user/FoodArticleList"
import CategoryList from "../../components/user/CategoryList"
import Basket from "../../components/user/Basket"
import UserMenu from "../../components/user/UserMenu"
import FastfoodRoundedIcon from '@material-ui/icons/FastfoodRounded';
const UserRestaurant = () => {
    const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />

      <Container maxWidth="md">
      <Paper className={classes.hero}>
      {/* <div className={classes.overlay} /> */}
      <Grid container className={classes.gridRoot}>
        <Grid item
        container
        direction="row"
        justify="space-between"
        alignItems="flex-start"
        maxwidth="md"
        >
          <Grid item
          container
          direction="column"
          justify="space-between"
          alignItems="flex-start"
          xs
          >
            <Grid item className={classes.heroElement}>
              <Typography component="h1" variant="h5" color="inherit" gutterBottom>
                <FastfoodRoundedIcon/> Logo
              </Typography>
            </Grid>
          </Grid>
          <Grid item className={classes.heroElement}>
              <UserMenu/>
          </Grid>
        </Grid>
      </Grid>
      </Paper>
      </Container>

      
      <br/>
      {/* {backgroundColor: "MintCream",} */}
      <Container style={{ height: "70vh"}}>
        <Grid container
          direction="row"
          justify="center"
          alignItems="flex-start"
          spacing={2}
        >
          <Grid item xs={2}>
           <CategoryList/>
          </Grid>
          <Grid item xs={6}>
            <FoodArticleList/>
          </Grid>
          <Grid item xs={3}>
           <Basket/>
          </Grid>
        </Grid>

      </Container>
    </React.Fragment>
  );
}

const useStyles = makeStyles(theme => ({
    gridRoot: {
      flexGrow: 1,
      height:"100%"
    },
    hero: {
        backgroundImage: `url(${waiterImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        color: theme.palette.common.white,
        height: "30vh"
        
    },
    overlay: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      backgroundColor: 'rgba(0,0,0,.2)',
    },
    heroElement: {
      margin: theme.spacing(3)
    },
    paper: {
        height: 300,
        width: 180,
    }
  }));

  export default UserRestaurant;

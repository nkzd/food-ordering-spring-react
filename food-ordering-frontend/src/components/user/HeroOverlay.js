import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FastfoodRoundedIcon from '@material-ui/icons/FastfoodRounded';
import UserMenu from "../../components/user/UserMenu"
import waiterImage from "../../images/waiter.jpg";
import { makeStyles } from "@material-ui/core/styles";

const HeroOverlay = () => {
    const classes = useStyles();

    return(
        <Container maxWidth="md">
        <Paper className={classes.hero}>
        
          <Grid container className={classes.gridRoot}
            direction="row"
            justify="space-between"
            alignItems="flex-start"
            >
                <Grid item container direction="row"
                  justify="space-between"
                  alignItems="flex-start"
                >
                  <Grid item className={classes.heroElement}>
                    <Typography component="h1" variant="h5" color="inherit" gutterBottom>
                      <FastfoodRoundedIcon/> Logo
                    </Typography>
                  </Grid>
                  <Grid item className={classes.heroElement}>
                    <UserMenu/>
                  </Grid>
              </Grid>
              <Grid item>
              </Grid>    
          </Grid>
        </Paper>
      </Container>

    )
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
        margin: theme.spacing(1),
        height: 100,
        width: 300,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    restaurantName:{
      textAlign:"center",
       marginBottom: theme.spacing(1)
    }
  }));

  export default HeroOverlay;
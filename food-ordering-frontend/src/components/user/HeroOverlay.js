import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FastfoodRoundedIcon from '@material-ui/icons/FastfoodRounded';
import UserMenu from "../../components/user/UserMenu"
import waiterImage from "../../images/waiter.jpg";
import burgerImage from "../../images/burger.png";
import { makeStyles } from "@material-ui/core/styles";
import { navigate, Link as RouterLink } from "@reach/router";


const HeroOverlay = () => {
    const classes = useStyles();
    let random_boolean = Math.random() >= 0.5;
    const randomImage = (random_boolean) ? waiterImage : burgerImage;
    return(
        <Container maxWidth="md">
        <Paper className={classes.hero} style={{backgroundImage: `url(${randomImage})`}}>
        
          <Grid container className={classes.gridRoot}
            direction="row"
            justify="space-between"
            alignItems="flex-start"
            >
                <Grid item container direction="row"
                  justify="space-between"
                  alignItems="flex-start"
                >
                  <Grid item className={classes.heroElement} onClick={()=>{navigate("/")}}>
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
        // backgroundImage: `url(${randomImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        color: theme.palette.common.white,
        height: "30vh"
        
    },
    heroElement: {
      margin: theme.spacing(3),
      cursor: "pointer"
    }
  }));

  export default HeroOverlay;
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
import UserMenu from "../../components/user/UserMenu"
import FastfoodRoundedIcon from '@material-ui/icons/FastfoodRounded';
export default function SimpleContainer() {
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

      <Container maxWidth="md" className={classes.main}>

        <div style={{ height: 45, width: '100%', position: 'relative' }}>
          <Box   
          position="absolute"
          top={-27}
          left="28%"
          zIndex="tooltip">
            <Search/>
          </Box>
        </div>
        <RestaurantCard name={"Lorem Ipsum"} address={"Lorem Ipsum 12"}/>
        <RestaurantCard name={"Lorem Ipsum"} address={"Lorem Ipsum 12"}/> 
        <RestaurantCard name={"Lorem Ipsum"} address={"Lorem Ipsum 12"}/>
        <RestaurantCard name={"Lorem Ipsum"} address={"Lorem Ipsum 12"}/>
        <RestaurantCard name={"Lorem Ipsum"} address={"Lorem Ipsum 12"}/>
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
        height: "30vh",
        position: 'relative',
        
    },
    main: {
      height: "80vh"
    },
    search: {
      backgroundColor:"#ffffff"
    },
    overlay: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      backgroundColor: 'rgba(0,0,0,.2)',
    },
    mainFeaturedPostContent: {
      position: 'relative',
      padding: theme.spacing(3),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(6),
        paddingRight: 0,
      },
    },
    heroElement: {
      margin: theme.spacing(3)
    }
  }));
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import RestaurantLogo from "../../images/restaurant-logo.png";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(2)
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 900,
  },
  image: {
    width: 60,
    height: 60,
    marginRight:theme.spacing(2),
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  button: {
      marginTop: theme.spacing(3)
  }
}));

const RestaurantCard = ({name,image,price}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
            <Grid item>
                <ButtonBase className={classes.image}>
                <img className={classes.img} alt="complex" src={RestaurantLogo} />
                </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container direction="column" spacing={2}>
                <Grid item xs>
                    <Typography variant="h6">
                    Naziv restorana
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body1">
                    Adresa restorana
                    </Typography>
                </Grid>
            </Grid>
            <Grid item className={classes.button}>
                <Button variant="contained" color="primary">
                    Visit Restaurant
                </Button>
            </Grid>
                
        </Grid>
      </Paper>
    </div>
  );
}

export default RestaurantCard;
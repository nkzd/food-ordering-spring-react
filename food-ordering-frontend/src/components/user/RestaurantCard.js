import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import RestaurantLogo from "../../images/restaurant-logo.png";
import { navigate } from "@reach/router";

const RestaurantCard = ({name,pictureUrl,address,id}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
            <Grid item>
                <ButtonBase className={classes.image}>
                <img className={classes.img} alt="complex" src={(pictureUrl) ? pictureUrl : RestaurantLogo} />
                </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container direction="column" spacing={2}>
                <Grid item xs>
                    <Typography variant="h6">
                    {name}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body1">
                      {address}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item className={classes.button}>
                <Button 
                variant="contained" 
                color="primary"
                onClick={() => {
                  navigate(
                    `/restaurants/${id}`
                  );
                }}
                >
                    View Restaurant
                </Button>
            </Grid>
                
        </Grid>
      </Paper>
    </div>
  );
}
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
export default RestaurantCard;
import React,{useState} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Divider from "@material-ui/core/Divider";
import BasketImage from "../../images/farm-products.png"
import BasketItem from "./BasketItem";
const Basket = ({basketState}) => {

    const classes = useStyles();
    const preventDefault = event => event.preventDefault();
    return(
        <Paper className={classes.root}>
            <Typography align="center" variant="h6" gutterBottom>
                Your Basket
            </Typography>
            <Typography style={{
                display: 'flex',
                alignItems: 'center'
            }} variant="body1" gutterBottom>
                <LocationOnIcon fontSize="small"/>
                Adresa Neke Ulice 5
            </Typography>
            <Link href="#" onClick={preventDefault}>
                Change address
            </Link> 
            <br/>
                <ConditionalIcon basketState={basketState}/>
            <br/>
            {
                (basketState.length>0) && (
                    <BasketItem/>
                )
            }
            <br/>
            <Typography align="center" variant="body1">
                <Button variant="contained" >
                    Submit
                </Button>
            </Typography>
        </Paper>
    )
}

const ConditionalIcon = ({basketState}) => {
    if(basketState.length==0)
    { 
        return(
            <Typography align="center" variant="h6" gutterBottom>
            <img src={BasketImage} alt="basket"/>
            </Typography>
        )
    }else{
        return(null);
    }
}

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2)
      },
  }));

  export default Basket;

//Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>

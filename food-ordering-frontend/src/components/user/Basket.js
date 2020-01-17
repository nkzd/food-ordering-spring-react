import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import ShoppingBasketRoundedIcon from '@material-ui/icons/ShoppingBasketRounded';
import { Typography } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import ShoppingBasketOutlinedIcon from '@material-ui/icons/ShoppingBasketOutlined';
import ShoppingBasketTwoToneIcon from '@material-ui/icons/ShoppingBasketTwoTone';
import Icon from '@material-ui/core/Icon';
import SvgIcon from '@material-ui/core/SvgIcon';

import BasketImage from "../../images/bag.png"
const Basket = () => {

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
            <br/>
            <Typography align="center" variant="h6" gutterBottom>
            {/* <ShoppingBasketTwoToneIcon style={{ fontSize: 80 }} /> */}
            {/* <Icon className="fa fa-plus-circle" /> */}
                <img src={BasketImage} alt="basket"/>
            
            </Typography>
            <Typography align="center" variant="body1">
                <Button variant="contained" >
                    Submit
                </Button>
            </Typography>
        </Paper>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2)
      },
  }));

  export default Basket;
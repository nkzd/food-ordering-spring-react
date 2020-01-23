import React,{useState} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Button from '@material-ui/core/Button';
import BasketImage from "../../images/farm-products.png"
import BasketItem from "./BasketItem";
const Basket = ({basketState, setBasketState}) => {
    const classes = useStyles();

    const incrementItemQuantity = (basketItemToIncrement) => {

        const foundIndex = basketState.findIndex(basketItem => basketItem.itemId == basketItemToIncrement.itemId);

        let newState = deepCopy(basketState);
        newState[foundIndex].quantity++;

        setBasketState(newState);
    }

    const decrementItemQuantity = (basketItemToDecrement) => {

        if(basketItemToDecrement.quantity>1){
            const foundIndex = basketState.findIndex(basketItem => basketItem.itemId == basketItemToDecrement.itemId);

            let newState = deepCopy(basketState);
            newState[foundIndex].quantity--;
    
            setBasketState(newState);
        }
    }

    
    const handleBasketRemove = (basketItemToRemove) => {

        const foundIndex = basketState.findIndex(basketItem => basketItem.itemId == basketItemToRemove.itemId);

        let newState = deepCopy(basketState)

        newState.splice( foundIndex, 1 );
        setBasketState(newState);
    }

    const removeAllBasketItems = () => {
        setBasketState([]);
    }
  
    const deepCopy = (src) => {
        let target = Array.isArray(src) ? [] : {};
        for (let key in src) {
        let v = src[key];
        if (v) {
            if (typeof v === "object") {
            target[key] = deepCopy(v);
            } else {
            target[key] = v;
            }
        } else {
            target[key] = v;
        }
        }
    
        return target;
    }

    const getTotalPrice = () => {
        let totalPrice=0;
        basketState.forEach((basketItem) => {
            totalPrice += basketItem.quantity*basketItem.foodArticle.price;
        })
        return totalPrice;
    }

    return(
        <Paper className={classes.root}>
            <Typography align="center" variant="h6" gutterBottom>
                Your Basket
            </Typography>
            <br/>
            <Typography style={{
                display: 'flex',
                alignItems: 'center'
            }} variant="body1" gutterBottom>
                <LocationOnIcon fontSize="small"/>
                Adresa Neke Ulice 5
            </Typography>
            <Link href="#">
                Change address
            </Link> 
            <br/>
            <br/>
            {
                (basketState.length==0) ? (
                <Typography align="center" variant="h6" gutterBottom>
                    <img src={BasketImage} alt="basket"/>
                </Typography>) : null
            }
            {/*ITEMS*/}
            {
                basketState.map((basketItem)=>{
                    return(
                        <BasketItem 
                        key={basketItem.itemId} 
                        basketItem={basketItem} 
                        handleBasketRemove={handleBasketRemove} 
                        incrementItemQuantity={incrementItemQuantity}
                        decrementItemQuantity={decrementItemQuantity}
                        />
                    )
                })
            }
            {/*RACUN*/}
            {
                (basketState.length>0) && (
                    <Grid 
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="flex-start"
                    className={classes.billRow}
                >
                    <Grid item>
                        <Typography variant="h6">
                            Total
                        </Typography>
                    </Grid>
                    <Grid item>
                         <Typography variant="body1" className={classes.billPrice}>
                            <u>
                                 {getTotalPrice()} €
                            </u>
                        </Typography>
                    </Grid>
                </Grid>
                )
            }
            <div align="center">
                <Button variant="contained" className={classes.submitButton} color="primary">
                    Submit
                </Button>
            </div>
            <div align="center">
                {(basketState.length===0) ? null : ( <Button onClick={()=>{removeAllBasketItems()}} size="small" color="secondary">Clear basket</Button>)}
            </div>
        </Paper>
        
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2)
    },
    submitButton: {
        margin: theme.spacing(2)
    },
    billRow:{
        marginTop:theme.spacing(2)
    },
    billPrice:{
        marginTop: 5
    }
  }));

  export default Basket;

//Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>

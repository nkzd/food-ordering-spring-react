import React, {useState, useContext} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import BasketImage from "../../images/farm-products.png"
import BasketItem from "./BasketItem";
import BasketAddress from "./BasketAddress";
import {apiUrl} from "../../App";
import {authStore} from "../../store/AuthStore"
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
const Basket = ({basketState, setBasketState, restaurantId}) => {
    const classes = useStyles();
    const authContext = useContext(authStore);
    const [openSnack, setOpenSnack] = React.useState(false);
    const [loading,setLoading] = useState(false);
    const [serverError,setServerError] = useState(false);
    const [address,setAddress] = useState("");

    const handleOrderSubmit = () => {
        const orderTemplate={basketState: basketState, restaurantId:restaurantId, deliveryAddress:address}
        setLoading(true);
        fetch(`${apiUrl}/api/order/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": authContext.state.userState.token
            },
            body: JSON.stringify(orderTemplate)
        })
        .then(response => {
            if (!response.ok) {
            throw response;
            }
            setServerError(false);
            setLoading(false);
            removeAllBasketItems();
            setOpenSnack(true);
        })
        .catch(err => {
            setServerError(true);
            setLoading(false);
            setOpenSnack(true);
        });        
    }

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

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenSnack(false);
      };

    return(
        <React.Fragment>
        <Paper className={classes.root}>
            <Typography align="center" variant="h6" gutterBottom>
                Your Basket
            </Typography>
            <br/>
            {/*ADDRESS component*/}
            <BasketAddress address={address} setAddress={setAddress}/>
            <br/>
            <br/>
            {
                (basketState.length==0) ? (
                <Typography align="center" variant="h6" gutterBottom>
                    <img src={BasketImage} alt="basket"/>
                </Typography>) : null
            }
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
                <Button variant="contained" 
                className={classes.submitButton} 
                color="primary" 
                onClick={()=>{handleOrderSubmit()}}
                disabled={
                    (basketState.length==0 || loading) ? true : false
                }>
                    Submit
                </Button>
            </div>
            <div align="center">
                {(basketState.length===0) ? null : ( <Button onClick={()=>{removeAllBasketItems()}} size="small" color="secondary" disabled={loading}>Clear basket</Button>)}
            </div>
        </Paper>
        <Snackbar
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
            }}
            open={openSnack}
            autoHideDuration={6000}
            onClose={handleCloseSnack}
            message={(!serverError) ? "Order processed successfully!" : "Server error, please try again!"}
            action={
            <React.Fragment>
                <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnack}>
                <CloseIcon fontSize="small" />
                </IconButton>
            </React.Fragment>
                }
            />
        </React.Fragment>
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

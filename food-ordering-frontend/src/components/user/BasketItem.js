import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from "@material-ui/core/Divider";
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const BasketItem = ({basketItem, handleBasketRemove, incrementItemQuantity, decrementItemQuantity}) => {
    const classes = useStyles();

    return(
        <div >
        <Divider light/>
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
            >
                <Grid 
                    item 
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="flex-start"
                    className={classes.firstRow}
                >
                    <Grid item>
                        <Typography variant="body1" className={classes.foodArticleName}>
                            {basketItem.foodArticle.name}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <IconButton aria-label="delete" size="small" onClick={()=>handleBasketRemove(basketItem)}>
                            <ClearIcon color="secondary"/>
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid 
                    item 
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="flex-start"
                    className={classes.secondRow}
                >
                    <Grid item >
                        <Grid container direction="row" alignItems="center">
                            <Grid item>
                                <IconButton aria-label="add" size="small" onClick={()=>{incrementItemQuantity(basketItem)}}>
                                        <AddCircleOutlineIcon />
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <Typography variant="h6" className={classes.numberOfArticlesText} color="textSecondary">
                                    {basketItem.quantity}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <IconButton onClick={()=>{decrementItemQuantity(basketItem)}} aria-label="remove" size="small">
                                        <RemoveCircleOutlineIcon/>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                    
                    <Grid item>
                        <Typography variant="subtitle1">
                            {basketItem.foodArticle.price * basketItem.quantity} €
                        </Typography>
                    </Grid>
                </Grid>

            </Grid>
            <Divider light/>
         </div>
    )
}

const useStyles = makeStyles(theme => ({
    firstRow: {
        marginTop:theme.spacing(1),
        marginBottom:theme.spacing(1)
    },
    secondRow: {
    marginTop:theme.spacing(1),
    marginBottom:theme.spacing(1)
    },
    numberOfArticlesText: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),

    },
    foodArticleName: {
        marginTop: 3,
        marginLeft: 6
    }
}));

export default BasketItem;
import React from 'react';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from "@material-ui/core/styles";

const FoodArticleCard = () => {
    const classes = useStyles();
    return(
            //make card clickable
            <div className={classes.article}>
                <br/>
                <Typography variant="h6">
                    Ime jela
                </Typography>
                <Typography variant="body2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                </Typography>
                <Typography variant="subtitle1">
                    5.55$
                </Typography>
                <br/>
               
            </div>
    )
}
const useStyles = makeStyles(theme => ({
    article:{
        cursor: "pointer",
        marginBottom: theme.spacing(2)
    }
  }));
export default FoodArticleCard;
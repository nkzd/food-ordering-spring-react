import React from 'react';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from "@material-ui/core/styles";

const FoodArticleCard = ({foodArticle}) => {
    const classes = useStyles();
    return(
            //make card clickable
            <div className={classes.article}>
                <Typography variant="h6" gutterBottom>
                    {foodArticle.name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                    {foodArticle.description}
                </Typography>
                <Typography variant="subtitle2">
                    {foodArticle.price} €
                </Typography>
                <br/>
            </div>
    )
}
const useStyles = makeStyles(theme => ({
    article:{
        cursor: "pointer",
        // marginBottom: theme.spacing(1)
    }
  }));
export default FoodArticleCard;
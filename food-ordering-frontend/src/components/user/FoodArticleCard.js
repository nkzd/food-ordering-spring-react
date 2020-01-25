import React from 'react';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from "@material-ui/core/styles";

const FoodArticleCard = ({foodArticle}) => {
    const classes = useStyles();
    return(
            <div className={classes.article}>
                <Typography variant="subtitle1" gutterBottom>
                    {foodArticle.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                    {foodArticle.description}
                </Typography>
                <Typography variant="subtitle2">
                    {foodArticle.price} €
                </Typography>
            </div>
    )
}
const useStyles = makeStyles(theme => ({
    article:{
        cursor: "pointer",
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    }
  }));
export default FoodArticleCard;
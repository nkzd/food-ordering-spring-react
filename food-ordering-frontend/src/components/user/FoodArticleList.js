import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from "@material-ui/core/styles";
import Divider from '@material-ui/core/Divider';
import FoodArticleCard from "../../components/user/FoodArticleCard"

const FoodArticleList = () => {
    const classes = useStyles();

    return(
        <Paper className={classes.paper}>
            <div>
                <Typography variant="h5">
                    Category
                </Typography>
                <Divider />
                <FoodArticleCard/>
                <Divider light/>
                <FoodArticleCard/>
                <Divider light/>
                <FoodArticleCard/>
                <Typography variant="h5">
                    Category 2
                </Typography>
                <Divider />
                <FoodArticleCard/>
                <Divider light/>
                <FoodArticleCard/>
                <Divider light/>
                <FoodArticleCard/>
            </div>
        </Paper>
    )
}
const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(4)
    }
  }));
export default FoodArticleList;
import React from 'react';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const CategoryList = ({categories, handleCategoryScroll}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
          <List 
          subheader={
            <ListSubheader component="div" id="list-subheader">
              Categories
            </ListSubheader>
          }>
            {categories.map((category)=>{
              if(category.foodArticles.length>0)
              return(
              <ListItem button key={category.id} onClick={()=>{handleCategoryScroll(category.id)}}>
                <ListItemText primary={category.name} />
              </ListItem>
            )})}
          </List>
        </div>
      );
}

const useStyles = makeStyles(theme => ({
    root: {
        // width: 200
      },
  }));
export default CategoryList;
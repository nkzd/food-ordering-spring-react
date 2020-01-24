import React from 'react';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const CategoryList = ({categories, handleCategoryScroll}) => {
    return (
        <div>
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

export default CategoryList;
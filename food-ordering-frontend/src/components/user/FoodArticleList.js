import React, { useState, useEffect, useContext } from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import FoodArticleCard from "../../components/user/FoodArticleCard";
import RestaurantLogo from "../../images/restaurant-logo.png";
import Grid from "@material-ui/core/Grid";
import { apiUrl } from "../../App";
import { authStore } from "../../store/AuthStore";

const FoodArticleList = ({ categories, restaurantId, refs, handleBasketAdd }) => {
  const classes = useStyles();
  const authContext = useContext(authStore);
  const [restaurantInfo, setRestaurantInfo] = useState({
    id: 0,
    name: "",
    email: "",
    address: "",
    description: "",
    pictureUrl: ""
  });

  useEffect(() => {
    fetch(`${apiUrl}/api/restaurant/${restaurantId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: authContext.state.userState.token
      }
    })
      .then(response => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then(json => {
        setRestaurantInfo(json);
      })
      .catch(err => {
        //handled by other component
      });
  }, []);
  //kasnije preuzmi info od restorana
  return (
    <Paper className={classes.paper}>
      <div>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          <Grid item className={classes.image}>
            <img
              className={classes.img}
              alt="complex"
              src={
                restaurantInfo.pictureUrl
                  ? restaurantInfo.pictureUrl
                  : RestaurantLogo
              }
            />
          </Grid>
          <Grid item>
            <Typography variant="h4" className={classes.restaurantName}>
              {restaurantInfo.name}
            </Typography>
            <Typography variant="subtitle2" className={classes.address}>
              {restaurantInfo.address}
            </Typography>
          </Grid>
        </Grid>

        {categories.map(category => {
          if (category.foodArticles.length > 0)
            return (
              <div key={category.id}  ref={refs[category.id]}>
                <Typography variant="h6" className={classes.categoryName} >
                  {category.name}
                </Typography>
                {/* <Divider /> */}
                <hr />
                <div>
                  {category.foodArticles.map((foodArticle, i, arr) => {

                    return (
                      <div className={classes.removeOutline} role="button" key={foodArticle.id} onClick={()=>{handleBasketAdd(foodArticle)}} tabIndex={0} onKeyDown={()=>{handleBasketAdd(foodArticle)}}>
                        <FoodArticleCard foodArticle={foodArticle} />
                        {(arr.length - 1 !== i) ? <Divider light /> : null}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
        })}
      </div>
    </Paper>
  );
};
const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(4)
  },
  restaurantName: {},
  address: {
    marginBottom: theme.spacing(4)
  },
  image: {
    width: 80,
    height: 80
    // marginRight:theme.spacing(1),
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  },
  categoryName: {
    marginBottom: theme.spacing(1)
  },
  removeOutline:{
    outlineStyle: "none",
    boxShadow:"none",
    borderColor:"transparent"
  }
}));
export default FoodArticleList;

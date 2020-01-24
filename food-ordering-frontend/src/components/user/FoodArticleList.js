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
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


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

  const [orderNote,setOrderNote] = useState("");

  const [selectedFoodArticle, setSelectedFoodArticle] = useState({});

  const [open, setOpen] = React.useState(false);
  
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenDialog = (foodArticle) => {
    setSelectedFoodArticle(foodArticle);
    setOrderNote("");
    setOpen(true);
  }

  const handleRequestSubmit = () => {
    handleClose();
    handleBasketAdd({orderNote:orderNote, foodArticle: selectedFoodArticle})
  }

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
                      <div className={classes.removeOutline} role="button" key={foodArticle.id} onClick={()=>{handleOpenDialog(foodArticle)}} tabIndex={0} onKeyDown={()=>{handleOpenDialog(foodArticle)}}>
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
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="md" fullWidth={true}>
          <DialogTitle id="form-dialog-title">Add order requests</DialogTitle>
          <DialogContent>
            <DialogContentText className={classes.dialog}>
              Enter special order requests if you have any.
            </DialogContentText>
            <TextField
              margin="dense"
              id="name"
              label="order notes"
              fullWidth
              multiline={true}
              rows="2"
              value={orderNote}
              onChange={event => {
                setOrderNote(event.target.value);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={()=>{
                handleRequestSubmit()
              }} 
              color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
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

import React,{useContext, useState, useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import FoodArticleList from "../../components/user/FoodArticleList"
import CategoryList from "../../components/user/CategoryList"
import Basket from "../../components/user/Basket"
import {apiUrl} from "../../App";
import CircularProgress from '@material-ui/core/CircularProgress';
import ServerErrorMessage from "../../components/admin/ServerErrorMessage";
import { authStore } from "../../store/AuthStore";
import { navigate } from "@reach/router";
import HeroOverlay from "../../components/user/HeroOverlay";
import Footer from "../../components/user/Footer";

const UserRestaurant = ({restaurantId}) => {
  const authContext = useContext(authStore);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ categories: [] });
  const [serverError, setServerError] = useState(false);
  const [refs,setRefs] = useState([])
  //tipa [ {itemId: 1, foodArticle:{}, quantity: 2}, {itemId: 2, foodArticle:{}, quantity: 1}...]
  const [basketState, setBasketState] = useState([]);
  const [basketItemId, setBasketItemId]=useState(0);



  useEffect(() => {
    setLoading(true);
    fetch(`${apiUrl}/api/restaurant/${restaurantId}/category/all`, {
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
      setLoading(false);
      setServerError(false);
      //create refs for categories
      let refArray = json.reduce((acc, value) => {
        acc[value.id] = React.createRef();
        return acc;
      }, {});
      setRefs(refArray);
      setData({...data,categories: json});

    })
    .catch(err => {
      if (err.text) {
        setLoading(false);
        authContext.dispatch({type: "userLogout"});
        navigate("/login/");
      } else {
        setLoading(false);
        setServerError(true);
      }
    });
  }, []);

  const handleCategoryScroll = id =>
    refs[id].current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
  });

  //add and remove from basket. 

  const handleBasketAdd = (foodArticleAndNote) => {
    //add note
    setBasketItemId(basketItemId+1);
    setBasketState([...basketState, {itemId: basketItemId, foodArticle: foodArticleAndNote.foodArticle, quantity: 1, orderNote: foodArticleAndNote.orderNote}])
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <HeroOverlay/>
      <br/>
      <Container style={{ height: "70vh"}}>
        <Grid container
          direction="row"
          justify="center"
          alignItems="flex-start"
          spacing={2}
        >
          <Grid container justify = "center">
              {loading && <CircularProgress />}
            </Grid>
          <ServerErrorMessage error={serverError}/>

          <Grid item xs={2}>
           <CategoryList categories={data.categories} handleCategoryScroll={handleCategoryScroll}/>
          </Grid>
          <Grid item xs={6}>
            <FoodArticleList categories={data.categories} restaurantId={restaurantId} refs={refs} handleBasketAdd={handleBasketAdd}/>
          </Grid>
          <Grid item xs={3}>
           <Basket basketState={basketState} setBasketState={setBasketState} />
          </Grid>
        </Grid>
        <Footer/>
      </Container>
    </React.Fragment>
  );
}

  export default UserRestaurant;

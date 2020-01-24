import React, {useContext, useState, useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from "@material-ui/core/styles";
import waiterImage from "../../images/waiter.jpg";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import RestaurantCard from "../../components/user/RestaurantCard"
import Search from "../../components/user/Search"
import { authStore } from "../../store/AuthStore";
import { navigate } from "@reach/router";
import CircularProgress from '@material-ui/core/CircularProgress';
import {apiUrl} from "../../App";
import ServerErrorMessage from "../../components/admin/ServerErrorMessage";
import HeroOverlay from "../../components/user/HeroOverlay";

const UserRestaurants = () => {
  
  const authContext = useContext(authStore);
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ restaurants: [] });
  const [serverError, setServerError] = useState(false);
  const [searchField,setSearchField] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(`${apiUrl}/api/restaurant/all`, {
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
      setData({ restaurants: json });
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
  return (
    <React.Fragment>
      <CssBaseline />
      
      <HeroOverlay/>

      <Container maxWidth="md" className={classes.main}>

        <div style={{ height: 45, width: '100%', position: 'relative' }}>
          <Box   
          position="absolute"
          top={-27}
          left="28%"
          zIndex="tooltip">
            <Search field={{searchField,setSearchField}}/>
          </Box>
        </div>

        <Grid container justify = "center">
            {loading && <CircularProgress />}
        </Grid>

        <ServerErrorMessage error={serverError}/>
        {
          data.restaurants
          .filter(restaurant=>{
            if(searchField)
            {
              return restaurant.name.toLowerCase().indexOf(searchField.toLowerCase()) >= 0; 
            }
            return true;
          })
          .map(restaurant=>(
            <RestaurantCard key={restaurant.id} name={restaurant.name} address={restaurant.address} pictureUrl={restaurant.pictureUrl} id={restaurant.id}/>
          ))
        }
      </Container>
    </React.Fragment>
  );
}

const useStyles = makeStyles(theme => ({
    gridRoot: {
      flexGrow: 1,
      height:"100%"
    },
    hero: {
        backgroundImage: `url(${waiterImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        color: theme.palette.common.white,
        height: "30vh",
        position: 'relative',
        
    },
    main: {
      height: "80vh"
    },
    search: {
      backgroundColor:"#ffffff"
    },
    overlay: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      backgroundColor: 'rgba(0,0,0,.2)',
    },
    mainFeaturedPostContent: {
      position: 'relative',
      padding: theme.spacing(3),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(6),
        paddingRight: 0,
      },
    },
    heroElement: {
      margin: theme.spacing(3)
    }
  }));

  export default UserRestaurants;
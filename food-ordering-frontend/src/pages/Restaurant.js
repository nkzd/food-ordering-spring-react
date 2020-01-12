import React, {useState, useContext,useEffect} from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AdminBar from "../components/AdminBar";
import { authStore } from "../store/AuthStore";
import ServerErrorMessage from "../components/ServerErrorMessage";
import CircularProgress from '@material-ui/core/CircularProgress';
import { navigate } from "@reach/router";
import DeleteDialog from "../components/DeleteDialog";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Link as RouterLink } from "@reach/router";
import Link from "@material-ui/core/Link";
const Restaurant = ({ restaurantId }) => {
  const classes = useStyles();
  const authContext = useContext(authStore);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState(undefined);
  const [foodArticles, setFoodArticles] = useState(undefined);
  const [serverError, setServerError] = useState(false);
  const [categoryId, setCategoryId] = useState("all");
  const [refreshCategoryOnAdd, setRefreshCategoryOnAdd]=useState(false);
  const [refreshOnDelete, setRefreshOnDelete] = useState(false);
  const [disableAddFoodButton, setDisableAddFoodButton] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/api/admin/restaurant/${restaurantId}/category/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: authContext.state.token
      }
    })
      .then(response => {
        if (!response.ok) {
          throw response;
        }
        return response.json(); 
      })
      .then(json => {
        setServerError(false);
        if(json.length==0) {
          setDisableAddFoodButton(true)
        }else{
          setDisableAddFoodButton(false);
        } 
        setCategories(json);
      })
      .catch(err => {
        if (err.text) {
            authContext.dispatch({type: "logout"});
            navigate("/admin/login/");
        } else {
          setServerError(true);
        }
      });

  }, [refreshCategoryOnAdd]);
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8080/api/admin/restaurant/${restaurantId}/category/${categoryId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: authContext.state.token
      }
    })
      .then(response => {
        if (!response.ok) {
          throw response;
        }
        return response.json(); 
      })
      .then(json => {
        if(categoryId==="all")
        {
          let allArticles = [];
          json.forEach(category => {
            allArticles.push(...category.foodArticles);
          });
          setFoodArticles(allArticles);
        }else{
          setFoodArticles(json.foodArticles);
        }
        setLoading(false);
        setServerError(false);
      })
      .catch(err => {
        if (err.text) {
          setLoading(false);
          authContext.dispatch({type: "logout"});
          navigate("/admin/login/");
        } else {
          setLoading(false);
          setServerError(true);
        }
      });
  
  }, [categoryId,refreshOnDelete]);

  return (
    <React.Fragment>
      <CssBaseline />
      <AdminBar pageName="Food Articles" restaurantId={restaurantId} refresh={{refreshCategoryOnAdd, setRefreshCategoryOnAdd}} disableAddFoodButton={disableAddFoodButton}/>

      <main>
        
        <Container className={classes.cardGrid} maxWidth="md">
        <ServerErrorMessage error={serverError}/>

        <Grid container>
          {
            (Array.isArray(categories)) && categories.length>0 &&
            <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-autowidth-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={categoryId}
              onChange={(event)=>{setCategoryId(event.target.value)}}
              autoWidth
            >
              <MenuItem key="all" value="all">All</MenuItem>
              {
                
                (Array.isArray(categories)) && categories.map(catItem=>{
                return <MenuItem key={catItem.id} value={catItem.id}>{catItem.name}</MenuItem>
                })
              } 
            </Select> 
          </FormControl>
          }
        </Grid>
          
          <Grid container justify = "center">
            {loading && <CircularProgress />}
          </Grid>

          { (Array.isArray(foodArticles)) && foodArticles.length==0 &&
          <Grid container justify = "center">
             <Typography>You have no food articles in your restaurant.</Typography>
          </Grid>
          } 

          <Grid container spacing={4}>
            {(Array.isArray(foodArticles)) && foodArticles.map(foodArticle => (
              <Grid item key={foodArticle.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5">
                      {foodArticle.name}
                    </Typography>
                    <Typography variant="h6">
                    {`${foodArticle.price}€`}
                    </Typography>
                    <Typography>
                      {foodArticle.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="medium" color="primary"
                    onClick={() => {
                      navigate(
                        `/admin/restaurants/${restaurantId}/${foodArticle.id}/edit`
                      );
                    }}
                    >
                      Edit
                    </Button>
                    <DeleteDialog deleteId={foodArticle.id} refresh=
                    {
                      {
                        refreshOnDelete,
                        setRefreshOnDelete
                      }
                    }
                    type="foodArticle"
                    restaurantId={restaurantId}
                    />
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Grid container className={classes.linkBack}>
            <Grid item>
              <Link component={RouterLink} to={`/admin/restaurants/`}>
                {"< Back to restaurants"}
              </Link>
            </Grid>
           </Grid>
        </Container>
      </main>
      
    </React.Fragment>
  );
}

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  formControl: {
    margin: theme.spacing(3),
    minWidth: 120,
  },
  linkBack: {
    marginTop: theme.spacing(6)
  }
}));

export default Restaurant;
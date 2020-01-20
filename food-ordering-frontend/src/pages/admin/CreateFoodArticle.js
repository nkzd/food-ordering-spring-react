import React, {useEffect, useContext, useState} from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import ServerErrorMessage from "../../components/admin/ServerErrorMessage";
import {authStore} from "../../store/AuthStore";
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import CircularProgress from '@material-ui/core/CircularProgress';
import { navigate, Link as RouterLink } from "@reach/router";
import Link from "@material-ui/core/Link";
import {apiUrl} from "../../App";


const CreateFoodArticle = ({restaurantId}) =>  {
  const classes = useStyles();
  const authContext = useContext(authStore);
  const [categories, setCategories] = useState(undefined);
  const [serverError, setServerError] = useState(false);
  const [loading, setLoading] = useState(false);

  const initialFields = {
    name: "",
    categoryIdentifier: "",
    price: "",
    description: ""
  }


  const [articleFields,setArticleFields] = useState(initialFields);
  const [fieldErrors, setFieldErrors] = useState(initialFields);


  useEffect(() => {
    fetch(`${apiUrl}/api/admin/restaurant/${restaurantId}/category/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: authContext.state.adminState.token
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
        setCategories(json);
      })
      .catch(err => {
        if (err.text) {
          authContext.dispatch({type: "adminLogout"});
          navigate("/admin/login/");
        } else {
          setServerError(true);
        }
      });

  }, []);

  const handleAddArticle = () => {
    event.preventDefault();
    if(articleFields.categoryIdentifier==="")
    {
      setFieldErrors({categoryIdentifier:"Category is required"});
      
    }else {
    fetch(`${apiUrl}/api/admin/restaurant/${restaurantId}/foodarticle/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authContext.state.adminState.token
      },
      body: JSON.stringify({
        name: articleFields.name,
        price: parseFloat(articleFields.price),
        categoryIdentifier: articleFields.categoryIdentifier,
        description: articleFields.description
      })
    })
      .then(response => {
        if (!response.ok) {
          throw response;
        }
        
        setFieldErrors(initialFields);
        setServerError(false);
        setLoading(false);
        navigate(`/admin/restaurants/${restaurantId}`);
      })
      .catch(err => {
        if (err.text) {
          err.text().then(errorMessage => {
            const errObj = JSON.parse(errorMessage);
            setLoading(false);
            setFieldErrors({
              ...initialFields,
              ...errObj
            });
          });
        } else {
          setLoading(false);
          setServerError(true);
          setFieldErrors(initialFields);
        }
      });
    }
  } 

  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <FastfoodIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add new food article
        </Typography>
        <ServerErrorMessage error={serverError}/>
        {loading && <CircularProgress />}
        <form className={classes.form} validate="true" onSubmit={handleAddArticle}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="name"
                name="name"
                variant="outlined"
                required  
                fullWidth
                label="Name"
                value={articleFields.name}
                onChange={event=>{setArticleFields({...articleFields, name: event.target.value})}}
                helperText={fieldErrors.name}
                error={!!fieldErrors.name}
              />
            </Grid>
           
            <Grid item xs={12} sm={8}>
              <FormControl className={classes.formControl} required error={!!fieldErrors.categoryIdentifier}>
                <InputLabel id="demo-simple-select-autowidth-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={articleFields.categoryIdentifier}
                  onChange={(event)=>{setArticleFields({...articleFields, categoryIdentifier: event.target.value})}}
                  autoWidth
                >
                  {
                    
                    (Array.isArray(categories)) && categories.map(catItem=>{
                    return <MenuItem key={catItem.id} value={catItem.id}>{catItem.name}</MenuItem>
                    })
                  } 
                  <FormHelperText>Category is required</FormHelperText>
                </Select> 
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="price"
                name="price"
                variant="outlined"
                label="Price"
                type="number"
                inputProps={{ min: "0", step: "0.1" }}
                required
                value={articleFields.price}
                onChange={event=>{setArticleFields({...articleFields, price: event.target.value})}}
                helperText={fieldErrors.price}
                error={!!fieldErrors.price}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="description"
                name="description"
                variant="outlined"
                fullWidth
                label="Description"
                multiline
                rows="4"
                value={articleFields.description}
                onChange={event=>{setArticleFields({...articleFields, description: event.target.value})}}
                helperText={fieldErrors.description}
                error={!!fieldErrors.description}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
          <Grid container>
            <Grid item>
              <Link component={RouterLink} to={`/admin/restaurants/${restaurantId}/`} variant="body2">
                {"< Back to restaurant"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 230,
  },
}));

export default CreateFoodArticle;
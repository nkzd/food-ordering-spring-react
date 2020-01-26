import React, {useContext} from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AddIcon from "@material-ui/icons/Add";
import { navigate } from "@reach/router";
import { authStore } from "../../store/AuthStore";
import AddCategoryDialog from "./AddCategoryDialog"
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';

const AdminBar = (props) => {
  const classes = useStyles();
  const authContext = useContext(authStore);

  const handleLogout = () => {
    authContext.dispatch({ type: "adminLogout" });
    navigate("/admin/login");
  };

  const handleAddClick = () => {
    switch (props.pageName) {
      case "Food Articles":
        navigate(`/admin/restaurants/${props.restaurantId}/AddFoodArticle`);
        break;
      case "Restaurants":
        navigate("/admin/restaurants/create");
        break;
      default:
        navigate("/admin/restaurants/create");
        break;
    }
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>

          <Grid 
            container 
            direction="row"
            justify="space-between"
            alignItems="flex-start"
          >
            <Grid
              item
              container
              md={6}
              sm={8}
              xs={12}
              spacing={3}
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
            >
              <Grid item>
                <Typography variant="h6">{props.pageName}</Typography>
              </Grid>
              <Grid item>
                {props.pageName === "Food Articles" ? <AddCategoryDialog restaurantId={props.restaurantId} refresh={props.refresh}/> : "" }
              </Grid>
              <Grid item>
                <Tooltip title={(props.disableAddFoodButton==null || props.disableAddFoodButton==false) ? "" : "You must add at least one category first."}>
                  <Button
                    variant="contained"
                    disabled= {(props.disableAddFoodButton==null || props.disableAddFoodButton==false) ? false : true}
                    endIcon={<AddIcon />}
                    onClick={handleAddClick}
                  >
                    {props.pageName === "Food Articles"
                      ? " Add food article"
                      : "Add restaurant"}
                  </Button>
                </Tooltip>
              </Grid>

            </Grid>
            
            <Grid
              item
              container
              spacing={3}
              md={4}
              sm={4}
              xs={12}
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
            >
              <Grid item>
                <Typography variant="subtitle1">
                  {authContext.state.adminState.username}
                </Typography>
              </Grid>

              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<ExitToAppIcon />}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Grid>  
            </Grid>

          </Grid>

        </Toolbar>
      </AppBar>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  toolbar: {
    backgroundColor: "#5c6bc0"
  }
}));
export default AdminBar;
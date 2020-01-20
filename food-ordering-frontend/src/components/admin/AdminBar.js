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

const AdminBar = (props) => {
  const classes = useStyles();
  const authContext = useContext(authStore);

  const handleLogout = () => {
    authContext.dispatch({ type: "adminLogout" });
    navigate("/admin/login");
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6">{props.pageName}</Typography>
          {props.pageName === "Food Articles" ? <AddCategoryDialog restaurantId={props.restaurantId} refresh={props.refresh}/> : "" }
          
          <Tooltip title={(props.disableAddFoodButton==null || props.disableAddFoodButton==false) ? "" : "You must add at least one category first."}>
            <span>
            <Button
              variant="contained"
              className={classes.right}
              disabled= {(props.disableAddFoodButton==null || props.disableAddFoodButton==false) ? false : true}
              endIcon={<AddIcon />}
              onClick={() => {
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
              }}
            >
              {props.pageName === "Food Articles"
                ? " Add food article"
                : "Add restaurant"}
            </Button>
          </span>
          </Tooltip>
          
          
          <div className={classes.left}></div>

          <Typography variant="subtitle1" className={classes.right}>
            {authContext.state.adminState.username}
          </Typography>

          <Button
            variant="contained"
            color="secondary"
            className={classes.right}
            startIcon={<ExitToAppIcon />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  left: {
    flexGrow: 1
  },
  right: {
    margin: theme.spacing(2)
  },
  toolbar: {
    backgroundColor: "#5c6bc0"
  }
}));
export default AdminBar;
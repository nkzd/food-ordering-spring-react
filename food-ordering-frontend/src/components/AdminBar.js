import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AddIcon from "@material-ui/icons/Add";
import { navigate } from "@reach/router";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  left: {
    flexGrow: 1
  },
  right: {
    margin: theme.spacing(2)
  }
}));

//props za account name

export default function ButtonAppBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">{props.pageName}</Typography>
          <Button
            variant="contained"
            className={classes.right}
            endIcon={<AddIcon />}
            onClick={() => {
              switch (props.pageName) {
                case "Food Articles":
                  navigate(`/restaurants/${props.restaurantId}/AddFoodArticle`);
                  break;
                case "Restaurants":
                  navigate("/restaurants/create");
                  break;
                default:
                  navigate("/restaurants/create");
                  break;
              }
            }}
          >
            Add
          </Button>
          <div className={classes.left}></div>

          <Typography variant="subtitle1" className={classes.right}>
            Account name
          </Typography>

          <Button
            variant="contained"
            color="secondary"
            className={classes.right}
            startIcon={<ExitToAppIcon />}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

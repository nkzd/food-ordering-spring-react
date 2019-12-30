import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AddIcon from "@material-ui/icons/Add";
import { navigate } from "@reach/router";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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
  const [open, setOpen] = React.useState(false);
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
              ? " Add food"
              : "Add restaurant"}
          </Button>

          {props.pageName === "Food Articles" ? (
            <>
              <Button
                variant="contained"
                className={classes.right}
                endIcon={<AddIcon />}
                onClick={() => {
                  setOpen(true);
                }}
              >
                Add Category
              </Button>
              <Dialog
                open={open}
                onClose={() => {
                  setOpen(false);
                }}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">New category</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    To add new food category, please enter category name here.
                  </DialogContentText>
                  <TextField
                    margin="dense"
                    id="name"
                    label="Category name"
                    fullWidth
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => {
                      setOpen(false);
                    }}
                    color="primary"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      setOpen(false);
                    }}
                    color="primary"
                  >
                    Submit
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          ) : (
            ""
          )}
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

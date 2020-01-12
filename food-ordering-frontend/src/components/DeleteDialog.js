import React, {useContext} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { authStore } from "../store/AuthStore";
const RestaurantDeleteDialog = ({deleteId, refresh, type, restaurantId}) => {
  const [open, setOpen] = React.useState(false);
  
  const authContext = useContext(authStore);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    let url="";
    switch (type) {
      case "restaurant":
        url = `http://localhost:8080/api/admin/restaurant/${deleteId}`;
        break;
      case "foodArticle":
        url = `http://localhost:8080/api/admin/restaurant/${restaurantId}/foodarticle/${deleteId}`;
        break;
      default:
        throw new Error("no case");
    }
    fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: authContext.state.token
        }
      })
        .then(response => {
          if (!response.ok) {
            throw response;
          }
          refresh.setRefreshOnDelete(!refresh.refreshOnDelete);
          handleClose();
        })
        .catch(err => {
          handleClose();
        });
  }

  return (
    <div>
      <Button color="secondary" size="medium" onClick={handleClickOpen}>
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete "+((type==="restaurant") ? "restaurant" : "food article")+"?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           {"This action can't be undone"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default RestaurantDeleteDialog;
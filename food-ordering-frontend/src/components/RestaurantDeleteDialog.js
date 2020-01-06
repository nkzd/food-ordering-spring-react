import React, {useContext} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { authStore } from "../store/AuthStore";
import { navigate } from "@reach/router";
const RestaurantDeleteDialog = ({deleteId, refresh}) => {
  const [open, setOpen] = React.useState(false);
  
  const authContext = useContext(authStore);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    fetch(`http://localhost:8080/api/admin/restaurant/${deleteId}`, {
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
          if (err.text) {
            err.text().then(errorMessage => {
              const errObj = JSON.parse(errorMessage);
              console.log(errObj);
              
              handleClose();
            });
          } else {
              
            handleClose();
          }
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
        <DialogTitle id="alert-dialog-title">{"Delete restaurant?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           {"This action can't be undone"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default RestaurantDeleteDialog;
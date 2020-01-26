import React, {useContext} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { authStore } from "../../store/AuthStore";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import {apiUrl} from "../../App";

const AddCategoryDialog = ({restaurantId, refresh}) => {

  const [open, setOpen] = React.useState(false);
  const [name,setName] = React.useState("");
  const authContext = useContext(authStore);

  
  const handleAdd = () => {
    setName("");
    event.preventDefault();
    fetch(`${apiUrl}/api/admin/restaurant/${restaurantId}/category/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authContext.state.adminState.token
        },
        body:JSON.stringify({
            name: name
        })
      })
        .then(response => {
          if (!response.ok) {
            throw response;
          }
          refresh.setRefreshCategoryOnAdd(!refresh.refreshCategoryOnAdd);
          setOpen(false);
        })
        .catch(err => {
            setOpen(false);
        });
  }


  return (
    <React.Fragment>
        <Button
            variant="contained" endIcon={<AddIcon />} onClick={()=>{setOpen(true)}}>
              Add Category
          </Button>
       <Dialog
              open={open}
              onClose={() => {
                setOpen(false);
              }}
              aria-labelledby="form-dialog-add-category"
            >
              <DialogTitle id="form-dialog-add-category">New category</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To add new food category, please enter category name here.
                </DialogContentText>
                <form validate="true" onSubmit={handleAdd}>
                <TextField
                  margin="dense"
                  id="name"
                  label="Category name"
                  fullWidth
                  required
                  value={name}
                  onChange={event=>setName(event.target.value)}
                />
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
                type="submit"
                  color="primary"
                >
                  Submit
                </Button>
              </DialogActions>
                </form>
              </DialogContent>
            </Dialog>
    </React.Fragment>
  );
}

export default AddCategoryDialog;
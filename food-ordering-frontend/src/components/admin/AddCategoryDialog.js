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
import { makeStyles } from "@material-ui/core/styles";

const AddCategoryDialog = ({restaurantId, refresh}) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [name,setName] = React.useState("");
  const authContext = useContext(authStore);

  
  const handleAdd = () => {
    setName("");
    event.preventDefault();
    fetch(`http://localhost:8080/api/admin/restaurant/${restaurantId}/category/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authContext.state.token
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
    <div>
        <Button
            variant="contained" className={classes.right} endIcon={<AddIcon />} onClick={()=>{setOpen(true)}}>
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
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  right: {
    margin: theme.spacing(2)
  }
}));

export default AddCategoryDialog;
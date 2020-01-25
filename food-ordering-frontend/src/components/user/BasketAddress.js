import React, {useState, useContext,useEffect} from 'react'
import {apiUrl} from "../../App";
import {authStore} from "../../store/AuthStore"
import { makeStyles } from "@material-ui/core/styles";
import Link from '@material-ui/core/Link';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const BasketAddress = ({address,setAddress}) => {
    const classes = useStyles();
    const authContext = useContext(authStore);
    const [temporaryAddress,setTemporaryAddress] = useState("");
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (event) => {
      event.preventDefault();
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleNewAddress = () => {
        setAddress(temporaryAddress);
        setOpen(false);
    };

    useEffect(()=>{

        fetch(`${apiUrl}/api/user/userinfo`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: authContext.state.userState.token
            }
          })
          .then(response => {
            if (!response.ok) {
              throw response;
            }
            return response.json(); 
          }).then(json=>{
              setAddress(json.address)
          })
          .catch(err => {
            //handled by parent component
          });
    },[])


    return(
        <React.Fragment>
            <Typography variant="body1" gutterBottom className={classes.link}>
                <LocationOnIcon fontSize="small"/>
                    {address}
            </Typography>
            <Link href="#" onClick={handleClickOpen}>
                Change address
            </Link> 
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Change address</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    To change your delivery address temporarily enter new address here.
                </DialogContentText>
                <TextField
                    margin="dense"
                    id="address"
                    label="Delivery Address"
                    value={temporaryAddress}
                    onChange={(event)=>{setTemporaryAddress(event.target.value)}}
                    fullWidth
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleNewAddress} color="primary">
                    Change
                </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )


}

const useStyles = makeStyles(theme => ({
    link:{
        display: 'flex',
        alignItems: 'center'
    }
}));

export default BasketAddress;
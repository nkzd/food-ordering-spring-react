import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
const ServerErrorMessage = ({error}) => {
    const classes = useStyles();
    return(
        <Typography className={classes.errorMessage} gutterBottom>
            {error && "Server error, please try again later."}
        </Typography>
    )
}
const useStyles = makeStyles(theme => ({
    errorMessage: {
        color: "#ef5350",
        textAlign: "center"
      }
}));
export default ServerErrorMessage;
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Typography
        variant="subtitle1"
        align="center"
        color="textSecondary"
        component="p"
      >
        Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a><br/>
        Source code available at <a href="https://github.com/nkzd/food-ordering-spring-react" title="github-link"> GitHub</a>
      </Typography>
    </footer>
  );
};

const useStyles = makeStyles(theme => ({
  footer: {
    padding: theme.spacing(6)
  }
}));
export default Footer;

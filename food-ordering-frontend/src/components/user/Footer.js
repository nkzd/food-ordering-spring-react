import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from '@material-ui/core/Link';
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
        Icons made by <Link href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</Link> from <Link href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</Link><br/>
        Source code available at <Link href="https://github.com/nkzd/food-ordering-spring-react" title="github-link"> GitHub</Link>
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

import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import { makeStyles } from "@material-ui/core/styles";
import image from "../../images/mountain.jpg";

export default function SimpleContainer() {
    const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />

      <Container maxWidth="md" className={classes.com}>
      <Paper className={classes.hero} />

      </Container>

    </React.Fragment>
  );
}

const useStyles = makeStyles(theme => ({
    hero: {
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: "20vh"
    }
  }));
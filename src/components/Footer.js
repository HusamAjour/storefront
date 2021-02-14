import React from 'react';
import { AppBar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Footer(props) {
  const classes = useStyles();
  return (
    <AppBar position="relative">
      <Typography variant="h6" className={classes.title}>
        StoreFront 2012 © All rights reserved.
      </Typography>
    </AppBar>
  );
}

export default Footer;

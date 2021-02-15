import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';

const useStyles = makeStyles({
  card: {
    margin: 'auto',
    'margin-top': '10px',
    'margin-bottom': '10px',
    maxWidth: 500,
    padding: '10px',
  },
});

function Header() {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <h2>
        Lavalleeale&apos;s PWA
      </h2>
    </Card>
  );
}

export default Header;

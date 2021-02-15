import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, TextField, Button } from '@material-ui/core';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles({
  card: {
    margin: 'auto',
    'margin-top': '10px',
    'margin-bottom': '10px',
    maxWidth: 500,
    padding: '10px',
  },
});

function LoginForm() {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();

    const res = await fetch('https://api.alextesting.ninja/notesApp/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    setError(!res.ok);
    return setFinished(res.ok);
  }

  return (
    <Card className={classes.card}>
      {finished && <Redirect to="/" push />}
      <form onSubmit={onSubmit}>
        <TextField
          error={error}
          helperText={!error && 'Invald Username or Password'}
          required
          style={{ width: '100%' }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          label="Username"
          variant="outlined"
          id="Username"
        />
        <TextField
          required
          type="password"
          style={{ width: '100%' }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          variant="outlined"
          id="Password"
        />
        <Button style={{ float: 'right', marginTop: '10px' }} variant="outlined" type="submit">Submit</Button>

      </form>
    </Card>
  );
}

export default LoginForm;

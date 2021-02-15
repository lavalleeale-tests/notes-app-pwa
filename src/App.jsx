import React, { lazy } from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Notes = lazy(() => import('./components/Notes'));
const Header = lazy(() => import('./components/Header'));
const LoginForm = lazy(() => import('./components/LoginForm'));

const themes = {
  darkTheme: createMuiTheme({
    palette: {
      type: 'dark',
    },
  }),
  lightTheme: createMuiTheme({
    palette: {
      type: 'light',
    },
  }),
};

function App() {
  const [cookies] = useCookies(['auth']);

  return (
    <ThemeProvider theme={themes.darkTheme}>
      <Router>
        {!cookies.auth && <Redirect to="/login" push />}
        <CssBaseline />
        <Header />
        <Route exact path="/">
          <Notes />
        </Route>
        <Route exact path="/login">
          <LoginForm />
        </Route>
      </Router>
    </ThemeProvider>
  );
}

export default App;

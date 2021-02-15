import React, { lazy, Suspense } from 'react';
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

const renderLoader = () => <p>Loading</p>;

function App() {
  const [cookies] = useCookies(['auth']);

  return (
    <ThemeProvider theme={themes.darkTheme}>
      <Router>
        {!cookies.auth && <Redirect to="/login" push />}
        <CssBaseline />
        <Suspense fallback={renderLoader()}>
          <Header />
        </Suspense>
        <Route exact path="/">
          <Suspense fallback={renderLoader()}>
            <Notes />
          </Suspense>
        </Route>
        <Route exact path="/login">
          <Suspense fallback={renderLoader()}>
            <LoginForm />
          </Suspense>
        </Route>
      </Router>
    </ThemeProvider>
  );
}

export default App;

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HomePage, Login, NotFound404, Register, ForgotPassword, ResetPassword, Profile } from "../../pages/index";
import { ProtectedRoute } from '../protected-route/protected-route';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true}>
          <HomePage />
        </Route>
        <Route path="/login" exact={true}>
          <Login />
        </Route>
        <Route path="/register" exact={true}>
          <Register />
        </Route>
        <Route path="/forgot-password" exact={true}>
          <ForgotPassword />
        </Route>
        <Route path="/reset-password" exact={true}>
          <ResetPassword />
        </Route>
        <ProtectedRoute path="/profile">
          <Profile />
        </ProtectedRoute>
        <Route>
          <NotFound404 />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

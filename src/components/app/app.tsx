import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  HomePage,
  Login,
  NotFound404,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
} from "../../pages/index";
import { ProtectedRoute } from "../protected-route/protected-route";
import { getCookie } from "../../utils/cookies";
import {
  updateToken,
  getUserData,
  authorizationSelector,
} from "../../services/slices/authorization-slice";
import { fetchIngredients } from "../../services/slices/ingredients-slice";

function App() {
  const dispatch = useDispatch();
  const { isAuthorized } = useSelector(authorizationSelector);

  useEffect(() => {
    dispatch(fetchIngredients());
    if (getCookie("refreshToken")) {
      dispatch(getUserData());
      if (!isAuthorized) {
        dispatch(updateToken());
        dispatch(getUserData());
      }
    }
  }, []);

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
        <ProtectedRoute path="/profile/orders" exact={true}>
          <Profile />
        </ProtectedRoute>
        <Route>
          <NotFound404 />
        </Route>
        <Route path="/ingredients/:id">
          <NotFound404 />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

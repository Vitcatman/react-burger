import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  HomePage,
  Login,
  NotFound404,
  IngredientPage,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
} from "../../pages/index";
import { ProtectedRoute } from "../protected-route/protected-route";
import Modal from "../modal/modal";
import AppHeader from "../app-header/app-header";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {
  updateToken,
  getUserData,
  authorizationSelector,
} from "../../services/slices/authorization-slice";
import { fetchIngredients } from "../../services/slices/ingredients-slice";

function App() {
  const dispatch = useDispatch();
  const { isAuthorized } = useSelector(authorizationSelector);
  const history = useHistory();
  const location = useLocation();
  const background = location.state && location.state.background;

  const closeModal = () => {
    history.goBack();
  };

  useEffect(() => {
    dispatch(fetchIngredients());
    if (localStorage.getItem("refreshToken") && !isAuthorized && !background) {
      dispatch(updateToken());
    }
    
  }, []);

  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
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
        <Route path="/ingredients/:id" exact={true}>
          <IngredientPage />
        </Route>
        <Route>
          <NotFound404 />
        </Route>
      </Switch>

      {background && (
        <Route path="/ingredients/:id" exact={true}>
          <Modal close={closeModal}>
            <IngredientDetails />
          </Modal>
        </Route>
      )}
    </>
  );
}
export default App;

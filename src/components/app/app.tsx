import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { TLocation } from "../../utils/types";
import {
  HomePage,
  Login,
  NotFound404,
  IngredientPage,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  OrderFeed,
  OrderPage,
} from "../../pages/index";
import { ProtectedRoute } from "../protected-route/protected-route";
import Modal from "../modal/modal";
import AppHeader from "../app-header/app-header";
import { FeedDetails } from "../feed-details/feed-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {
  updateToken,
} from "../../services/slices/authorization-slice";
import { fetchIngredients } from "../../services/slices/ingredients-slice";
import { useAppSelector, useAppDispatch } from "../../services";

function App() {
  const dispatch = useAppDispatch();
  const { isAuthorized } = useAppSelector((state) => state.authorization);
  const history = useHistory();
  const location = useLocation<TLocation>();
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
        <Route path="/react-burger" exact={true}>
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
        <Route path="/feed" exact={true}>
          <OrderFeed />
        </Route>
        <Route path="/feed/:id">
          <OrderPage />
        </Route>
        <Route>
          <NotFound404 />
        </Route>
      </Switch>

      {background && (
        <Switch>
          <Route path="/ingredients/:id" exact={true}>
            <Modal close={closeModal}>
              <IngredientDetails />
            </Modal>
          </Route>
          <Route path="/feed/:id" exact={true}>
            <Modal close={closeModal}>
              <FeedDetails />
            </Modal>
          </Route>
        </Switch>
      )}
    </>
  );
}
export default App;

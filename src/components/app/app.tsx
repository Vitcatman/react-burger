import { Switch, Route, useHistory, useLocation  } from "react-router-dom";
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
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {
  updateToken,
  getUserData,
  authorizationSelector,
} from "../../services/slices/authorization-slice";
import { fetchIngredients, hideIngredientModal } from "../../services/slices/ingredients-slice";

function App() {
  const dispatch = useDispatch();
  const { isAuthorized } = useSelector(authorizationSelector);
  const history = useHistory()
  const location = useLocation()
  const background = location.state && location.state.background
  console.log(background)

  const closeModal = () => {
    history.goBack()
  }

  // const closeModal = () => {
  //   //@ts-ignore
  //   dispatch(hideIngredientModal())
  // }

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
    <>
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

      {background &&
        <Route path='/ingredients/:id' exact>
    
          <Modal close={closeModal}>
            <IngredientDetails />
          </Modal>
        </Route>
      }
    </>
  );
}

export default App;

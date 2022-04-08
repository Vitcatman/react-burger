import { Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authorizationSelector } from "../../services/slices/authorization-slice";

export const ProtectedRoute = ({ children, ...rest }) => {
  const {isAuthorized} = useSelector(authorizationSelector);

  return (
    <Route
      {...rest}
      render={() =>
        isAuthorized ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login"}} />
        )
      }
    />
  );
};

import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { authorizationSelector } from "../../services/slices/authorization-slice";
import { useLocation } from "react-router-dom";
import { getCookie } from "../../utils/cookies";

export const ProtectedRoute = ({ children, ...rest }) => {
  const { isAuthorized } = useSelector(authorizationSelector);
  const location = useLocation();

  return (
    <Route
      {...rest}
      render={() =>
        getCookie("accessToken") ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
};

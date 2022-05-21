import { Route, Redirect, RouteProps } from "react-router-dom";
import { FC} from "react";
import { useSelector } from "react-redux";
import { authorizationSelector } from "../../services/slices/authorization-slice";
import { useLocation } from "react-router-dom";
import { getCookie } from "../../utils/cookies";


export const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
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

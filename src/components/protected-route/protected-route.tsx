import { Route, Redirect, RouteProps } from "react-router-dom";
import { FC} from "react";
import { useLocation } from "react-router-dom";
import { getCookie } from "../../utils/cookies";


export const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
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

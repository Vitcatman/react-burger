import { Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authorizationSelector } from "../../services/slices/authorization-slice";

export const ProtectedRoute = ({ children, ...rest }) => {
  const authorize = useSelector(authorizationSelector);
  console.log(authorize)

  return (
    <Route
      {...rest}
      render={() =>
        authorize ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login"}} />
        )
      }
    />
  );
};

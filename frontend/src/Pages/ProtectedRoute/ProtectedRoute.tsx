import { FC, useContext, useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ProtectedRouteProps } from "../../Model/ProtectedRouteProps";
import { authorizeUser } from "../../Api/UserApi";
import { NavigationBar } from "../../Components/NavigationBar/NavigationBar";
import { AuthentificationContext } from "../../Context/AuthentificationContext";

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  page,
  redirectPage,
}: ProtectedRouteProps): any => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | undefined>(
    undefined
  );
  const { setEmail, setRole, setUsername } = useContext(
    AuthentificationContext
  );
  const fetched = useRef<boolean>(false);

  useEffect(() => {
    const abortController = new AbortController();
    if (fetched.current === true) {
      return;
    }

    let authorized = (async () => {
      return await authorizeUser();
    })();
    (async () => {
      await authorized.then((value) => {
        console.log(value);
        setIsAuthorized(value !== undefined);
        if (value !== undefined) {
          setEmail(value.email);
          setRole(value.role);
          setUsername(value.username);
        }
        fetched.current = true;
      });
    })();

    return () => {
      abortController.abort();
    };
  }, [fetched]);

  if (isAuthorized !== undefined) {
    if (isAuthorized === false) {
      return (
        <>
          <Navigate to={redirectPage} replace />;
        </>
      );
    }
    return page;
  }
  return <></>;
};

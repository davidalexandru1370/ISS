import { FC, useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ProtectedRouteProps } from "../../Model/ProtectedRouteProps";
import { authorizeUser } from "../../Api/UserApi";
import { NavigationBar } from "../../Components/NavigationBar/NavigationBar";

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  page,
  redirectPage,
}: ProtectedRouteProps): any => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | undefined>(
    undefined
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
        setIsAuthorized(value);
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

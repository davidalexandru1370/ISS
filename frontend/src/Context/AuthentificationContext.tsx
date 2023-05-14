import { FC, createContext, useState } from "react";
import { RolesEnum } from "../Enums/RolesEnum";

interface IAuthentificationContext {
  username: string;
  setUsername: (username: string) => void;
  setEmail: (email: string) => void;
  setRole: (role: RolesEnum) => void;
  email: string;
  role?: RolesEnum;
}

export const AuthentificationContext = createContext<IAuthentificationContext>({
  username: "",
  email: "",
  role: undefined,
  setEmail: (email) => {},
  setRole: (role) => {},
  setUsername: (username) => {},
});

export const AuthentificationContextProvider: FC<{ children: any }> = ({
  children,
}) => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [role, setRole] = useState<RolesEnum>();
  return (
    <AuthentificationContext.Provider
      value={{
        email: email,
        username: username,
        role: role,
        setEmail: (e) => setEmail(e),
        setRole: (r) => setRole(r),
        setUsername: (u) => setUsername(u),
      }}
    >
      {children}
    </AuthentificationContext.Provider>
  );
};

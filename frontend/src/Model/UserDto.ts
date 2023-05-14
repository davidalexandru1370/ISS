import { RolesEnum } from "../Enums/RolesEnum";

export interface UserDto {
  username: string;
  email: string;
  role: RolesEnum;
}

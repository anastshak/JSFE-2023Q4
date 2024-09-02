// export interface Request {
//   id: string | null;
//   type: string;
//   payload: {} | null;
// }

export enum RequestTypes {
  error = "ERROR",
  login = "USER_LOGIN",
  logout = "USER_LOGOUT",
  activeUsers = "USER_ACTIVE",
  inactiveUsers = "USER_INACTIVE",
}

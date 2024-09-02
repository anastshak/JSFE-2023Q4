import getUsers from "./get-users";
import { createElement } from "../ui-func";
import { RequestTypes } from "../../types/types";

export default async function addUsersList(): Promise<HTMLElement> {
  const list = createElement("div", "", "all-users-list");

  const activeUsers = await getUsers(RequestTypes.activeUsers);
  const inactiveUsers = await getUsers(RequestTypes.inactiveUsers);

  list.append(activeUsers, inactiveUsers);

  return list;
}

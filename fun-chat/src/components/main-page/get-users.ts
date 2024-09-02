import { socket } from "../socket";
import { RequestTypes } from "../../types/types";
import { createElement } from "../ui-func";

export default async function getUsers(type: RequestTypes): Promise<HTMLElement> {
  const list = createElement("ul", "", "users-list");

  const userData = JSON.stringify({
    id: "",
    type: type,
    payload: null,
  });

  socket.send(userData);

  socket.onmessage = function (event): void {
    const message = JSON.parse(event.data);
    console.log(message);
    const usersArray = message.payload.users;
    usersArray.forEach((el: { login: string; isLogined: boolean }) => {
      const listItem = createElement("li", `${el.login}`, "users-list__item");
      if (el.isLogined === true) {
        listItem.classList.add("users-active");
      } else {
        listItem.classList.add("users-inactive");
      }
      list.append(listItem);
    });
  };

  return list;
}

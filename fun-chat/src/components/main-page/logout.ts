import { returnUserName, usersList } from "../start-page/authentication";
import { socket } from "../socket";
import { RequestTypes } from "../../types/types";
import loginUser from "../start-page/user-authentication-page";

export default function logout(): void {
  console.log("logout");

  const userData = JSON.stringify({
    id: "",
    type: RequestTypes.logout,
    payload: {
      user: {
        login: returnUserName().name,
        password: returnUserName().password,
      },
    },
  });

  socket.send(userData);

  const chatPage = document.getElementById("main-chat");

  socket.onmessage = function (event): void {
    const message = JSON.parse(event.data);
    console.log(message);

    if (message.type === RequestTypes.logout) {
      // formElement.classList.remove("hidden");
      // if (chatPage) chatPage.classList.add("hidden");
      loginUser();
      if (chatPage) chatPage.remove();
      sessionStorage.removeItem("user1");
      usersList.pop();
    } else if (message.type === RequestTypes.error) {
      console.log(message.payload.error);
    }
  };
}

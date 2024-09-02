import { socket } from "../socket";
import { RequestTypes } from "../../types/types";
import createChat from "../main-page/user-chat-page";

const formElement = document.getElementById("login-form") as HTMLFormElement;
const submitInput = document.querySelector(".input_user-submit");
const passwordInput = document.querySelector(".input_user-password");
const popupWrapper = document.querySelector(".popup");
const popupMsg = document.querySelector(".popup-message");

interface User {
  name: string;
  password: string;
}
export const usersList: User[] = [];

export default function authentication(): void {
  const formData = new FormData(formElement);
  const userName = formData.get("user-name");
  const password = formData.get("user-password");

  const userData = JSON.stringify({
    id: "",
    type: RequestTypes.login,
    payload: { user: { login: userName, password: password } },
  });

  socket.send(userData);

  socket.onmessage = function (event): void {
    const message = JSON.parse(event.data);
    console.log(message);

    if (message.type === RequestTypes.login) {
      console.log(usersList);
      if (passwordInput) passwordInput.classList.remove("invalid");
      if (typeof userName === "string" && typeof password === "string") {
        usersList.push({
          name: userName,
          password: password,
        });
      }
      usersList.forEach((el, ind) => sessionStorage.setItem(`user${ind + 1}`, JSON.stringify(el)));
      // formElement.classList.add("hidden");
      formElement.remove();
      createChat();
    } else if (message.type === RequestTypes.error) {
      console.log(message.payload.error);
      if (passwordInput) passwordInput.classList.add("invalid");
      if (submitInput) submitInput.setAttribute("disabled", "true");
      if (popupWrapper) popupWrapper.classList.add("active");
      if (popupMsg) popupMsg.textContent = `${message.payload.error}.`;
    }
  };

  socket.onerror = function (error) {
    console.log(error);
  };

  // console.log(socket.readyState);
}

export function returnUserName() {
  const name = sessionStorage.getItem("user1");
  if (typeof name === "string") {
    const savedUser = JSON.parse(name);
    return savedUser;
  }
}

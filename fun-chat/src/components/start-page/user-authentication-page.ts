import { createElement, createInput } from "../ui-func";
import addAboutPopup from "../about-page/about-btn";

function loginUser(): void {
  const loginForm = createElement("form", "", "login-form");
  loginForm.setAttribute("id", "login-form");

  const title = createElement("h1", "Fun Chat", "title");

  const userNameInput = createInput("user-name", "text", "Enter your name");
  const userPswInput = createInput("user-password", "password", "Enter your password");
  const submitInput = createInput("user-submit", "submit");
  submitInput.setAttribute("value", "log in");
  const aboutBtn = createElement("button", "info", "about-btn");
  aboutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    document.body.append(addAboutPopup());
  });

  loginForm.append(title, userNameInput, userPswInput, aboutBtn, submitInput);

  const popupWrapper = createElement("div", "", "popup");
  const popup = createElement("div", " ", "popup-content");
  const popupMsg = createElement("p", "", "popup-message");
  const popupBtn = createElement("button", "ok", "popup-btn");
  popupBtn.addEventListener("click", (e) => {
    e.preventDefault();
    popupWrapper.classList.remove("active");
    submitInput.removeAttribute("disabled");
  });
  popup.append(popupMsg, popupBtn);
  popupWrapper.append(popup);

  document.body.append(loginForm, popupWrapper);
}
loginUser();

export default loginUser;

import { createElement } from "../ui-func";
import { returnUserName } from "../start-page/authentication";
import logout from "./logout";
import addAboutPopup from "../about-page/about-btn";

export default function addHeader(): HTMLElement {
  const header = createElement("header", "", "header");

  const userNameField = createElement("div", `user: ${returnUserName().name}`, "header__user-name");
  const appNameField = createElement("h3", "Fun Chat", "header__app-name");
  const aboutBtn = createElement("button", "info", "about-main-btn");
  aboutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    document.body.append(addAboutPopup());
  });
  const logoutButtonField = createElement("button", "log out", "header__logout-btn");

  logoutButtonField.addEventListener("click", logout);
  header.append(userNameField, appNameField, aboutBtn, logoutButtonField);

  return header;
}

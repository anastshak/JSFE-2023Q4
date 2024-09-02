import { createElement } from "../ui-func";

const info = `
  Heeey! My name is Anastasia and this is my solution to the task 'Fun chat'. 
  It was interesting, but I desperately did not have enough time to fully 
  implement it. So your check will be quick)). Thanks!
`;

export default function addAboutPopup(): HTMLElement {
  const popupWrapper = createElement("div", "", "popup", "active");
  const popup = createElement("div", " ", "popup-content");
  const popupMsg = createElement("p", `${info}`, "popup-message");
  const popupBtn = createElement("button", "back", "popup-btn");
  popupBtn.addEventListener("click", (e) => {
    e.preventDefault();
    popupWrapper.classList.remove("active");
  });
  popup.append(popupMsg, popupBtn);
  popupWrapper.append(popup);
  return popupWrapper;
}

import { createElement } from "../ui-func";
import addHeader from "./header";
import addFooter from "./footer";
import addUsersList from "./users-list";

async function createChat(): Promise<void> {
  const chatPage = createElement("main", "", "main");
  chatPage.setAttribute("id", "main-chat");

  const breakLine = createElement("hr", " ", "break-line");
  const breakLine2 = createElement("hr", " ", "break-line");

  const header = addHeader();
  const usersList = await addUsersList();
  const footer = addFooter();

  chatPage.append(header, breakLine, usersList, breakLine2, footer);
  document.body.append(chatPage);
}

export default createChat;

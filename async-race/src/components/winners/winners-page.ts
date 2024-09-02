import "./winners.css";
import { getWinners } from "../../api/api";
import createTableOfWinnersUI from "./ui-winners-table";
import { getPageMoving } from "../pages/pages-buttons";

const pageNumber: number = 1;

async function getWinnersPage(): Promise<HTMLDivElement> {
  const winners = await getWinners();
  console.log(winners);
  const winnersMain = document.createElement("div");
  winnersMain.classList.add("page-view", "page-view-winners", "hide");
  const winnersTitle = document.createElement("h2");
  winnersTitle.classList.add("winners-title", "winners-total-count");
  winnersTitle.textContent = `Winners: ${winners.totalCount}`;
  const pageNumberElem = document.createElement("p");
  pageNumberElem.classList.add("page-number");
  pageNumberElem.textContent = `Page: #${pageNumber}`;
  const table = document.createElement("div");
  table.classList.add("winners-list");
  table.innerHTML = `${createTableOfWinnersUI()}`;
  winnersMain.append(winnersTitle, pageNumberElem, table, getPageMoving());

  const winnersBtnPagination = winnersMain.querySelectorAll(".pagination button");
  winnersBtnPagination.forEach((btn) => btn.setAttribute("disabled", "true"));

  return winnersMain;
}

export default getWinnersPage;

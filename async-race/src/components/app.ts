import { getPageNavigation } from "./pages/pages-buttons";
import getGaragePage from "./garage/garage-page";
import getWinnersPage from "./winners/winners-page";

async function start(): Promise<void> {
  const titleGame = document.createElement("h1");
  titleGame.className = "title-game";
  titleGame.textContent = "ASYNC RACE";
  document.body.append(titleGame, getPageNavigation());

  const garagePage = await getGaragePage();
  const winnersPage = await getWinnersPage();
  document.body.append(garagePage, winnersPage);

  const garageBtn: HTMLButtonElement | null = document.querySelector(".nav-btn__garage");
  const winnersBtn: HTMLButtonElement | null = document.querySelector(".nav-btn__winners");

  winnersBtn?.addEventListener("click", () => {
    winnersBtn.setAttribute("disabled", "true");
    garageBtn?.removeAttribute("disabled");
    garagePage.classList.add("hide");
    winnersPage.classList.remove("hide");
  });

  garageBtn?.addEventListener("click", () => {
    garageBtn.setAttribute("disabled", "true");
    winnersBtn?.removeAttribute("disabled");
    winnersPage.classList.add("hide");
    garagePage.classList.remove("hide");
  });
}

export default start;

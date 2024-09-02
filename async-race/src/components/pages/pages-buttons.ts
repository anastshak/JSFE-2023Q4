import { getCars } from "../../api/api";
import { page, minusPage, plusPage, updateCarsList } from "../garage/edit-form-func";
import "./pages-buttons.css";

/* garage / winners */
export function getPageNavigation(): HTMLElement {
  const pageMenu = document.createElement("div");
  pageMenu.classList.add("nav");

  const garageBtn = document.createElement("button");
  garageBtn.classList.add("nav-btn", "nav-btn__garage");
  garageBtn.textContent = "Garage";
  garageBtn.setAttribute("disabled", "true");

  const winnersBtn = document.createElement("button");
  winnersBtn.classList.add("nav-btn", "nav-btn__winners");
  winnersBtn.textContent = "Winners";

  pageMenu.append(garageBtn, winnersBtn);

  return pageMenu;
}

/* PAGINATION */
export async function switchPage(e: Event) {
  const btn = e.target as HTMLElement;

  const allCars = await getCars(page);
  const numberOfAllCars: number = allCars.totalCount;
  const carsPerPage: number = 7;
  const countOfPages: number = Math.ceil(numberOfAllCars / carsPerPage);

  const pageTitle: HTMLParagraphElement | null = document.querySelector(".page-number");
  const prevBtn = document.querySelector(".page-btn_prev");
  const nextBtn = document.querySelector(".page-btn_next");

  if (btn.classList.contains("page-btn_next") && countOfPages > 1) {
    console.log("more then 7");
    prevBtn?.removeAttribute("disabled");
    plusPage();
    updateCarsList();
    if (pageTitle) pageTitle.textContent = `Page: ${page}`;
  } else if (btn.classList.contains("page-btn_next")) {
    console.log("less");
    btn.setAttribute("disabled", "true");
  }

  if (btn.classList.contains("page-btn_prev") && page > 1) {
    nextBtn?.removeAttribute("disabled");
    minusPage();
    updateCarsList();
    if (pageTitle) pageTitle.textContent = `Page: ${page}`;
  } else if (btn.classList.contains("page-btn_prev")) {
    console.log("dis");
    btn.setAttribute("disabled", "true");
  }
}

/* UI prev / next */
export function getPageMoving(): HTMLElement {
  const pagination = document.createElement("div");
  pagination.classList.add("pagination");

  const prevBtn = document.createElement("button");
  prevBtn.classList.add("page-btn", "page-btn_prev");
  prevBtn.textContent = "prev";
  prevBtn.setAttribute("disabled", "true");
  prevBtn.addEventListener("click", switchPage);

  const nextBtn = document.createElement("button");
  nextBtn.classList.add("page-btn", "page-btn_next");
  nextBtn.textContent = "next";
  nextBtn.addEventListener("click", switchPage);

  pagination.append(prevBtn, nextBtn);

  return pagination;
}

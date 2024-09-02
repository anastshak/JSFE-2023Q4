import { getCars } from "../../api/api";
import { getPageMoving } from "../pages/pages-buttons";
import createCarsList from "./cars-list";
import addEditForm from "./edit-form";
import { page } from "./edit-form-func";

async function getGaragePage(): Promise<HTMLDivElement> {
  const cars = await getCars(page);
  console.log(cars);
  const garageMain = document.createElement("div");
  garageMain.classList.add("page-view", "page-view-garage");

  const garageTitle = document.createElement("h2");
  garageTitle.classList.add("garage-title", "garage-total-count");
  garageTitle.textContent = `Garage: ${cars.totalCount}`;

  const pageNumberElem = document.createElement("p");
  pageNumberElem.classList.add("page-number");
  pageNumberElem.textContent = `Page: #${page}`;

  garageMain.append(garageTitle, pageNumberElem, addEditForm(), createCarsList(cars.carsList), getPageMoving());

  return garageMain;
}

export default getGaragePage;

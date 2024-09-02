import "./garage.css";
import { Car, Cars } from "../../types/types";
import createCarUI from "./ui-car&flag";
import { events } from "./edit-form-func";

function createCarElem(carDesc: Car): HTMLElement {
  const carElement = document.createElement("div");
  carElement.classList.add("cars-list__item");
  carElement.dataset.id = carDesc.id.toString();
  carElement.innerHTML = `${createCarUI(carDesc)}`;

  return carElement;
}

export default function createCarsList(carsList: Cars["carsList"]): HTMLElement {
  const carsListElem = document.createElement("div");
  carsListElem.classList.add("cars-list");

  carsList.forEach((car: Car) => {
    carsListElem.append(createCarElem(car));
  });

  carsListElem.addEventListener("click", events);

  return carsListElem;
}

import { createCar, updateCar, deleteCar, getCar, getCars, getAllCars } from "../../api/api";
import createCarsList from "./cars-list";
import { startCar, stopCar } from "./race";

export let page: number = 1;

export function plusPage() {
  page += 1;
}

export function minusPage() {
  page -= 1;
}

export async function updateCarsList() {
  const cars = await getCars(page);
  const all = await getAllCars();
  console.log(all);

  const carsList: HTMLElement | null = document.querySelector(".cars-list");
  carsList?.replaceWith(createCarsList(cars.carsList));

  const totalCount: HTMLHeadingElement | null = document.querySelector("h2");
  if (totalCount) {
    totalCount.innerText = `Garage: ${cars.totalCount}`;
  }
}

let idCar: number = 0;
export async function events(e: Event): Promise<number> {
  e.preventDefault();
  const target = e.target as HTMLElement;

  // select
  if (target.classList.contains("btn-car-select")) {
    idCar = Number(target.dataset.id);

    const selectedCar = await getCar(idCar);
    const nameSelectedCar = selectedCar.name;
    const input = document.querySelector(".update-input") as HTMLInputElement;
    input.value = nameSelectedCar;

    console.log(idCar);
    return idCar;
  }

  // remove
  if (target.classList.contains("btn-car-remove")) {
    idCar = Number(target.dataset.id);
    console.log(idCar);

    deleteCar(Number(idCar)).then(() => updateCarsList());
  }

  // start car
  if (target.classList.contains("btn-car-start")) {
    idCar = Number(target.dataset.id);
    console.log("start!");
    startCar(idCar);
  }

  // stop car
  if (target.classList.contains("btn-car-stop")) {
    idCar = Number(target.dataset.id);
    console.log("stop...");
    stopCar(idCar);
  }

  console.log(idCar);
  return idCar;
}

export function createNewCar(e: Event): void {
  e.preventDefault();
  const createForm = document.querySelector(".create-car") as HTMLFormElement;
  const textInput = createForm.querySelector(".text-input") as HTMLInputElement;
  const colorInput = createForm.querySelector(".color-input") as HTMLInputElement;

  const nameOfNewCar = textInput.value;
  const colorOfNewCar = colorInput.value;

  if (nameOfNewCar === "") {
    textInput.style.border = "2px solid red";
    textInput.style.backgroundColor = "rgba(255, 0, 0, 0.1)";
    textInput.setAttribute("placeholder", "Please, enter the data!");
  } else {
    createCar(nameOfNewCar, colorOfNewCar).then(() => updateCarsList());
    textInput.style.border = "1px solid black";
    textInput.style.backgroundColor = "field";
    textInput.setAttribute("placeholder", "Enter a new car name");
  }

  textInput.value = "";
}

export async function updateCarColor(e: Event) {
  e.preventDefault();
  const idCar = await events(e);
  const createForm = document.querySelector(".update-car") as HTMLFormElement;
  const textInput = createForm.querySelector(".text-input") as HTMLInputElement;
  const colorInput = createForm.querySelector(".color-input") as HTMLInputElement;

  const nameOfCar = textInput.value;
  const newColor = colorInput.value;

  if (nameOfCar === "") {
    textInput.style.border = "2px solid red";
    textInput.style.backgroundColor = "rgba(255, 0, 0, 0.1)";
    textInput.setAttribute("placeholder", "Please, select the car!");
  } else {
    updateCar(Number(idCar), nameOfCar, newColor).then(() => updateCarsList());

    textInput.style.border = "1px solid black";
    textInput.style.backgroundColor = "field";
    textInput.setAttribute("placeholder", "Select the car");
  }

  textInput.value = "";
}

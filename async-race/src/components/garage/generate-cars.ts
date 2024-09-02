import { createCar } from "../../api/api";
import { carsBrand, carsModel } from "./cars-brand&model";
import { updateCarsList } from "./edit-form-func";

function getRandomName(): string {
  const randomNumBrand = Math.floor(Math.random() * 50);
  const randomNumModel = Math.floor(Math.random() * 50);

  return `${carsBrand[randomNumBrand]} ${carsModel[randomNumModel]}`;
}

function getRandomColor(): string {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default function generate() {
  for (let i = 0; i < 100; i += 1) {
    const name = getRandomName();
    const color = getRandomColor();

    createCar(name, color);
  }
  updateCarsList();
}

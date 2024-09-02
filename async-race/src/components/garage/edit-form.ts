import "./garage.css";
import { createNewCar, updateCarColor, page } from "./edit-form-func";
import generate from "./generate-cars";
import { raceAll, resetAll } from "./race";

function addCreateCarForm(): HTMLFormElement {
  const form = document.createElement("form");
  form.classList.add("form", "create-car");

  const textInput = document.createElement("input");
  textInput.classList.add("text-input");
  textInput.setAttribute("type", "text");
  textInput.setAttribute("autocomplete", "off");
  textInput.setAttribute("placeholder", "Enter a new car name");

  const colorInput = document.createElement("input");
  colorInput.classList.add("color-input");
  colorInput.setAttribute("type", "color");
  colorInput.setAttribute("value", "#dc143c");

  const formBtn = document.createElement("button");
  formBtn.classList.add("create-car-bth");
  formBtn.textContent = "create";
  form.append(textInput, colorInput, formBtn);

  formBtn.addEventListener("click", createNewCar);

  return form;
}

function addUpdateCarForm(): HTMLFormElement {
  const form = document.createElement("form");
  form.classList.add("form", "update-car");

  const textInput = document.createElement("input");
  textInput.classList.add("text-input", "update-input");
  textInput.setAttribute("type", "text");
  textInput.setAttribute("autocomplete", "off");
  // textInput.setAttribute("readonly", "true");
  textInput.setAttribute("placeholder", "Select the car");

  const colorInput = document.createElement("input");
  colorInput.classList.add("color-input");
  colorInput.setAttribute("type", "color");
  colorInput.setAttribute("value", "#dc143c");

  const formBtn = document.createElement("button");
  formBtn.classList.add("update-car-bth");
  formBtn.textContent = "update";

  form.append(textInput, colorInput, formBtn);

  formBtn.addEventListener("click", updateCarColor);

  return form;
}

function addOptionBtn(name: string, className: string): HTMLButtonElement {
  const btn = document.createElement("button");
  btn.classList.add(`${className}`);
  btn.textContent = `${name}`;

  return btn;
}

function addOptions(): HTMLDivElement {
  const options = document.createElement("div");
  options.classList.add("form", "form__options");
  options.append(
    addOptionBtn("Race", "race-btn"),
    addOptionBtn("Reset", "reset-btn"),
    addOptionBtn("Generate", "generate-btn")
  );

  const generateBtn = options.querySelector(".generate-btn");
  generateBtn?.addEventListener("click", generate);

  const resetBtn = options.querySelector(".reset-btn");
  if (resetBtn) {
    resetBtn.setAttribute("disabled", "true");
    resetBtn.addEventListener("click", function reset() {
      resetAll(page);
    });
  }

  const raceBtn = options.querySelector(".race-btn");
  raceBtn?.addEventListener("click", function race() {
    raceAll(page);
  });

  return options;
}

export default function addEditForm(): HTMLDivElement {
  const editForm = document.createElement("div");
  editForm.classList.add("edit-form");
  editForm.append(addCreateCarForm(), addUpdateCarForm(), addOptions());

  return editForm;
}

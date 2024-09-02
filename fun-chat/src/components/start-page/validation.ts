import { createElement } from "../ui-func";
import authentication from "./authentication";

const inputs = document.querySelectorAll(".input-field");
const submit = document.querySelector(".input_user-submit");

class Validation {
  errors: string[] = [];

  checkValidity(input: HTMLInputElement) {
    const validity = input.validity;

    if (validity.patternMismatch) {
      input.classList.add("invalid");
      this.addError("This is the wrong pattern for this field: use only Latin letters, numbers and '-'");
    }

    if (validity.tooShort) {
      input.classList.add("invalid");
      const min = input.getAttribute("minlength");
      this.addError(`The minimum value should be ${min}`);
    }

    if (validity.valueMissing) {
      input.classList.add("invalid");
      this.addError("Enter the data, please");
    }

    if (validity.valid) {
      input.classList.remove("invalid");
      input.classList.add("valid");
    }
  }

  addError(message: string) {
    if (message.length > 0) {
      this.errors.push(message);
    }
  }

  getErrors() {
    return this.errors.join(". \n");
  }
}

function removeErrorMsg(): void {
  const errorMessages = document.querySelectorAll(".error-message");
  if (errorMessages.length > 0) {
    errorMessages.forEach((el) => el.parentNode?.removeChild(el));
  }
}

function checkForm(): void {
  const inputsValid: NodeListOf<Element> = document.querySelectorAll(".input-field.valid");
  if (inputsValid.length === 2) {
    console.log("FORM IS VALID!!!");
    authentication();
  }
}

function sbm(e: Event): void {
  removeErrorMsg();

  for (let i = 0; i < inputs.length - 1; i++) {
    const input = inputs[i] as HTMLInputElement;
    if (input.checkValidity() === false) {
      const validation = new Validation();
      validation.checkValidity(input);
      const customValidityMessage = validation.getErrors();
      if (customValidityMessage.length === 0) {
        removeErrorMsg();
        input.classList.remove("invalid");
        input.classList.add("valid");
      } else {
        input.classList.remove("valid");
        input.setCustomValidity(customValidityMessage);
        const hint = createElement("p", customValidityMessage, "error-message");
        input.insertAdjacentElement("afterend", hint);
      }
    } else {
      input.classList.add("valid");
    }
  }

  checkForm();
  e.preventDefault();
}

submit?.addEventListener("click", sbm);

document.addEventListener("keyup", (event) => {
  if (event.code === "Enter") sbm(event);
});

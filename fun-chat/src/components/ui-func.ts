export function createElement(tag: keyof HTMLElementTagNameMap, text: string, ...classes: string[]): HTMLElement {
  const element = document.createElement(tag);
  element.classList.add(...classes);
  element.textContent = text;
  return element;
}

interface InputAttr {
  name: string;
  type: string;
  placeholder?: string;
  required: string;
  minlength: string;
  autocomplete: string;
}

export function createInput(name: string, type: string, placeholder?: string): HTMLElement {
  const input = createElement("input", "", "input-field", `input_${name}`);
  const baseAttr: InputAttr = {
    name: name,
    type: type,
    placeholder: placeholder,
    required: "",
    minlength: "4",
    autocomplete: "off",
  };

  Object.entries(baseAttr).forEach(([key, value]) => input.setAttribute(key, value));

  if (type === "text" || type === "password") {
    input.setAttribute("pattern", "^[a-zA-Z0-9\\-]+");
  }

  return input;
}

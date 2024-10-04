import { createElement } from "./element-helper.js";

// Función para añadir letras al input
function addLetter(letter, index) {
  const input = document.getElementById(`inputText-${index}`);
  input.value += letter;
  validateInput(input, index); // Llamar a la función de validación después de añadir la letra
}

// Función para validar el input
function validateInput(input, index) {
  const container = document.getElementById(`inputContainer-${index}`);
  const word = input.getAttribute("placeholder");
  const isValid = word === input.value;
  input.style.backgroundColor = isValid ? "#d5ffcf" : "#e6b1ff"; // Verde pastel o Rojo pastel
  container.style.backgroundColor = isValid ? "#69b3fd" : "#e6b1ff"; // Cambiar el color de fondo del contenedor
  //container.style.display = isValid ? "none" : "block"; // Mostrar u ocultar el contenedor

  console.log("Texto introducido:", input.value);
}

// Función para crear el input con las letras alemanas y botón de enviar
export function createTextInput(word, index) {
  console.log("Palabra:", word);
  const placeholderText =
    typeof word === "object"
      ? word.type.includes("noun")
        ? `${word.article} ${word.word}`
        : `${word.word}`
      : word || "Escribe aquí...";

  const inputText = createElement("input", {
    className: "input-text",
    id: `inputText-${index}`,
    placeholder: placeholderText,
    type: "text",
    autocomplete: "off",
    onInput: (event) => validateInput(event.target, index),
    onClick: (event) => {
      germanLetters.style.display = "block";
      event.stopPropagation(); // Evitar que el evento de clic se propague al contenedor
    },
  });

  const germanLetters = createElement("div", {
    id: `germanButtons-${index}`,
    className: "german-letters",
    style: { display: "none" },
    children: [
      ...["ä", "ö", "ü", "ß"].map((letter) =>
        createElement("button", {
          onClick: (event) => {
            event.stopPropagation(); // Evitar que el evento se propague a otros elementos
            addLetter(letter, index);
          },
          children: [letter],
        })
      ),
      createElement("button", {
        onClick: (event) => {
          event.stopPropagation(); // Evitar que el evento se propague a otros elementos
          inputText.value = ""; // Limpiar el input
          validateInput(inputText, index); // Validar después de limpiar
        },
        children: ["X"], // Icono de basura para limpiar
      }),
    ],
  });

  const container = createElement("div", {
    id: `inputContainer-${index}`,
    className: "transcription-item",
    children: [inputText, germanLetters],
  });

  container.addEventListener("mouseleave", () => {
    germanLetters.style.display = "none";
    console.log("Ocultar letras alemanas");
  });

  container.addEventListener("mouseenter", () => {
    germanLetters.style.display = "block";
    console.log("Mostrar letras alemanas");
  });

  document.addEventListener("click", (event) => {
    const isClickInsideInput = inputText.contains(event.target);
    const isClickInsideButtons = germanLetters.contains(event.target);

    if (!isClickInsideInput && !isClickInsideButtons) {
      germanLetters.style.display = "none";
    }
  });

  return container;
}

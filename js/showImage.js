import { createElement } from "./element-helper.js";
import { MediaHandler } from "./media.js";
const mediaHandler = new MediaHandler();

export async function showImageDialog(word) {
  console.log("Mostrando imagen:", word);
  // Crear el fondo del diálogo
  const image = await mediaHandler.getMedia(word, "image");
  const dialogOverlay = createElement("div", {
    id: "dialogOverlay",
  });

  // Crear el contenedor del diálogo
  const dialogContainer = createElement("div", {
    id: "dialogContainer",
  });

  // Crear la imagen dentro del diálogo
  const dialogImage = createElement("img", {
    src: image,
  });

  // Calcular el tamaño de la fuente basado en la longitud de la palabra
  const baseFontSize = 34; // Tamaño base de la fuente
  const maxLength = 10; // Longitud máxima para el tamaño base
  const fontSize = word.word.length > maxLength ? baseFontSize - (word.word.length - maxLength) : baseFontSize;

  let reading = word.word;
    if (word.type.includes("noun")) {
      reading = `${word.article} ${word.word}`;
    }
  // Crear el texto debajo de la imagen
  const dialogText = createElement("p", {
    textContent: reading,
    style: {
      fontSize: `${fontSize}px`, // Cambiar el tamaño de la letra dinámicamente
    },
  });

  // Crear el botón de cerrar
  const closeButton = createElement("button", {
    textContent: "X",
    onClick: () => {
      document.body.removeChild(dialogOverlay);
    },
  });

  // Añadir la imagen, el texto y el botón de cerrar al contenedor del diálogo
  dialogContainer.appendChild(dialogImage);
  dialogContainer.appendChild(dialogText);
  dialogContainer.appendChild(closeButton);

  // Añadir el contenedor del diálogo al fondo del diálogo
  dialogOverlay.appendChild(dialogContainer);

  // Añadir el fondo del diálogo al cuerpo del documento después de un segundo
  setTimeout(() => {
    document.body.appendChild(dialogOverlay);

    // Cerrar el diálogo automáticamente después de 3 segundos
    setTimeout(() => {
      document.body.removeChild(dialogOverlay);
    }, 500);
  }, 500);
}
export function createElement(type, { children = [], ...props } = {}) {
  const element = document.createElement(type);

  for (const [key, value] of Object.entries(props)) {
    if (key === "style" && typeof value === "object") {
      Object.assign(element.style, value);
    } else if (key.startsWith("on") && typeof value === "function") {
      element.addEventListener(key.substring(2).toLowerCase(), value);
    } else if (key.startsWith("data-") || key === "for") {
      element.setAttribute(key, value);
    } else {
      element[key] = value;
    }
  }

  children.forEach((child) => {
    if (typeof child === "string") {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(child);
    }
  });

  return element;
}

import { MediaHandler } from "./media.js";
const mediaHandler = new MediaHandler();

export function createAudioButton(word, index, soundEnabled) {
  return createElement("button", {
    id: "audioButton",
    className: "word-item",
    "data-pair": index,
    children: [
      createElement("img", {
        src: "assets/images/wave.png", // Ruta al icono de audio
        alt: "Audio Icon",
        className: "audio-icon",
      }),
    ],
    onClick: () => {
      if (soundEnabled) mediaHandler.playAudio(word);
      console.log("Reproduciendo audio:", word.audio);
    },
  });
}

export function createTextButton(word, index, translation = false) {
  return createElement("button", {
    id: "textButton",
    className: "word-item",
    "data-pair": index,
    children: [createTextComponent(word, translation, () => {})],
  });
}

export function createTextComponent(word, translation, eventHandler) {
  let reading = word.word;
  if (word.type.includes("noun")) {
    reading = `${word.article} ${word.word}`;
  }
  const element = createElement("span", {
    className: "word-text",
    textContent: translation
      ? word.translation
      : reading,
    onClick: eventHandler,
  });
  return element;
}

export function createImageButton(word, index, type, eventHandler) {
  return createElement("button", {
    id: "miniButton",
    "data-pair": index,
    children: [
      createElement("img", {
        src: `assets/images/${type}.png`, // Ruta al icono de imagen
        alt: "Image Icon",
        className: "image-icon",
      }),
    ],
  });
}

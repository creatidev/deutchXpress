import {
  createElement,
  createTextComponent,
  createAudioButton,
  createImageButton,
  createTextButton,
} from "./element-helper.js";
import { Word } from "./dictionary.js";
import BasicFunctions from "./basic-functions.js";
import { showImageDialog } from "./showImage.js";
import { createTextInput } from "./inputText.js";
import { getCasesByWord } from "./article-cases.js";

const basicFunctions = new BasicFunctions();


let errorCount = 0;
let currentIndex = 0;
let batchSize = 5;
let mode = "text";
let soundEnabled = localStorage.getItem("soundEnabled") === "false" ? false : true;
let imageEnabled = true;

// Contenedores y botones
const gameContainer = document.getElementById("gameContainer");
const errorCounter = createElement("div", {
  id: "errorCounter",
  textContent: "Errores: 0",
});
const wordCounter = createElement("div", {
  id: "wordCounter",
  textContent: "Palabras Totales: 0 | Palabras Restantes: 0",
});

const totalWords = wordCounter.totalWords;

const categorySelector = createElement("select", {
  id: "categorySelector",
  onchange: () => {
    words = wordCategories[categorySelector.value];
    currentIndex = 0;
    errorCount = 0;
    loadWords();
  },
});
const batchSizeSelector = createElement("select", {
  id: "batchSizeSelector",
  children: [
    createElement("option", { value: 5, textContent: "5" }),
    createElement("option", { value: 10, textContent: "10" }),
  ],
});

batchSizeSelector.addEventListener("change", () => {
  batchSize = parseInt(batchSizeSelector.value, 10);
  console.log("batchSize", batchSize);
  currentIndex = 0;
  loadWords();
});

const modeSelector = createElement("select", {
  id: "modeSelector",
  children: [
    createElement("option", { value: "none", textContent: "Seleccione una opción" }),
    createElement("option", { value: "audio", textContent: "Audio" }),
    createElement("option", { value: "text", textContent: "Texto" }),
    createElement("option", {
      value: "audio_vs_text",
      textContent: "Audio vs Texto",
    }),
    createElement("option", {
      value: "audio_vs_image",
      textContent: "Audio vs Imagen",
    }),
    createElement("option", {
      value: "text_vs_image",
      textContent: "Texto vs Imagen",
    }),
    createElement("option", {
      value: "transcription",
      textContent: "Transcripción",
    }),
  ],
  onchange: () => {
    mode = modeSelector.value;
    loadWords();
  },
});

const nextButton = createElement("button", {
  id: "nextButton",
  textContent: "Siguiente",
  style: { display: "none" },
  onClick: () => {
    currentIndex += batchSize;
    loadWords();
    if (currentIndex > 0) {
      backButton.style.display = "block";
    }
    if (currentIndex + batchSize < totalWords) {
      nextButton.style.display = "block";
    }
  },
});

const backButton = createElement("button", {
  id: "backButton",
  textContent: "Anterior",
  style: { display: "none" },
  onClick: () => {
    currentIndex -= batchSize;
    loadWords();
    if (currentIndex <= 0) {
      backButton.style.display = "none";
    }
    if (currentIndex + batchSize < totalWords) {
      nextButton.style.display = "block";
    }
  },
});

const resetButton = createElement("button", {
  id: "resetButton",
  textContent: "Reiniciar",
  onClick: () => {
    currentIndex = 0;
    errorCount = 0;
    errorCounter.textContent = "Errores: 0";
    loadWords();
    // Restablecer la visibilidad de los botones
    nextButton.style.display = totalWords > batchSize ? "block" : "none";
    backButton.style.display = "none";
  },
});

const buttonsContainer = createElement("div", {
  id: "buttonsContainer",
  children: [nextButton, backButton, resetButton],
});

const wordContainer = createElement("div", { className: "word-container" });
const listWords = createElement("div", {
  className: "list-words",
  onClick: (event) => {
    const target = event.target.closest(".word-item");
    console.log("target:", target);
    if (target && !target.classList.contains("matched")) {
      if (basicFunctions.selectedGermanWord)
        basicFunctions.selectedGermanWord.style.backgroundColor = "";
      basicFunctions.selectedGermanWord = target;
      basicFunctions.selectedGermanWord.style.backgroundColor = "#4da6ff";
      basicFunctions.checkMatch(
        batchSize,
        words,
        buttonsContainer,        
        errorCounter,
        errorCount,
        currentIndex
      );
    }
  },
});
const translationWords = createElement("div", {
  className: "list-words",
  onClick: (event) => {
    const target = event.target.closest(".word-item");
    if (target && !target.classList.contains("matched")) {
      if (basicFunctions.selectedSpanishWord)
        basicFunctions.selectedSpanishWord.style.backgroundColor = "";
      basicFunctions.selectedSpanishWord = target;
      basicFunctions.selectedSpanishWord.style.backgroundColor = "#4da6ff";
      basicFunctions.checkMatch(
        batchSize,
        words,
        buttonsContainer,
        errorCounter,
        errorCount,
        currentIndex
      );
    }
  },
});

const imageToggle = createElement("input", {
  type: "checkbox",
  id: "imageToggle",
  checked: true, // Por defecto, la imagen está habilitada
  onchange: () => {
    imageEnabled = imageToggle.checked;
    console.log("imageEnabled", imageEnabled);
  },
});

const imageToggleLabel = createElement("label", {
  htmlFor: "imageToggle",
  textContent: "Mostrar imagen",
});


const soundToggle = createElement("input", {
  type: "checkbox",
  id: "soundToggle",
  checked: soundEnabled, // Por defecto, el sonido está habilitado
  onchange: () => {
    soundEnabled = soundToggle.checked;
    localStorage.setItem("soundEnabled", soundEnabled ? "true" : "false"); // Asegúrate de guardar como cadena "true" o "false"
    console.log("soundEnabled", soundEnabled);
  },
});


const soundToggleLabel = createElement("label", {
  htmlFor: "soundToggle",
  textContent: "Habilitar sonido",
});

const localSoundAssetsToggle = createElement("input", {
  type: "checkbox",
  id: "localSoundAssetsToggle",
  checked: true, // Por defecto, el sonido está habilitado
  onchange: () => {
    let localAssetsSound = localSoundAssetsToggle.checked;
    console.log("localAssetsSound", localAssetsSound);
    mediaHandler.setLocalAssetsSound(localAssetsSound);
  },
});

const localSoundAssetsToggleLabel = createElement("label", {
  htmlFor: "localSoundAssetsToggle",
  textContent: "Usar sonidos locales",
});

const volumeControl = createElement("input", {
  type: "range",
  id: "volumeControl",
  min: 0,
  max: 1,
  step: 0.1,
  value: 1, // Volumen por defecto al máximo
  oninput: () => {
    mediaHandler.setVolume(volumeControl.value);
  },
});

const volumeControlLabel = createElement("label", {
  htmlFor: "volumeControl",
  textContent: "Control de volumen",
});

const speedControl = createElement("input", {
  type: "range",
  id: "speedControl",
  min: 0.5,
  max: 2,
  step: 0.1,
  value: 1, // Velocidad por defecto
  oninput: () => {
    mediaHandler.setSpeed(speedControl.value);
  },
});

const speedControlLabel = createElement("label", {
  htmlFor: "speedControl",
  textContent: "Control de velocidad",
});

const textInput = createTextInput();

wordContainer.appendChild(listWords);
wordContainer.appendChild(translationWords);
// Agregar los componentes al contenedor principal
gameContainer.append(
  volumeControlLabel,
  volumeControl,
  speedControlLabel,
  speedControl,
  localSoundAssetsToggleLabel,
  localSoundAssetsToggle,
  soundToggleLabel,
  soundToggle,
  imageToggleLabel,
  imageToggle,
  errorCounter,
  wordCounter,
  categorySelector,
  modeSelector,
  wordContainer,
  batchSizeSelector,  
  buttonsContainer,
  textInput
);

let wordCategories = {};
let words = []; // Inicializar como un array vacío

async function fetchWordCategories() {
  const response = await fetch("./dictionaryC.json");
  const data = await response.json();
  const allWords = data.map((wordData) => new Word(wordData));
  console.log("soundEnabled", soundEnabled);
  // Agrupar palabras por categorías
  wordCategories = allWords.reduce((categories, word) => {
    word.categories.forEach((category) => {
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(word);
    });
    return categories;
  }, {});

  // Agregar las categorías al selector después de cargar el JSON
  Object.keys(wordCategories).forEach((category) => {
    const option = createElement("option", {
      value: category,
      textContent:
        category.charAt(0).toUpperCase() +
        category.slice(1).replace(/([A-Z])/g, " $1"), // Capitaliza la primera letra y añade espacio
    });
    categorySelector.appendChild(option);
  });

  // Inicializar las palabras con la primera categoría seleccionada
  words = wordCategories[Object.keys(wordCategories)[0]]; // Palabras iniciales
  loadWords();
}
fetchWordCategories();
import { MediaHandler } from "./media.js";
const mediaHandler = new MediaHandler();
// Cargar las palabras en el DOM
function loadWords() {
  if (!words || words.length === 0) return; // Verificar si words está definido y no está vacío

  listWords.innerHTML = "";
  translationWords.innerHTML = "";

  const currentBatch = words.slice(currentIndex, currentIndex + batchSize);

  basicFunctions.shuffleArray(currentBatch);

  switch (mode) {
    case "text":
    case "audio":
    case "audio_vs_text":
    case "audio_vs_transcription":
    case "text_vs_transcription":
      translationWords.style.display = "flex";
      break;
    case "audio_vs_image":
    case "text_vs_image":
    case "transcription_vs_image":
      translationWords.style.display = "block";
      break;
  }

  currentBatch.forEach((word, index) => {
    switch (mode) {
      case "audio":
      case "audio_vs_text":
      case "audio_vs_image":
        console.log("word", word);
        const audioButton = createAudioButton(word, index, soundEnabled);
        audioButton.addEventListener("click", async () => {
          if (imageEnabled) showImageDialog(word);
        });
        listWords.appendChild(audioButton);
        break;
      case "text":
      case "text_vs_image":
        const textButton = createTextButton(word, index);
        textButton.addEventListener("click", async () => {
          console.log(getCasesByWord(word));
          if (soundEnabled) mediaHandler.playAudio(word);
          if (imageEnabled) showImageDialog(word);
        });
        listWords.appendChild(textButton);
        break;
      case "transcription":
      const textInputContainer = createTextInput(word, index);
      const textInput = textInputContainer.querySelector('input');
      textInputContainer.addEventListener("click", async () => {
          if (soundEnabled) {
            mediaHandler.playAudio(word);
          }
          if (imageEnabled) showImageDialog(word);
        });
        textInput.addEventListener("input", (event) => {
          const placeholderValue = textInput.placeholder;
          if (placeholderValue === event.target.value) {
            console.log("Correcto");
            textInputContainer.disabled = true;
            textInputContainer.style.backgroundColor = "#d5ffcf";
            textInputContainer.classList.add('blocked');
      
            translationWords.appendChild(textInputContainer);
          }
        });
        listWords.appendChild(textInputContainer);
        break;
    }
  });

  const wordsTranslations = [...currentBatch];
  basicFunctions.shuffleArray(wordsTranslations); // Mezclar las palabras en español

  // Crear elementos de palabras en español o alemán según el modo
  wordsTranslations.forEach((word, index) => {
    switch (mode) {
      case "audio_vs_text":
        let index = currentBatch.findIndex((w) => w.word === word.word);
        const textButton = createTextButton(word, index);
        textButton.addEventListener("click", async () => {
          if (soundEnabled) mediaHandler.playAudio(word);
          if (imageEnabled) showImageDialog(word);
        });
        translationWords.appendChild(textButton);
        break;
      case "audio_vs_image":
      case "text_vs_image":
        (async () => {
          translationWords.appendChild(
            createElement("button", {
              id: "imageButton",
              className: "word-item",
              children: [
                createElement("img", {
                  src: await mediaHandler.getMedia(word, "image"), // Aquí se muestra la imagen correspondiente
                  alt: word.word, // Añadir alt para accesibilidad
                }),
                createElement("button", {
                  className: "flip-button",
                  onClick: (event) => {
                    event.stopPropagation(); // Evitar que el evento se propague al botón principal
                    event.currentTarget.parentElement.classList.toggle("flip"); // Añadir o quitar la clase flip al hacer clic
                  },
                }),
              ],
              "data-pair": currentBatch.findIndex((w) => w.word === word.word),
              onClick: () => {
                if (soundEnabled) mediaHandler.playAudio(word);
                if (imageEnabled) showImageDialog(word);
                //event.currentTarget.classList.toggle("flip"); // Añadir o quitar la clase flip al hacer clic
              },
            })
          );
        })();
        break;
      case "transcription":
        const translatedWords = createElement("div", {
          className: "translated-words",
          
        });
        translationWords.appendChild(translatedWords);
        break;
      default:
        let index1 = currentBatch.findIndex(
          (w) => w.translation === word.translation
        );
        const translatedButton = createTextButton(word, index1, true);
        translatedButton.addEventListener("click", async () => {
          if (soundEnabled) mediaHandler.playAudio(word);
          if (imageEnabled) showImageDialog(word);
        });
        translationWords.appendChild(translatedButton);
        break;
    }
  });

  basicFunctions.updateCounters(words, currentIndex, wordCounter);

  if (currentIndex + batchSize < words.length) {
    nextButton.style.display = "block";
  } else {
    nextButton.style.display = "none";
  }
}

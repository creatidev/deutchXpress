import { createElement } from "./element-helper.js";
import { Word } from "./dictionary.js";

// JSON de ejemplo
const wordsData = [
  {
    "word": "Hund",
    "translation": "Perro",
    "audio": "assets/sounds/hund.mp3",
    "imagen": "assets/images/hund.png",
    "gender": "masculino",
    "plural": "Hunde",
    "type": "sustantivo",
    "pronunciation": "/huːnt/",
    "categories": ["Mascotas", "Animales"],
    "article": "der",
    "case": ["Nominativo", "Acusativo"],
    "diminutive": "Hündchen",
    "synonyms": ["Tier", "Haustier"],
    "antonyms": ["Katze"],
    "compound_words": ["Hundehütte", "Hundesalon"],
    "usage": [
      {
        "german": "Der Hund bellt laut.",
        "spanish": "El perro ladra fuerte."
      }
    ],
    "related_words": ["Tier", "Hundehütte"],
    "frequency": "Alta"
  },
  {
    "word": "Katze",
    "translation": "Gato",
    "audio": "assets/sounds/katze.mp3",
    "imagen": "assets/images/katze.png",
    "gender": "femenino",
    "plural": "Katzen",
    "type": "sustantivo",
    "pronunciation": "/ˈkatsə/",
    "categories": ["Mascotas", "Animales"],
    "article": "die",
    "case": ["Nominativo", "Acusativo"],
    "diminutive": "Kätzchen",
    "synonyms": ["Mieze"],
    "antonyms": ["Hund"],
    "compound_words": ["Katzenkorb", "Katzenfutter"],
    "usage": [
      {
        "german": "Die Katze schläft im Korb.",
        "spanish": "El gato duerme en la cesta."
      }
    ],
    "related_words": ["Mieze", "Hauskatze"],
    "frequency": "Alta"
  },
  {
    "word": "Vogel",
    "translation": "Pájaro",
    "audio": "assets/sounds/vogel.mp3",
    "imagen": "assets/images/vogel.png",
    "gender": "masculino",
    "plural": "Vögel",
    "type": "sustantivo",
    "pronunciation": "/ˈfoːɡl̩/",
    "categories": ["Mascotas", "Animales"],
    "article": "der",
    "case": ["Nominativo", "Genitivo"],
    "diminutive": "Vögelchen",
    "synonyms": ["Geflügel"],
    "antonyms": [],
    "compound_words": ["Vogelkäfig", "Vogelhaus"],
    "usage": [
      {
        "german": "Der Vogel singt schön.",
        "spanish": "El pájaro canta bonito."
      }
    ],
    "related_words": ["Geflügel", "Vogelhaus"],
    "frequency": "Media"
  },
  {
    "word": "Maus",
    "translation": "Rata",
    "audio": "assets/sounds/maus.mp3",
    "imagen": "assets/images/maus.png",
    "gender": "femenino",
    "plural": "Mäuse",
    "type": "sustantivo",
    "pronunciation": "/maʊs/",
    "categories": ["Mascotas", "Animales"],
    "article": "die",
    "case": ["Nominativo", "Dativo"],
    "diminutive": "Mäuschen",
    "synonyms": ["Nagetier"],
    "antonyms": [],
    "compound_words": ["Mausefalle", "Mausehaufen"],
    "usage": [
      {
        "german": "Die Maus frisst Käse.",
        "spanish": "La rata come queso."
      }
    ],
    "related_words": ["Nagetier", "Mausefalle"],
    "frequency": "Media"
  },
  {
    "word": "Schmetterling",
    "translation": "Mariposa",
    "audio": "assets/sounds/schmetterling.mp3",
    "imagen": "assets/images/schmetterling.png",
    "gender": "masculino",
    "plural": "Schmetterlinge",
    "type": "sustantivo",
    "pronunciation": "/ˈʃmɛtɐlɪŋ/",
    "categories": ["Insectos", "Animales"],
    "article": "der",
    "case": ["Nominativo", "Acusativo"],
    "diminutive": "Schmetterlingchen",
    "synonyms": [],
    "antonyms": [],
    "compound_words": ["Schmetterlingsflügel"],
    "usage": [
      {
        "german": "Der Schmetterling fliegt.",
        "spanish": "La mariposa vuela."
      }
    ],
    "related_words": [],
    "frequency": "Media"
  },
  {
    "word": "Fisch",
    "translation": "Pez",
    "audio": "assets/sounds/fisch.mp3",
    "imagen": "assets/images/fisch.png",
    "gender": "masculino",
    "plural": "Fische",
    "type": "sustantivo",
    "pronunciation": "/fɪʃ/",
    "categories": ["Mascotas", "Animales"],
    "article": "der",
    "case": ["Nominativo", "Acusativo"],
    "diminutive": "Fischlein",
    "synonyms": ["Meerestier"],
    "antonyms": [],
    "compound_words": ["Fischschwarm", "Fischmarkt"],
    "usage": [
      {
        "german": "Der Fisch schwimmt im Wasser.",
        "spanish": "El pez nada en el agua."
      }
    ],
    "related_words": ["Meerestier", "Fischmarkt"],
    "frequency": "Alta"
  },
  {
    "word": "Schildkröte",
    "translation": "Tortuga",
    "audio": "assets/sounds/Schildkrote.mp3",
    "imagen": "assets/images/schildkroete.png",
    "gender": "femenino",
    "plural": "Schildkröten",
    "type": "sustantivo",
    "pronunciation": "/ˈʃɪltkʁøːtə/",
    "categories": ["Mascotas", "Animales"],
    "article": "die",
    "case": ["Nominativo", "Dativo"],
    "diminutive": "Schildkrötchen",
    "synonyms": [],
    "antonyms": [],
    "compound_words": ["Schildkrötenpanzer"],
    "usage": [
      {
        "german": "Die Schildkröte bewegt sich langsam.",
        "spanish": "La tortuga se mueve despacio."
      }
    ],
    "related_words": [],
    "frequency": "Baja"
  }
];


function createWordCard(word) {
  return createElement("div", {
    className: "word-card",
    children: [
      createElement("img", { src: word.imagen, alt: word.word, className: "word-image" }),
      createElement("h2", { textContent: word.word }),
      createElement("p", { textContent: `Artículo: ${word.article}` }),
      createElement("p", { textContent: `Traducción: ${word.translation}` }),
      createElement("p", { textContent: `Género: ${word.gender}` }),
      word.plural ? createElement("p", { textContent: `Plural: ${word.plural}` }) : null,
      createElement("p", { textContent: `Tipo: ${word.type}` }),
      createElement("p", { textContent: `Pronunciación: ${word.pronunciation}` }),
      createElement("audio", {
        controls: true,
        children: [
          createElement("source", { src: word.audio, type: "audio/mpeg" })
        ]
      })
    ].filter(Boolean) // Filtrar elementos nulos
  });
}

async function fetchGoogleTranslateTTS(text, lang = 'de') { // Cambiado a 'de' para alemán
  const url = `https://translate.google.com.vn/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=${lang}&client=tw-ob`;
  const response = await fetch(url, { mode: 'no-cors' });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const blob = await response.blob();
  const audioUrl = URL.createObjectURL(blob);
  localStorage.setItem(text, audioUrl);
  return audioUrl;
}

// Contenedor principal
const mainContainer = document.getElementById("mainContainer");

// Crear y agregar las tarjetas al contenedor principal
wordsData.forEach(async (wordData) => {
  const word = new Word(wordData);
  try {
    let audioUrl = localStorage.getItem(word.word); // Usar la palabra en alemán como clave
    if (!audioUrl) {
      audioUrl = await fetchGoogleTranslateTTS(word.word); // Obtener el audio en alemán
    }
    word.audio = audioUrl;
  } catch (error) {
    console.error('Error fetching TTS audio:', error);
  }
  const wordCard = createWordCard(word);
  mainContainer.appendChild(wordCard);
});
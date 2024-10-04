import { createElement } from "./element-helper.js";
import { Word } from "./dictionary.js";

export class WordCategoryFetcher {
  constructor(dictionaryPath, categorySelector, wordLoader) {
    this.dictionaryPath = dictionaryPath;
    this.categorySelector = categorySelector;
    this.wordLoader = wordLoader;
    this.wordCategories = {};
    this.words = [];
  }

  async fetchWordCategories() {
    const response = await fetch(this.dictionaryPath);
    const data = await response.json();
    const allWords = data.map((wordData) => new Word(wordData));

    // Agrupar palabras por categorías
    this.wordCategories = allWords.reduce((categories, word) => {
      word.categories.forEach((category) => {
        if (!categories[category]) {
          categories[category] = [];
        }
        categories[category].push(word);
      });
      return categories;
    }, {});

    // Agregar las categorías al selector después de cargar el JSON
    Object.keys(this.wordCategories).forEach((category) => {
      const option = createElement("option", {
        value: category,
        textContent:
          category.charAt(0).toUpperCase() +
          category.slice(1).replace(/([A-Z])/g, " $1"), // Capitaliza la primera letra y añade espacio
      });
      this.categorySelector.appendChild(option);
    });

    // Inicializar las palabras con la primera categoría seleccionada
    this.words = this.wordCategories[Object.keys(this.wordCategories)[0]]; // Palabras iniciales
    this.wordLoader(this.words);
  }

  getWordCategories() {
    return this.wordCategories;
  }

  getWords() {
    return this.words;
  }
}
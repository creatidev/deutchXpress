// Definición de la clase Word
export class Word {
  constructor(data) {
    this.word = data.word;
    this.translation = data.translation;
    this.type = Array.isArray(data.type) ? data.type : [data.type]; // Asegurarse de que type sea un array
    this.pronunciation = data.pronunciation;
    this.categories = data.categories;

    // Propiedades específicas para sustantivos
    if (this.type.includes("noun")) {
      this.gender = data.gender;
      this.plural = data.plural;
      this.article = data.article;

      // Validación de "case"
      if (data.case && typeof data.case === 'object') {
        this.case = {
          nominative: data.case.nominative || '',
          accusative: data.case.accusative || '',
          dative: data.case.dative || '',
          genitive: data.case.genitive || ''
        };
      } else {
        this.case = {};
      }

      this.diminutive = data.diminutive || null;
      this.synonyms = data.synonyms || [];
      this.antonyms = data.antonyms || [];
      this.compound_words = data.compound_words || [];
    }

    // Propiedades específicas para verbos
    if (this.type.includes("verb")) {
      this.prefix = data.prefix || null; // Prefijo si es un verbo con prefijo
      this.separable = data.separable || false; // Si es separable o no
      this.participle = data.participle || null; // Participio pasado
      this.auxiliary = data.auxiliary || null; // Verbo auxiliar (haben/sein)
      this.conjugation = data.conjugation || {}; // Conjugación completa
    }

    // Propiedades adicionales comunes a cualquier palabra
    this.usage = data.usage || []; // Ejemplos de uso
    this.related_words = data.related_words || []; // Palabras relacionadas
    this.frequency = data.frequency || "Media"; // Frecuencia de uso
    this.difficulty = data.difficulty || 0; // Dificultad (1-5)

    // Determinar la carpeta de sonidos basada en los tipos
    this.soundFolder = this.determineSoundFolder();
  }
  
  determineSoundFolder() {
    const typeToFolderMap = {
      noun: 'nouns',
      verb: 'verbs',
      adjective: 'adjectives', // Agrega más tipos según sea necesario
      adverb: 'adverbs'
    };

    for (const wordType of this.type) {
      if (typeToFolderMap[wordType]) {
        return typeToFolderMap[wordType];
      }
    }
    return ''; // Carpeta por defecto si no se encuentra un tipo específico
  }

  getSoundPath() {
    return `assets/sounds/${this.soundFolder}/${this.word.toLowerCase()}.mp3`;
  }
}

// Definición de la clase WordCategory
export class WordCategory {
  constructor(name, words) {
    this.name = name;
    this.words = words.map((wordData) => new Word(wordData));
  }
}
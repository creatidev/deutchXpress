class BasicFunctions {
  constructor() {
    this.selectedGermanWord = null;
    this.selectedSpanishWord = null;
  }

  // Actualizar los contadores de palabras
  updateCounters(words, currentIndex, wordCounter) {
    const totalWords = words.length;
    const remainingWords =
      totalWords -
      (currentIndex +
        document.querySelectorAll("#germanWords .matched").length);
    wordCounter.textContent = `Palabras Totales: ${totalWords} | Palabras Restantes: ${remainingWords}`;
  }

  // Función para verificar coincidencias
  checkMatch(
    batchSize,
    words,
    nextButton,
    errorCounter,
    errorCount,
    currentIndex
  ) {
    if (this.selectedGermanWord && this.selectedSpanishWord) {
      if (
        this.selectedGermanWord.dataset.pair ===
        this.selectedSpanishWord.dataset.pair
      ) {
        this.selectedGermanWord.classList.add("matched");
        this.selectedSpanishWord.classList.add("matched");
        this.resetSelection();

        const germanMatched = document.querySelectorAll(
          "#germanWords .matched"
        ).length;

        if (germanMatched === batchSize) {
          if (currentIndex + batchSize < words.length) {
            nextButton.style.display = "block";
          }
        }
      } else {
        errorCount++;
        errorCounter.textContent = "Errores: " + errorCount;
        this.resetSelection();
      }
    }
  }

  // Resetear selección después de verificar
  resetSelection() {
    if (this.selectedGermanWord)
      this.selectedGermanWord.style.backgroundColor = "";
    if (this.selectedSpanishWord)
      this.selectedSpanishWord.style.backgroundColor = "";
    this.selectedGermanWord = null;
    this.selectedSpanishWord = null;
  }

  // Función para mezclar un array
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}

export default BasicFunctions;

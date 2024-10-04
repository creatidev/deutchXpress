const articles = {
    masculine: {
        nominative: "der",
        accusative: "den",
        dative: "dem",
        genitive: "des"
    },
    feminine: {
        nominative: "die",
        accusative: "die",
        dative: "der",
        genitive: "der"
    },
    neuter: {
        nominative: "das",
        accusative: "das",
        dative: "dem",
        genitive: "des"
    }
};

export function getCasesByWord(word) {
    if (!word || !word.type || !word.article || !word.word) {
        return "El objeto palabra no es válido";
    }

    if (!word.type.includes("noun")) {
        return "El tipo de palabra no es un sustantivo";
    }

    const { article, word: noun } = word;
    const gender = Object.keys(articles).find(g => articles[g].nominative === article);

    if (!gender) {
        return "Artículo no reconocido";
    }

    const cases = articles[gender];

    // Determinar la terminación del genitivo
    let genitiveNoun = noun;
    if (gender === "masculine" || gender === "neuter") {
        console.log(gender);
        if (noun.endsWith("e")) {
            genitiveNoun += "n";
        } else if (noun.length <= 2 || noun.endsWith("s") || noun.endsWith("ß") || noun.endsWith("x") || noun.endsWith("z")) {
            genitiveNoun += "es";
        } else {
            genitiveNoun += "s";
        }
    } else if (gender === "feminine") {
        // Para sustantivos femeninos, el genitivo no cambia
        genitiveNoun = noun;
    }

    return {
        nominative: `${cases.nominative} ${noun}`,
        accusative: `${cases.accusative} ${noun}`,
        dative: `${cases.dative} ${noun}`,
        genitive: `${cases.genitive} ${genitiveNoun}`
    };
}
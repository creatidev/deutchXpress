export class MediaHandler {
  constructor(manifestPath = "manifest.json") {
    this.volume = 1;
    this.speed = 1;
    this.localAssetsSound = true;
    this.init(manifestPath).then(() => {
      console.log(this.basePath);
    });
  }

  async init(manifestPath) {
    this.basePath = await this.getAssetsPath(manifestPath);
  }

  async getAssetsPath(manifestPath) {
    try {
      const response = await fetch(manifestPath);
      const manifest = await response.json();
      const resources = manifest.web_accessible_resources.find((resource) =>
        resource.resources.includes("assets/*")
      );
      return resources ? resources.resources[0].replace("*", "") : "assets/";
    } catch (error) {
      console.error("Error reading manifest.json:", error);
      return "assets/";
    }
  }

  async getMedia(word, type) {
    const typeToFolderMap = {
      noun: "nouns",
      verb: "verbs",
      adjective: "adjectives",
      adverb: "adverbs",
      number: "numbers", // Agregado el tipo numbers
    };

    let folder = "";
    for (const wordType of word.type) {
      if (typeToFolderMap[wordType]) {
        folder = typeToFolderMap[wordType];
        break;
      }
    }

    if (type === "audio") {
      console.log(
        `${this.basePath}sounds/${folder}/${word.word.toLowerCase()}.mp3`
      );
      return `${this.basePath}sounds/${folder}/${word.word.toLowerCase()}.mp3`;
    } else if (type === "image") {
      console.log(
        `${this.basePath}images/${folder}/${word.word.toLowerCase()}.png`
      );
      return `${this.basePath}images/${folder}/${word.word.toLowerCase()}.png`;
    }
    return null;
  }

  async playAudio(word) {   
    console.log(this.localAssetsSound); 
    if (this.localAssetsSound) {
      const audioUrls = await this.getMedia(word, "audio");
      this.playAudioFromUrl(audioUrls); // Pasar múltiples URLs
      return;
    }
  
    // Si word es un sustantivo, agregar word.article
    let reading = word.word;
    if (word.type.includes("noun")) {
      reading = `${word.article} ${word.word}`;
    }
  
    const id = await this.postSound(reading);
    await this.getSound(id, word);
  }

  setVolume(volume) {
    this.volume = volume;
  }

  setSpeed(speed) {
    this.speed = speed;
    console.log("Speed  set to: ", speed);
  }

  setLocalAssetsSound(localAssetsSound) {
    this.localAssetsSound = localAssetsSound;
  }

  async postSound(text) {
    const url = "https://api.soundoftext.com/sounds";
    const data = {
      engine: "Google",
      data: {
        text: text,
        voice: "de-DE",
      },
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      return result.id;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }

  playAudioFromUrl(...mp3Urls) {
    mp3Urls.forEach(mp3Url => {
      const audio = new Audio(mp3Url);
      audio.volume = this.volume; // Usa el volumen establecido
      audio.playbackRate = this.speed; // Usa la velocidad establecida
      audio.play().catch((error) => {
        console.error("Error al reproducir el audio:", error);
      });
    });
  }

  async getSound(id) {
    const url = `https://api.soundoftext.com/sounds/${id}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      if (result.status === "Done") {
        const mp3Url = result.location;
        this.playAudioFromUrl(mp3Url);
      } else {
        console.error("Sound is not ready yet.");
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }

  downloadFile(mp3Url, audioUrl, word) {
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = mp3Url;
    a.download = `${audioUrl.split("/").pop()}`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(a.href);
  }
  determineSoundFolder(word) {
    const typeToFolderMap = {
      noun: "nouns",
      verb: "verbs",
      adjective: "adjectives",
      adverb: "adverbs",
      number: "numbers", // Agregado el tipo numbers
    };

    for (const wordType of word.type) {
      if (typeToFolderMap[wordType]) {
        return typeToFolderMap[wordType];
      }
    }
    return "";
  }
}
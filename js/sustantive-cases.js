<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Juego de Casos y Sustantivos en Alemán</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            text-align: center;
            padding: 20px;
        }
        h1 {
            color: #333;
        }
        .container {
            margin: 20px 0;
        }
        select, button {
            padding: 10px;
            margin: 10px;
            font-size: 1rem;
        }
        .result {
            margin-top: 20px;
            font-size: 1.2rem;
        }
    </style>
</head>
<body>

    <h1>Juego de Casos y Sustantivos en Alemán</h1>

    <div class="container">
        <label for="case-select">Selecciona un caso:</label>
        <select id="case-select">
            <option value="nominativo">Nominativo</option>
            <option value="acusativo">Acusativo</option>
            <option value="dativo">Dativo</option>
            <option value="genitivo">Genitivo</option>
        </select>
    </div>

    <div class="container">
        <label for="noun-select">Selecciona un sustantivo:</label>
        <select id="noun-select">
            <!-- Masculino -->
            <option value="der Mann">Mann (masculino)</option>
            <option value="der Hund">Hund (masculino)</option>
            <option value="der Tisch">Tisch (masculino)</option>
            <option value="der Freund">Freund (masculino)</option>
            <option value="der Apfel">Apfel (masculino)</option>

            <!-- Femenino -->
            <option value="die Frau">Frau (femenino)</option>
            <option value="die Katze">Katze (femenino)</option>
            <option value="die Lampe">Lampe (femenino)</option>
            <option value="die Schule">Schule (femenino)</option>
            <option value="die Blume">Blume (femenino)</option>

            <!-- Neutro -->
            <option value="das Haus">Haus (neutro)</option>
            <option value="das Auto">Auto (neutro)</option>
            <option value="das Kind">Kind (neutro)</option>
            <option value="das Buch">Buch (neutro)</option>
            <option value="das Fenster">Fenster (neutro)</option>

            <!-- Plural -->
            <option value="die Bücher">Bücher (plural)</option>
            <option value="die Kinder">Kinder (plural)</option>
            <option value="die Freunde">Freunde (plural)</option>
            <option value="die Häuser">Häuser (plural)</option>
            <option value="die Katzen">Katzen (plural)</option>
        </select>
    </div>

    <div class="container">
        <button onclick="generateSentence()">Generar oración</button>
    </div>

    <div class="result" id="result"></div> <div class="explanation" id="explanation"></div>

    <script>
	    const explanations = {
            nominativo: "El caso nominativo se utiliza principalmente para el sujeto de la oración. Indica quién realiza la acción.",
            acusativo: "El caso acusativo se utiliza para el objeto directo de la oración. Indica quién o qué recibe la acción.",
            dativo: "El caso dativo se usa para el objeto indirecto, es decir, para indicar a quién o para quién se hace algo.",
            genitivo: "El caso genitivo indica posesión o relación. Se usa para mostrar que algo pertenece a alguien."
        };
        const examples = {
            nominativo: {
                "der Mann": "Der Mann liest ein Buch. (El hombre lee un libro).",
                "der Hund": "Der Hund spielt im Garten. (El perro juega en el jardín).",
                "der Tisch": "Der Tisch ist groß. (La mesa es grande).",
                "der Freund": "Der Freund kommt morgen. (El amigo llega mañana).",
                "der Apfel": "Der Apfel ist rot. (La manzana es roja).",
                "die Frau": "Die Frau liest eine Zeitung. (La mujer lee un periódico).",
                "die Katze": "Die Katze schläft. (El gato duerme).",
                "die Lampe": "Die Lampe leuchtet. (La lámpara brilla).",
                "die Schule": "Die Schule ist groß. (La escuela es grande).",
                "die Blume": "Die Blume ist schön. (La flor es hermosa).",
                "das Haus": "Das Haus ist alt. (La casa es antigua).",
                "das Auto": "Das Auto ist neu. (El coche es nuevo).",
                "das Kind": "Das Kind spielt im Park. (El niño juega en el parque).",
                "das Buch": "Das Buch ist interessant. (El libro es interesante).",
                "das Fenster": "Das Fenster ist offen. (La ventana está abierta).",
                "die Bücher": "Die Bücher sind auf dem Tisch. (Los libros están en la mesa).",
                "die Kinder": "Die Kinder spielen im Garten. (Los niños juegan en el jardín).",
                "die Freunde": "Die Freunde kommen heute. (Los amigos vienen hoy).",
                "die Häuser": "Die Häuser sind alt. (Las casas son antiguas).",
                "die Katzen": "Die Katzen sind hungrig. (Los gatos tienen hambre)."
            },
            acusativo: {
                "der Mann": "Ich sehe den Mann. (Veo al hombre).",
                "der Hund": "Ich füttere den Hund. (Alimento al perro).",
                "der Tisch": "Ich brauche den Tisch. (Necesito la mesa).",
                "der Freund": "Ich besuche den Freund. (Visito al amigo).",
                "der Apfel": "Ich esse den Apfel. (Me como la manzana).",
                "die Frau": "Ich sehe die Frau. (Veo a la mujer).",
                "die Katze": "Ich streichle die Katze. (Acaricio al gato).",
                "die Lampe": "Ich kaufe die Lampe. (Compro la lámpara).",
                "die Schule": "Ich besuche die Schule. (Visito la escuela).",
                "die Blume": "Ich gieße die Blume. (Riego la flor).",
                "das Haus": "Ich sehe das Haus. (Veo la casa).",
                "das Auto": "Ich fahre das Auto. (Conduzco el coche).",
                "das Kind": "Ich sehe das Kind. (Veo al niño).",
                "das Buch": "Ich lese das Buch. (Leo el libro).",
                "das Fenster": "Ich öffne das Fenster. (Abro la ventana).",
                "die Bücher": "Ich lese die Bücher. (Leo los libros).",
                "die Kinder": "Ich sehe die Kinder. (Veo a los niños).",
                "die Freunde": "Ich besuche die Freunde. (Visito a los amigos).",
                "die Häuser": "Ich sehe die Häuser. (Veo las casas).",
                "die Katzen": "Ich füttere die Katzen. (Alimento a los gatos)."
            },
            dativo: {
                "der Mann": "Ich gebe dem Mann ein Buch. (Le doy un libro al hombre).",
                "der Hund": "Ich gebe dem Hund Futter. (Le doy comida al perro).",
                "der Tisch": "Ich stelle die Lampe auf dem Tisch. (Coloco la lámpara en la mesa).",
                "der Freund": "Ich schenke dem Freund ein Geschenk. (Le doy un regalo al amigo).",
                "der Apfel": "Ich gebe dem Mann den Apfel. (Le doy la manzana al hombre).",
                "die Frau": "Ich gebe der Frau das Buch. (Le doy el libro a la mujer).",
                "die Katze": "Ich gebe der Katze Futter. (Le doy comida al gato).",
                "die Lampe": "Ich gebe der Lampe einen neuen Platz. (Le doy a la lámpara un nuevo lugar).",
                "die Schule": "Ich zeige der Schule den Plan. (Le muestro el plan a la escuela).",
                "die Blume": "Ich gebe der Blume Wasser. (Le doy agua a la flor).",
                "das Haus": "Ich gebe dem Haus einen neuen Anstrich. (Le doy a la casa una nueva capa de pintura).",
                "das Auto": "Ich zeige dem Auto den Weg. (Le muestro al coche el camino).",
                "das Kind": "Ich gebe dem Kind das Spielzeug. (Le doy el juguete al niño).",
                "das Buch": "Ich zeige dem Kind das Buch. (Le muestro el libro al niño).",
                "das Fenster": "Ich stelle die Pflanze vor dem Fenster. (Coloco la planta frente a la ventana).",
                "die Bücher": "Ich gebe den Büchern einen neuen Platz. (Le doy a los libros un nuevo lugar).",
                "die Kinder": "Ich gebe den Kindern Schokolade. (Le doy chocolate a los niños).",
                "die Freunde": "Ich schreibe den Freunden einen Brief. (Les escribo una carta a los amigos).",
                "die Häuser": "Ich zeige den Häusern den Plan. (Les muestro el plan a las casas).",
                "die Katzen": "Ich gebe den Katzen Futter. (Le doy comida a los gatos)."
            },
            genitivo: {
                "der Mann": "Das Auto des Mannes ist neu. (El coche del hombre es nuevo).",
                "der Hund": "Das Spielzeug des Hundes ist kaputt. (El juguete del perro está roto).",
                "der Tisch": "Die Farbe des Tisches ist schön. (El color de la mesa es bonito).",
                "der Freund": "Der Geburtstag des Freundes ist morgen. (El cumpleaños del amigo es mañana).",
                "der Apfel": "Der Geschmack des Apfels ist süß. (El sabor de la manzana es dulce).",
                "die Frau": "Das Haus der Frau ist groß. (La casa de la mujer es grande).",
                "die Katze": "Der Name der Katze ist Luna. (El nombre del gato es Luna).",
                "die Lampe": "Das Licht der Lampe ist hell. (La luz de la lámpara es brillante).",
                "die Schule": "Das Dach der Schule ist alt. (El techo de la escuela es antiguo).",
                "die Blume": "Die Farbe der Blume ist rot. (El color de la flor es rojo).",
                "das Haus": "Die Fenster des Hauses sind offen. (Las ventanas de la casa están abiertas).",
                "das Auto": "Die Farbe des Autos ist blau. (El color del coche es azul).",
                "das Kind": "Das Spielzeug des Kindes ist kaputt. (El juguete del niño está roto).",
                "das Buch": "Der Titel des Buches ist interessant. (El título del libro es interesante).",
                "das Fenster": "Der Rahmen des Fensters ist aus Holz. (El marco de la ventana es de madera).",
                "die Bücher": "Die Seiten der Bücher sind alt. (Las páginas de los libros son antiguas).",
                "die Kinder": "Die Eltern der Kinder sind hier. (Los padres de los niños están aquí).",
                "die Freunde": "Die Meinung der Freunde ist wichtig. (La opinión de los amigos es importante).",
                "die Häuser": "Die Dächer der Häuser sind rot. (Los techos de las casas son rojos).",
                "die Katzen": "Die Augen der Katzen sind grün. (Los ojos de los gatos son verdes)."
            }
        };

        function generateSentence() {
            const selectedCase = document.getElementById("case-select").value;
            const selectedNoun = document.getElementById("noun-select").value;

            const exampleSentence = examples[selectedCase][selectedNoun];
            const resultElement = document.getElementById("result");
            const explanationElement = document.getElementById("explanation");
            
            resultElement.innerHTML = `<strong>${exampleSentence}</strong>`;
			explanationElement.innerHTML = `<em>${explanations[selectedCase]}</em>`;

        }
    </script>

</body>
</html>

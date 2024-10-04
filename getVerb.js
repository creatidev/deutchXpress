const puppeteer = require('puppeteer');

const verbo = 'kaufen';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // Navegar a la página del verbo en Reverso
  const url = `https://conjugador.reverso.net/conjugacion-aleman-verbo-${verb}.html`;
  await page.goto(url);

  const data = await page.evaluate(() => {
    const indikativ = {};

    // Obtener Präsens (presente): Indica acciones que ocurren en el presente.
    const präsensElements = document.querySelectorAll('.blue-box-wrap[mobile-title="Indikativ Präsens"] ul li');
    const präsens = Array.from(präsensElements).map(el => el.innerText.replace(/\n/g, ' '));

    // Obtener Präteritum (pretérito): Indica acciones completadas en el pasado.
    const präteritumElements = document.querySelectorAll('.blue-box-wrap[mobile-title="Indikativ Präteritum"] ul li');
    const präteritum = Array.from(präteritumElements).map(el => el.innerText.replace(/\n/g, ' '));

    // Obtener Futur I (futuro I): Indica acciones que ocurrirán en el futuro.
    const futur1Elements = document.querySelectorAll('.blue-box-wrap[mobile-title="Indikativ Futur I"] ul li');
    const futur1 = Array.from(futur1Elements).map(el => el.innerText.replace(/\n/g, ' '));

    // Obtener Perfekt (perfecto): Indica acciones pasadas que tienen relevancia en el presente.
    const perfektElements = document.querySelectorAll('.blue-box-wrap[mobile-title="Indikativ Perfekt"] ul li');
    const perfekt = Array.from(perfektElements).map(el => el.innerText.replace(/\n/g, ' '));

    // Obtener Plusquamperfekt (pluscuamperfecto): Indica acciones que ocurrieron antes de otra acción pasada.
    const plusquamperfektElements = document.querySelectorAll('.blue-box-wrap[mobile-title="Indikativ Plusquamperfekt"] ul li');
    const plusquamperfekt = Array.from(plusquamperfektElements).map(el => el.innerText.replace(/\n/g, ' '));

    // Obtener Futur II (futuro II): Indica acciones que habrán ocurrido antes de un momento futuro.
    const futur2Elements = document.querySelectorAll('.blue-box-wrap[mobile-title="Indikativ Futur II"] ul li');
    const futur2 = Array.from(futur2Elements).map(el => el.innerText.replace(/\n/g, ' '));

    // Asignar los valores correctamente al objeto
    indikativ.Präsens = präsens;
    indikativ.Präteritum = präteritum;
    indikativ.FuturI = futur1;
    indikativ.Perfekt = perfekt;
    indikativ.Plusquamperfekt = plusquamperfekt;
    indikativ.FuturII = futur2;

    const konjunktivI = {};

    // Obtener Präsens (presente subjuntivo I): Indica acciones hipotéticas en el presente.
    const konjunktivPräsensElements = document.querySelectorAll('.blue-box-wrap[mobile-title="Konjunktiv I Präsens"] ul li');
    const konjunktivPräsens = Array.from(konjunktivPräsensElements).map(el => el.innerText.replace(/\n/g, ' '));

    // Obtener Futur I (futuro I subjuntivo I): Indica acciones hipotéticas que ocurrirán en el futuro.
    const konjunktivFutur1ElementsI = document.querySelectorAll('.blue-box-wrap[mobile-title="Konjunktiv I Futur I"] ul li');
    const konjunktivFutur1 = Array.from(konjunktivFutur1ElementsI).map(el => el.innerText.replace(/\n/g, ' '));

    // Obtener Perfekt (perfecto subjuntivo I): Indica acciones hipotéticas pasadas con relevancia en el presente.
    const konjunktivPerfektElements = document.querySelectorAll('.blue-box-wrap[mobile-title="Konjunktiv I Perfekt"] ul li');
    const konjunktivPerfekt = Array.from(konjunktivPerfektElements).map(el => el.innerText.replace(/\n/g, ' '));

    // Obtener Futur II (futuro II subjuntivo I): Indica acciones hipotéticas que habrán ocurrido antes de un momento futuro.
    const konjunktivFutur2Elements = document.querySelectorAll('.blue-box-wrap[mobile-title="Konjunktiv I Futur II"] ul li');
    const konjunktivFutur2 = Array.from(konjunktivFutur2Elements).map(el => el.innerText.replace(/\n/g, ' '));

    // Asignar los valores correctamente al objeto
    konjunktivI.Präsens = konjunktivPräsens;
    konjunktivI.FuturI = konjunktivFutur1;
    konjunktivI.Perfekt = konjunktivPerfekt;
    konjunktivI.FuturII = konjunktivFutur2;

    const konjunktivII = {};

    // Obtener Präteritum (pretérito subjuntivo II): Indica acciones hipotéticas completadas en el pasado.
    const konjunktivPräteritumElements = document.querySelectorAll('.blue-box-wrap[mobile-title="Konjunktiv II Präteritum"] ul li');
    const konjunktivPräteritum = Array.from(konjunktivPräteritumElements).map(el => el.innerText.replace(/\n/g, ' '));

    // Obtener Futur I (futuro I subjuntivo II): Indica acciones hipotéticas que ocurrirán en el futuro.
    const konjunktivFutur1ElementsII = document.querySelectorAll('.blue-box-wrap[mobile-title="Konjunktiv II Futur I"] ul li');
    const konjunktivFutur1II = Array.from(konjunktivFutur1ElementsII).map(el => el.innerText.replace(/\n/g, ' '));

    // Obtener Plusquamperfekt (pluscuamperfecto subjuntivo II): Indica acciones hipotéticas que ocurrieron antes de otra acción pasada hipotética.
    const konjunktivPlusquamperfektElements = document.querySelectorAll('.blue-box-wrap[mobile-title="Konjunktiv II Plusquamperfekt"] ul li');
    const konjunktivPlusquamperfekt = Array.from(konjunktivPlusquamperfektElements).map(el => el.innerText.replace(/\n/g, ' '));

    // Obtener Futur II (futuro II subjuntivo II): Indica acciones hipotéticas que habrán ocurrido antes de un momento futuro hipotético.
    const konjunktivIIFutur2Elements = document.querySelectorAll('.blue-box-wrap[mobile-title="Konjunktiv II Futur II"] ul li');
    const konjunktivIIFutur2 = Array.from(konjunktivIIFutur2Elements).map(el => el.innerText.replace(/\n/g, ' '));

    // Asignar los valores correctamente al objeto
    konjunktivII.Präteritum = konjunktivPräteritum;
    konjunktivII.FuturI = konjunktivFutur1II;
    konjunktivII.Plusquamperfekt = konjunktivPlusquamperfekt;
    konjunktivII.FuturII = konjunktivIIFutur2;

    // Obtener Imperativ Präsens (imperativo presente): Indica órdenes o solicitudes en presente.
    const imperativElements = document.querySelectorAll('.blue-box-wrap[mobile-title="Imperativ Präsens"] ul li');
    const imperativPräsens = Array.from(imperativElements).map(el => el.innerText.replace(/\n/g, ' '));

    // Obtener Partizip Präsens (participio presente): Indica una acción en desarrollo.
    const partizipPräsensElements = document.querySelectorAll('.blue-box-wrap[mobile-title="Partizip Präsens"] ul li');
    const partizipPräsens = Array.from(partizipPräsensElements).map(el => el.innerText.replace(/\n/g, ' '));

    // Obtener Partizip Perfekt (participio perfecto): Indica una acción completada.
    const partizipPerfektElements = document.querySelectorAll('.blue-box-wrap[mobile-title="Partizip Perfekt"] ul li');
    const partizipPerfekt = Array.from(partizipPerfektElements).map(el => el.innerText.replace(/\n/g, ' '));

    // Obtener Infinitiv Präsens (infinitivo presente): Indica la forma básica del verbo.
    const infinitivPräsensElements = document.querySelectorAll('.blue-box-wrap[mobile-title="Infinitiv Präsens"] ul li');
    const infinitivPräsens = Array.from(infinitivPräsensElements).map(el => el.innerText.replace(/\n/g, ' '));

    // Asignar los valores correctamente a los objetos
    const partizip = {
      Präsens: partizipPräsens,
      Perfekt: partizipPerfekt
    };
	
    // Obtener Infinitiv Perfekt (infinitivo perfecto): Indica la forma básica del verbo en su uso perfecto.
    const infinitivPerfektElements = document.querySelectorAll('.blue-box-wrap[mobile-title="Infinitiv Perfekt"] ul li');
    const infinitivPerfekt = Array.from(infinitivPerfektElements).map(el => el.innerText.replace(/\n/g, ' '));

    // Obtener Infinitiv zu + Infinitiv
    const infinitivZuElements = document.querySelectorAll('.blue-box-wrap[mobile-title="Infinitiv zu + Infinitiv"] ul li');
    const infinitivZu = Array.from(infinitivZuElements).map(el => el.innerText.replace(/\n/g, ' '));

    // Asignar los valores correctamente a los objetos
    const infinitiv = {
      Präsens: infinitivPräsens,
      Perfekt: infinitivPerfekt,
      "zu + Infinitiv": infinitivZu
    };

    return {
      Indikativ: indikativ,
      KonjunktivI: konjunktivI,
      KonjunktivII: konjunktivII,
      ImperativPräsens: imperativPräsens,
      Partizip: partizip,
      Infinitiv: infinitiv
    };
  });

  console.log(JSON.stringify(data, null, 2));

  await browser.close();
})();

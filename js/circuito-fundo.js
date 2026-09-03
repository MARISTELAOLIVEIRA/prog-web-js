/* ===================================================================
   circuito-fundo.js
   Injeta uma placa de circuito animada (SVG) fixa atrás do conteúdo,
   simulando energia elétrica fluindo pelas trilhas.
   =================================================================== */

(function () {
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("class", "fundo-energia");
  svg.setAttribute("viewBox", "0 0 100 100");
  svg.setAttribute("preserveAspectRatio", "none");
  svg.setAttribute("aria-hidden", "true");

  // cada trilha: desenho do caminho + duração/atraso, para o fluxo não parecer sincronizado
  const trilhas = [
    { d: "M0 8 H30 V20 H70 V8 H100", duracao: "4s", atraso: "0s" },
    { d: "M0 92 H20 V78 H55 V92 H100", duracao: "5s", atraso: "1.2s" },
    { d: "M85 0 V25 H60 V55 H85 V100", duracao: "6s", atraso: "0.5s" },
    { d: "M15 0 V15", duracao: "3s", atraso: "2s" },
    { d: "M0 45 H12 V60 H0", duracao: "3.8s", atraso: "0.8s" },
    { d: "M45 55 V100", duracao: "4.5s", atraso: "1.6s" },
    { d: "M100 60 H90 V40 H100", duracao: "5.5s", atraso: "0.2s" },
    { d: "M30 20 V45 H0", duracao: "4.2s", atraso: "2.4s" },
  ];

  trilhas.forEach((trilha) => {
    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", trilha.d);
    path.style.animationDuration = trilha.duracao;
    path.style.animationDelay = trilha.atraso;
    svg.appendChild(path);
  });

  // pontos de solda que "pulsam" quando a corrente passa
  const pontos = [
    [30, 8], [70, 8], [70, 20], [20, 92], [20, 78], [55, 78], [55, 92],
    [85, 25], [60, 25], [60, 55], [85, 55], [15, 15], [90, 40], [90, 60],
    [12, 45], [12, 60], [30, 45],
  ];
  pontos.forEach(([cx, cy], indice) => {
    const circulo = document.createElementNS(svgNS, "circle");
    circulo.setAttribute("cx", cx);
    circulo.setAttribute("cy", cy);
    circulo.setAttribute("r", 0.8);
    circulo.style.animationDelay = indice * 0.3 + "s";
    svg.appendChild(circulo);
  });

  document.body.prepend(svg);

  // dígitos binários pequenos "caindo" pela tela, como código fluindo
  const binario = document.createElement("div");
  binario.className = "fundo-binario";
  binario.setAttribute("aria-hidden", "true");

  const totalDigitos = 28;
  for (let i = 0; i < totalDigitos; i++) {
    const digito = document.createElement("span");
    digito.textContent = Math.random() < 0.5 ? "0" : "1";
    digito.style.left = Math.random() * 100 + "%";
    digito.style.animationDuration = (7 + Math.random() * 9).toFixed(1) + "s";
    digito.style.animationDelay = (Math.random() * 10).toFixed(1) + "s";
    digito.style.opacity = (0.25 + Math.random() * 0.35).toFixed(2);
    binario.appendChild(digito);
  }

  document.body.prepend(binario);
})();

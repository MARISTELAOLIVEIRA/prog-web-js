/* ===================================================================
   circuito-fundo.js
   Fundo animado estilo "Matrix": colunas de zeros e uns caindo pela tela.
   (O nome do arquivo foi mantido para não precisar alterar as páginas.)

   Para ajustar o efeito, mude os valores em CONFIG:
   - tamanho: tamanho de cada dígito, em pixels
   - velocidade: quanto maior, mais rápido caem as colunas (em linhas por quadro)
   - rastro: quanto maior, mais rápido o rastro some (0.05 = rastro longo)
   - densidade: de 0 a 1, porcentagem de colunas que recebem chuva
   - opacidade: de 0 a 1, o quanto o efeito aparece atrás do conteúdo
   =================================================================== */

(function () {
  const CONFIG = {
    tamanho: 24,
    velocidade: 0.2,
    rastro: 0.06,
    densidade: 0.4,
    opacidade: 0.55,
  };

  const COR_FUNDO = "#050807";
  const COR_CABECA = "#7dffc4";

  const canvas = document.createElement("canvas");
  canvas.className = "fundo-matriz";
  canvas.setAttribute("aria-hidden", "true");
  canvas.style.opacity = CONFIG.opacidade;
  document.body.prepend(canvas);

  const ctx = canvas.getContext("2d");
  let colunas = [];
  let largura = 0;
  let altura = 0;

  function ajustarTamanho() {
    const escala = window.devicePixelRatio || 1;
    largura = window.innerWidth;
    altura = window.innerHeight;
    canvas.width = largura * escala;
    canvas.height = altura * escala;
    ctx.setTransform(escala, 0, 0, escala, 0, 0);
    ctx.fillStyle = COR_FUNDO;
    ctx.fillRect(0, 0, largura, altura);

    // uma posição (em linhas) por coluna; null = coluna sem chuva
    const total = Math.ceil(largura / CONFIG.tamanho);
    colunas = Array.from({ length: total }, () =>
      Math.random() < CONFIG.densidade ? -Math.random() * (altura / CONFIG.tamanho) : null
    );
  }

  function digitoAleatorio() {
    return Math.random() < 0.5 ? "0" : "1";
  }

  function desenhar() {
    // camada escura semitransparente: faz o rastro ir sumindo aos poucos
    ctx.fillStyle = `rgba(5, 8, 7, ${CONFIG.rastro})`;
    ctx.fillRect(0, 0, largura, altura);

    ctx.font = `${CONFIG.tamanho}px "Share Tech Mono", monospace`;
    ctx.textBaseline = "top";

    colunas.forEach((linha, i) => {
      if (linha === null) return;
      const proxima = linha + CONFIG.velocidade;

      // só desenha quando a coluna chega a uma nova linha: cada dígito é desenhado uma única vez,
      // por isso ele fica nítido e dá para ler que é 0 ou 1
      if (Math.floor(proxima) > Math.floor(linha)) {
        const x = i * CONFIG.tamanho;
        const y = Math.floor(proxima) * CONFIG.tamanho;
        ctx.fillStyle = COR_CABECA; // a "ponta" da coluna é mais clara e depois vai esverdeando
        ctx.fillText(digitoAleatorio(), x, y);
      }

      // ao passar da tela, a coluna volta ao topo em um momento aleatório
      if (proxima * CONFIG.tamanho > altura && Math.random() > 0.98) {
        colunas[i] = -Math.random() * 10;
      } else {
        colunas[i] = proxima;
      }
    });
  }

  ajustarTamanho();
  window.addEventListener("resize", ajustarTamanho);

  // Quem prefere menos movimento (configuração do sistema) vê só a imagem parada
  const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (semMovimento) {
    for (let n = 0; n < 250; n++) desenhar();
    return;
  }

  // limita a ~30 quadros por segundo para não pesar no computador dos alunos
  let ultimo = 0;
  function animar(agora) {
    if (agora - ultimo > 33) {
      desenhar();
      ultimo = agora;
    }
    requestAnimationFrame(animar);
  }
  requestAnimationFrame(animar);
})();

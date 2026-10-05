// Quiz de Revisão · 1º Bimestre
// Depende de js/questoes-revisao.js (QUESTOES_REVISAO e MODULOS_REVISAO).
(function () {
  "use strict";

  const TOTAL = QUESTOES_REVISAO.length;
  const PONTOS_DO_QUIZ = 1; // o quiz vale 1 ponto
  const CHAVE_NOME = "revisao1bimestre_nome";
  const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- Classificação por número de acertos ----------
  // "modo" define a animação: as emojis caem (comemoração) ou sobem (incentivo)
  const NIVEIS = [
    {
      minimo: 18, emoji: "🏆", titulo: "Lenda do Código",
      mensagem: "Incrível! Você domina o conteúdo inicial de JavaScript. Está pronto(a) para a avaliação!",
      confete: 240, qtdEmoji: 34, emojis: ["🏆", "⭐", "🎉", "✨", "💚"], modo: "cair",
    },
    {
      minimo: 15, emoji: "🚀", titulo: "Programação em Alta",
      mensagem: "Excelente resultado! Só falta revisar alguns detalhes para ficar perfeito.",
      confete: 160, qtdEmoji: 22, emojis: ["🚀", "🎉", "✨", "💻"], modo: "cair",
    },
    {
      minimo: 12, emoji: "💪", titulo: "No Caminho Certo",
      mensagem: "Bom trabalho! Você já entende a base. Veja os erros abaixo e tente de novo para melhorar.",
      confete: 90, qtdEmoji: 16, emojis: ["💪", "👏", "🌟"], modo: "cair",
    },
    {
      minimo: 8, emoji: "📚", titulo: "Em Treinamento",
      mensagem: "Você está aprendendo! Releia os módulos 1 a 3, refaça os exercícios e tente outra vez.",
      confete: 0, qtdEmoji: 18, emojis: ["📚", "💡", "✏️"], modo: "subir",
    },
    {
      minimo: 0, emoji: "🌱", titulo: "Hora de Revisar",
      mensagem: "Todo mundo começa de algum lugar! Estude os módulos com calma, pratique com o console e tente de novo. 💚",
      confete: 0, qtdEmoji: 18, emojis: ["🌱", "💚", "🌟"], modo: "subir",
    },
  ];

  const nivelDe = (acertos) => NIVEIS.find((n) => acertos >= n.minimo);

  // ---------- Utilidades ----------
  const $ = (id) => document.getElementById(id);

  function esc(texto) {
    return String(texto).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // texto com `crases` vira <code>
  function formatar(texto) {
    return esc(texto).replace(/`([^`]+)`/g, "<code>$1</code>");
  }

  function embaralhar(lista) {
    const copia = lista.slice();
    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
  }

  function formatarPontos(acertos) {
    return ((acertos / TOTAL) * PONTOS_DO_QUIZ).toFixed(2).replace(".", ",");
  }

  function guardar(chave, valor) {
    try { localStorage.setItem(chave, valor); } catch (e) { /* sem armazenamento: tudo bem */ }
  }

  function ler(chave) {
    try { return localStorage.getItem(chave) || ""; } catch (e) { return ""; }
  }

  // ---------- Estado ----------
  let nome = "";
  let questoes = [];
  let indice = 0;
  let acertos = 0;
  let erradas = [];
  let respondida = false;
  let ultimoResultado = null;

  const telas = { entrada: $("tela-entrada"), quiz: $("tela-quiz"), resultado: $("tela-resultado") };

  function mostrar(qual) {
    Object.entries(telas).forEach(([nomeTela, elemento]) => {
      elemento.hidden = nomeTela !== qual;
    });
    window.scrollTo({ top: 0, behavior: semMovimento ? "auto" : "smooth" });
  }

  // ---------- Entrada: nome completo ----------
  const campoNome = $("campo-nome");
  const erroNome = $("erro-nome");
  campoNome.value = ler(CHAVE_NOME);

  // pelo menos duas palavras (nome e sobrenome), só letras, espaço, hífen e apóstrofo
  const PADRAO_NOME = /^[A-Za-zÀ-ÖØ-öø-ÿ'’-]{2,}(?:\s+[A-Za-zÀ-ÖØ-öø-ÿ'’-]+)+$/;

  $("form-nome").addEventListener("submit", (evento) => {
    evento.preventDefault();
    const digitado = campoNome.value.trim().replace(/\s+/g, " ");
    if (!PADRAO_NOME.test(digitado)) {
      erroNome.textContent = "Digite seu nome completo (nome e sobrenome), usando apenas letras.";
      campoNome.focus();
      return;
    }
    erroNome.textContent = "";
    nome = digitado;
    guardar(CHAVE_NOME, nome);
    iniciar();
  });

  // ---------- Quiz ----------
  function iniciar() {
    // a cada tentativa: questões e alternativas em ordem nova
    questoes = embaralhar(QUESTOES_REVISAO).map((q) => ({
      ...q,
      opcoes: embaralhar(q.respostas.map((texto, i) => ({ texto, certa: i === 0 }))),
    }));
    indice = 0;
    acertos = 0;
    erradas = [];
    mostrar("quiz");
    renderizarQuestao();
  }

  const LETRAS = ["A", "B", "C", "D"];

  function renderizarQuestao() {
    const q = questoes[indice];
    respondida = false;

    $("quiz-contador").textContent = `Questão ${indice + 1} de ${TOTAL}`;
    $("quiz-acertos").textContent = `Acertos até agora: ${acertos}`;
    $("quiz-barra").style.width = `${(indice / TOTAL) * 100}%`;
    $("quiz-modulo").textContent = MODULOS_REVISAO[q.modulo];
    $("quiz-enunciado").innerHTML = formatar(q.enunciado);

    const codigo = $("quiz-codigo");
    codigo.hidden = !q.codigo;
    codigo.querySelector("code").textContent = q.codigo || "";

    $("quiz-alternativas").innerHTML = q.opcoes
      .map(
        (op, i) => `
        <button type="button" class="rev-alternativa" data-i="${i}">
          <span class="rev-letra">${LETRAS[i]}</span>
          <span>${formatar(op.texto)}</span>
        </button>`
      )
      .join("");

    $("quiz-feedback").hidden = true;
    $("quiz-proxima").hidden = true;
    $("quiz-proxima").textContent = indice === TOTAL - 1 ? "Ver meu resultado 🏁" : "Próxima questão →";
  }

  $("quiz-alternativas").addEventListener("click", (evento) => {
    const botao = evento.target.closest(".rev-alternativa");
    if (botao && !respondida) responder(Number(botao.dataset.i));
  });

  function responder(escolhida) {
    respondida = true;
    const q = questoes[indice];
    const botoes = $("quiz-alternativas").querySelectorAll(".rev-alternativa");
    const acertou = q.opcoes[escolhida].certa;
    const indiceCerta = q.opcoes.findIndex((op) => op.certa);

    botoes.forEach((botao, i) => {
      botao.disabled = true;
      if (i === indiceCerta) botao.classList.add("correta");
      else if (i === escolhida) botao.classList.add("incorreta");
      else botao.classList.add("apagada");
    });

    if (acertou) {
      acertos++;
    } else {
      erradas.push({ questao: q, escolhida: q.opcoes[escolhida].texto });
    }

    const feedback = $("quiz-feedback");
    feedback.className = "rev-feedback " + (acertou ? "acerto" : "erro");
    const titulo = acertou
      ? ["✅ Correto!", "🎯 Acertou em cheio!", "👏 Muito bem!", "🌟 Isso mesmo!"][Math.floor(Math.random() * 4)]
      : "❌ Não foi dessa vez";
    feedback.innerHTML = `
      <p class="rev-feedback__titulo">${titulo}</p>
      ${acertou ? "" : `<p>A resposta certa era: <strong>${formatar(q.opcoes[indiceCerta].texto)}</strong></p>`}
      <p>${formatar(q.explicacao)}</p>`;
    feedback.hidden = false;

    $("quiz-acertos").textContent = `Acertos até agora: ${acertos}`;
    $("quiz-barra").style.width = `${((indice + 1) / TOTAL) * 100}%`;
    $("quiz-proxima").hidden = false;
    $("quiz-proxima").focus({ preventScroll: true });
    feedback.scrollIntoView({ behavior: semMovimento ? "auto" : "smooth", block: "nearest" });
  }

  $("quiz-proxima").addEventListener("click", () => {
    if (indice < TOTAL - 1) {
      indice++;
      renderizarQuestao();
      $("tela-quiz").scrollIntoView({ behavior: semMovimento ? "auto" : "smooth", block: "start" });
    } else {
      finalizar();
    }
  });

  // ---------- Resultado ----------
  function finalizar() {
    const nivel = nivelDe(acertos);
    const agora = new Date();
    ultimoResultado = { nome, acertos, nivel, pontos: formatarPontos(acertos), data: agora };

    $("res-emoji").textContent = nivel.emoji;
    $("res-nivel").textContent = nivel.titulo;
    $("res-nome").textContent = nome;
    $("res-mensagem").textContent = nivel.mensagem;
    $("res-acertos").textContent = `${acertos} de ${TOTAL}`;
    $("res-pontos").textContent = `${ultimoResultado.pontos} de ${PONTOS_DO_QUIZ},00`;
    $("res-percentual").textContent = `${Math.round((acertos / TOTAL) * 100)}%`;

    renderizarRevisao();
    mostrar("resultado");
    animar(nivel);
    desenharCertificado(ultimoResultado, true);
  }

  function renderizarRevisao() {
    const caixa = $("res-revisao");
    if (erradas.length === 0) {
      caixa.innerHTML = "<h2>Revisão das questões</h2><p>Você acertou todas as questões! 🎉</p>";
      return;
    }
    caixa.innerHTML =
      `<h2>Para revisar (${erradas.length} ${erradas.length === 1 ? "questão" : "questões"})</h2>` +
      erradas
        .map(({ questao, escolhida }, i) => {
          const certa = questao.opcoes.find((op) => op.certa).texto;
          return `
          <details>
            <summary>${i + 1}. ${formatar(questao.enunciado)}</summary>
            ${questao.codigo ? `<pre><code>${esc(questao.codigo)}</code></pre>` : ""}
            <p>Você marcou: ${formatar(escolhida)}</p>
            <p>Resposta certa: <strong>${formatar(certa)}</strong></p>
            <p>${formatar(questao.explicacao)}</p>
          </details>`;
        })
        .join("");
  }

  $("res-de-novo").addEventListener("click", iniciar);
  $("res-salvar").addEventListener("click", salvarImagem);

  // ---------- Animações de comemoração ----------
  function animar(nivel) {
    if (semMovimento) return;

    const tela = document.createElement("canvas");
    tela.className = "rev-fx";
    tela.setAttribute("aria-hidden", "true");
    document.body.appendChild(tela);

    const dpr = window.devicePixelRatio || 1;
    const L = window.innerWidth;
    const A = window.innerHeight;
    tela.width = L * dpr;
    tela.height = A * dpr;
    const ctx = tela.getContext("2d");
    ctx.scale(dpr, dpr);

    const cores = ["#00ff9d", "#39e6ff", "#ffd166", "#ff2e63", "#d6ffe9", "#e0b84f"];
    const particulas = [];

    for (let i = 0; i < nivel.confete; i++) {
      particulas.push({
        tipo: "confete",
        x: Math.random() * L,
        y: -20 - Math.random() * A * 0.7,
        vx: (Math.random() - 0.5) * 3,
        vy: 2 + Math.random() * 3.5,
        rot: Math.random() * 6.28,
        vrot: (Math.random() - 0.5) * 0.3,
        tam: 6 + Math.random() * 8,
        cor: cores[Math.floor(Math.random() * cores.length)],
        fase: Math.random() * 6.28,
      });
    }

    for (let i = 0; i < nivel.qtdEmoji; i++) {
      const sobe = nivel.modo === "subir";
      particulas.push({
        tipo: "emoji",
        emoji: nivel.emojis[Math.floor(Math.random() * nivel.emojis.length)],
        x: Math.random() * L,
        y: sobe ? A + 30 + Math.random() * A * 0.6 : -30 - Math.random() * A * 0.7,
        vx: 0,
        vy: sobe ? -(1.3 + Math.random() * 2) : 1.5 + Math.random() * 2.5,
        tam: 26 + Math.random() * 22,
        fase: Math.random() * 6.28,
      });
    }

    const inicio = performance.now();
    function quadro(agora) {
      const t = agora - inicio;
      ctx.clearRect(0, 0, L, A);

      for (let i = particulas.length - 1; i >= 0; i--) {
        const p = particulas[i];
        p.x += p.vx + Math.sin(t / 400 + p.fase) * 0.8;
        p.y += p.vy;

        if (p.y > A + 60 || p.y < -A) {
          particulas.splice(i, 1);
          continue;
        }

        if (p.tipo === "confete") {
          p.rot += p.vrot;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.fillStyle = p.cor;
          ctx.fillRect(-p.tam / 2, -p.tam / 4, p.tam, p.tam / 2);
          ctx.restore();
        } else {
          ctx.font = `${p.tam}px serif`;
          ctx.textAlign = "center";
          ctx.fillText(p.emoji, p.x, p.y);
        }
      }

      if (particulas.length > 0 && t < 12000) {
        requestAnimationFrame(quadro);
      } else {
        tela.remove();
      }
    }
    requestAnimationFrame(quadro);
  }

  // ---------- Imagem de conclusão ----------
  const canvasCertificado = $("res-certificado");
  const LOGO = new Image();
  let logoPronta = false;
  LOGO.onload = () => { logoPronta = true; };
  LOGO.src = "../img/EstrelaLogo.png";

  function ajustarTexto(ctx, texto, larguraMax, tamanho, peso, fonte) {
    let t = tamanho;
    do {
      ctx.font = `${peso} ${t}px ${fonte}`;
      t -= 2;
    } while (ctx.measureText(texto).width > larguraMax && t > 16);
  }

  // A fonte do site (Orbitron) precisa estar carregada antes de desenhar no canvas
  function fontesProntas() {
    if (!document.fonts || !document.fonts.load) return Promise.resolve();
    return Promise.all([
      document.fonts.load('700 40px "Orbitron"'),
      document.fonts.load('500 24px "Orbitron"'),
    ]).catch(() => {});
  }

  function desenharCertificado(dados, comLogo) {
    return fontesProntas().then(() => {
      const c = canvasCertificado;
      const L = 1200;
      const A = 780;
      c.width = L;
      c.height = A;
      const ctx = c.getContext("2d");
      const titulo = '"Orbitron", "Segoe UI", sans-serif';
      const texto = '"Segoe UI", Roboto, Helvetica, Arial, sans-serif';

      // fundo
      ctx.fillStyle = "#050807";
      ctx.fillRect(0, 0, L, A);
      const brilho = ctx.createRadialGradient(L / 2, A / 2, 50, L / 2, A / 2, 700);
      brilho.addColorStop(0, "rgba(0, 255, 157, 0.10)");
      brilho.addColorStop(1, "rgba(0, 255, 157, 0)");
      ctx.fillStyle = brilho;
      ctx.fillRect(0, 0, L, A);

      // trilhas douradas de placa de circuito nos cantos
      ctx.strokeStyle = "#e0b84f";
      ctx.fillStyle = "#e0b84f";
      ctx.lineWidth = 3;
      ctx.globalAlpha = 0.8;
      const trilhas = [
        [[40, 150], [40, 90], [90, 40], [170, 40]],
        [[L - 40, 150], [L - 40, 90], [L - 90, 40], [L - 170, 40]],
        [[40, A - 150], [40, A - 90], [90, A - 40], [170, A - 40]],
        [[L - 40, A - 150], [L - 40, A - 90], [L - 90, A - 40], [L - 170, A - 40]],
      ];
      trilhas.forEach((pontos) => {
        ctx.beginPath();
        ctx.moveTo(pontos[0][0], pontos[0][1]);
        pontos.slice(1).forEach(([x, y]) => ctx.lineTo(x, y));
        ctx.stroke();
        const [fx, fy] = pontos[pontos.length - 1];
        ctx.beginPath();
        ctx.arc(fx, fy, 7, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // moldura verde
      ctx.strokeStyle = "#00ff9d";
      ctx.lineWidth = 4;
      ctx.shadowColor = "rgba(0, 255, 157, 0.8)";
      ctx.shadowBlur = 16;
      ctx.strokeRect(70, 70, L - 140, A - 140);
      ctx.shadowBlur = 0;

      // logo
      if (comLogo && logoPronta) {
        ctx.drawImage(LOGO, 105, 100, 110, 100 * (LOGO.naturalHeight / LOGO.naturalWidth) * 1.1);
      }

      ctx.textAlign = "left";
      ctx.fillStyle = "#00ff9d";
      ctx.font = `700 34px ${titulo}`;
      ctx.fillText("QUIZ DE REVISÃO · 1º BIMESTRE", 240, 145);
      ctx.fillStyle = "#9fd8bd";
      ctx.font = `400 22px ${texto}`;
      ctx.fillText("Programação Web 1 · JavaScript · Módulos 1 a 3", 240, 185);

      ctx.textAlign = "center";
      ctx.fillStyle = "#9fd8bd";
      ctx.font = `400 24px ${texto}`;
      ctx.fillText("Concluído por", L / 2, 285);

      ctx.fillStyle = "#d6ffe9";
      ajustarTexto(ctx, dados.nome, L - 260, 58, 700, titulo);
      ctx.fillText(dados.nome, L / 2, 355);

      ctx.font = `100px ${texto}`;
      ctx.fillText(dados.nivel.emoji, L / 2, 480);

      ctx.fillStyle = "#e0b84f";
      ctx.font = `700 46px ${titulo}`;
      ctx.fillText(dados.nivel.titulo.toUpperCase(), L / 2, 555);

      ctx.fillStyle = "#39e6ff";
      ctx.font = `700 32px ${titulo}`;
      ctx.fillText(`${dados.acertos} de ${TOTAL} acertos  ·  nota ${dados.pontos} / ${PONTOS_DO_QUIZ},00`, L / 2, 625);

      ctx.fillStyle = "#9fd8bd";
      ctx.font = `400 20px ${texto}`;
      const data = dados.data.toLocaleDateString("pt-BR") + " às " +
        dados.data.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
      ctx.fillText(`${data}  ·  Profª Maristela`, L / 2, 690);
    });
  }

  function nomeDoArquivo() {
    const limpo = nome
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^A-Za-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .toLowerCase();
    return `quiz-revisao-1bimestre-${limpo || "aluno"}.png`;
  }

  function gerarBlob() {
    return new Promise((resolve, reject) => {
      try {
        canvasCertificado.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("vazio"))), "image/png");
      } catch (erro) {
        reject(erro); // ex.: a logo "contamina" o canvas ao abrir o arquivo direto do computador
      }
    });
  }

  function salvarImagem() {
    if (!ultimoResultado) return;
    gerarBlob()
      .catch(() => desenharCertificado(ultimoResultado, false).then(gerarBlob))
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = nomeDoArquivo();
        document.body.appendChild(link);
        link.click();
        link.remove();
        setTimeout(() => URL.revokeObjectURL(url), 2000);
      })
      .catch(() => {
        alert("Não foi possível gerar o arquivo. Clique com o botão direito na imagem acima e escolha \"Salvar imagem como...\".");
      });
  }
})();

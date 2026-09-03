/* ===================================================================
   playground.js
   Editor de código JavaScript "ao vivo" para as páginas do curso.
   O código digitado pelo aluno roda dentro de um <iframe> isolado
   (sandbox), então nada que o aluno digitar afeta a página do curso.
   =================================================================== */

// Associa a "janela" (contentWindow) de cada iframe de execução ao
// elemento de saída correspondente, para sabermos onde mostrar o resultado.
const _registroJanelasExecucao = new Map();

window.addEventListener("message", (evento) => {
  const registro = _registroJanelasExecucao.get(evento.source);
  if (!registro || !evento.data || evento.data.tipo !== "resultado-execucao") {
    return;
  }
  registro.aoReceberResultado(evento.data);
});

// Monta o documento HTML que roda dentro do iframe isolado
function _montarDocumentoSandbox(codigoUsuario, codigoHarness) {
  const script = `
    (function () {
      var logs = [];
      function serializar(valor) {
        try {
          if (typeof valor === "string") return valor;
          if (valor === undefined) return "undefined";
          return JSON.stringify(valor, null, 2);
        } catch (e) {
          return String(valor);
        }
      }
      console.log = function () { logs.push({ tipo: "log", texto: Array.prototype.map.call(arguments, serializar).join(" ") }); };
      console.error = function () { logs.push({ tipo: "erro", texto: Array.prototype.map.call(arguments, serializar).join(" ") }); };
      console.warn = function () { logs.push({ tipo: "aviso", texto: Array.prototype.map.call(arguments, serializar).join(" ") }); };

      function enviarResultado(erro) {
        parent.postMessage({
          tipo: "resultado-execucao",
          logs: logs,
          erro: erro,
          testes: window.__resultadoTestes || null
        }, "*");
      }

      window.onerror = function (mensagem) {
        enviarResultado(String(mensagem));
        return true;
      };

      try {
        // eval (em vez de colar o código direto) garante que erros de
        // sintaxe do aluno também sejam capturados aqui, e não travem tudo silenciosamente
        eval(${JSON.stringify(codigoUsuario)});
        ${codigoHarness || ""}
      } catch (erroExecucao) {
        enviarResultado(erroExecucao.message);
        return;
      }
      enviarResultado(null);
    })();
  `;
  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body><script>${script}<\/script></body></html>`;
}

function _renderizarSaidaConsole(elementoSaida, logs, erro) {
  elementoSaida.innerHTML = "";

  if (logs.length === 0 && !erro) {
    const linha = document.createElement("div");
    linha.className = "linha-vazia";
    linha.textContent = "(nenhuma saída no console — use console.log() para exibir valores)";
    elementoSaida.appendChild(linha);
    return;
  }

  logs.forEach((item) => {
    const linha = document.createElement("div");
    linha.className = item.tipo === "erro" ? "linha-erro" : "linha-log";
    linha.textContent = (item.tipo === "aviso" ? "⚠ " : "› ") + item.texto;
    elementoSaida.appendChild(linha);
  });

  if (erro) {
    const linha = document.createElement("div");
    linha.className = "linha-erro";
    linha.textContent = "✖ Erro: " + erro;
    elementoSaida.appendChild(linha);
  }
}

/**
 * Cria um editor de código ao vivo dentro do elemento com o id informado.
 * @param {string} idContainer - id do <div> onde o playground será montado
 * @param {string} codigoInicial - código JavaScript de exemplo já preenchido
 * @param {string} titulo - texto exibido na barra superior do playground
 */
function criarPlayground(idContainer, codigoInicial, titulo) {
  const container = document.getElementById(idContainer);
  if (!container) return;

  container.classList.add("playground");
  container.innerHTML = `
    <div class="playground__barra">
      <span class="playground__titulo">${titulo || "Experimente você mesmo"}</span>
      <div class="playground__botoes">
        <button type="button" class="botao botao--secundario" data-acao="reiniciar">↺ Reiniciar</button>
        <button type="button" class="botao botao--primario" data-acao="executar">▶ Executar</button>
      </div>
    </div>
    <textarea class="playground__editor" spellcheck="false"></textarea>
    <div class="playground__saida"><span class="linha-vazia">Clique em "Executar" para ver o resultado aqui.</span></div>
  `;

  const editor = container.querySelector(".playground__editor");
  const saida = container.querySelector(".playground__saida");
  const botaoExecutar = container.querySelector('[data-acao="executar"]');
  const botaoReiniciar = container.querySelector('[data-acao="reiniciar"]');

  editor.value = codigoInicial;

  // Permite usar a tecla Tab dentro do editor para indentar, em vez de mudar de campo
  editor.addEventListener("keydown", (evento) => {
    if (evento.key === "Tab") {
      evento.preventDefault();
      const inicio = editor.selectionStart;
      const fim = editor.selectionEnd;
      editor.value = editor.value.slice(0, inicio) + "  " + editor.value.slice(fim);
      editor.selectionStart = editor.selectionEnd = inicio + 2;
    }
  });

  function executar() {
    const iframe = document.createElement("iframe");
    iframe.setAttribute("sandbox", "allow-scripts");
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    // O contentWindow só existe depois que o iframe é anexado ao DOM
    _registroJanelasExecucao.set(iframe.contentWindow, {
      aoReceberResultado: (dados) => {
        _renderizarSaidaConsole(saida, dados.logs, dados.erro);
        iframe.remove();
      },
    });

    iframe.srcdoc = _montarDocumentoSandbox(editor.value, "");
  }

  botaoExecutar.addEventListener("click", executar);
  botaoReiniciar.addEventListener("click", () => {
    editor.value = codigoInicial;
    saida.innerHTML = '<span class="linha-vazia">Clique em "Executar" para ver o resultado aqui.</span>';
  });
}

/**
 * Cria um exercício prático com correção automática por testes.
 * @param {object} opcoes
 * @param {string} opcoes.idContainer - id do <div> do exercício
 * @param {string} opcoes.enunciado - HTML do enunciado do exercício
 * @param {string} opcoes.codigoInicial - código inicial (modelo) para o aluno completar
 * @param {Array<{descricao: string, expressao: string}>} opcoes.testes - testes automáticos
 */
function criarExercicio(opcoes) {
  const container = document.getElementById(opcoes.idContainer);
  if (!container) return;

  container.classList.add("exercicio");
  container.innerHTML = `
    <div class="exercicio__enunciado">${opcoes.enunciado}</div>
    <textarea class="playground__editor" spellcheck="false"></textarea>
    <div class="playground__barra" style="margin-top:0.6rem;">
      <span class="playground__titulo">Correção automática</span>
      <div class="playground__botoes">
        <button type="button" class="botao botao--secundario" data-acao="reiniciar">↺ Reiniciar</button>
        <button type="button" class="botao botao--primario" data-acao="verificar">✔ Verificar</button>
      </div>
    </div>
    <div class="exercicio__resultados"></div>
  `;

  const editor = container.querySelector(".playground__editor");
  const resultados = container.querySelector(".exercicio__resultados");
  const botaoVerificar = container.querySelector('[data-acao="verificar"]');
  const botaoReiniciar = container.querySelector('[data-acao="reiniciar"]');

  editor.value = opcoes.codigoInicial;

  editor.addEventListener("keydown", (evento) => {
    if (evento.key === "Tab") {
      evento.preventDefault();
      const inicio = editor.selectionStart;
      const fim = editor.selectionEnd;
      editor.value = editor.value.slice(0, inicio) + "  " + editor.value.slice(fim);
      editor.selectionStart = editor.selectionEnd = inicio + 2;
    }
  });

  function montarHarness() {
    const linhas = ['window.__resultadoTestes = [];'];
    opcoes.testes.forEach((teste, indice) => {
      linhas.push(`try {`);
      linhas.push(`  window.__resultadoTestes.push({ descricao: ${JSON.stringify(teste.descricao)}, passou: !!(${teste.expressao}) });`);
      linhas.push(`} catch (e${indice}) {`);
      linhas.push(`  window.__resultadoTestes.push({ descricao: ${JSON.stringify(teste.descricao)}, passou: false });`);
      linhas.push(`}`);
    });
    return linhas.join("\n");
  }

  function renderizarResultados(testes, erro) {
    resultados.innerHTML = "";

    if (erro) {
      const aviso = document.createElement("div");
      aviso.className = "teste falhou";
      aviso.innerHTML = `<span class="teste__selo">✖</span> Seu código tem um erro antes mesmo de rodar os testes: ${erro}`;
      resultados.appendChild(aviso);
    }

    (testes || []).forEach((teste) => {
      const linha = document.createElement("div");
      linha.className = "teste " + (teste.passou ? "ok" : "falhou");
      linha.innerHTML = `<span class="teste__selo">${teste.passou ? "✔" : "✖"}</span> ${teste.descricao}`;
      resultados.appendChild(linha);
    });

    if (!erro && testes && testes.length > 0) {
      const total = testes.length;
      const acertos = testes.filter((t) => t.passou).length;
      const resumo = document.createElement("div");
      resumo.style.marginTop = "0.4rem";
      resumo.style.fontWeight = "700";
      resumo.textContent =
        acertos === total
          ? `🎉 Muito bem! Você passou em todos os ${total} testes.`
          : `Você passou em ${acertos} de ${total} testes. Continue tentando!`;
      resultados.appendChild(resumo);
    }
  }

  function verificar() {
    const iframe = document.createElement("iframe");
    iframe.setAttribute("sandbox", "allow-scripts");
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    _registroJanelasExecucao.set(iframe.contentWindow, {
      aoReceberResultado: (dados) => {
        renderizarResultados(dados.testes, dados.erro);
        iframe.remove();
      },
    });

    iframe.srcdoc = _montarDocumentoSandbox(editor.value, montarHarness());
  }

  botaoVerificar.addEventListener("click", verificar);
  botaoReiniciar.addEventListener("click", () => {
    editor.value = opcoes.codigoInicial;
    resultados.innerHTML = "";
  });
}

/**
 * Cria um playground com uma página HTML de verdade dentro de um iframe visível,
 * para praticar manipulação do DOM, eventos e formulários com resultado visual.
 * @param {object} opcoes
 * @param {string} opcoes.idContainer - id do <div> onde o playground será montado
 * @param {string} opcoes.htmlBase - marcação HTML (miolo do <body>) exibida no iframe
 * @param {string} opcoes.codigoInicial - código JavaScript inicial que manipula o htmlBase
 * @param {string} opcoes.titulo - texto exibido na barra superior
 * @param {number} [opcoes.altura=210] - altura do iframe em pixels
 */
function criarPlaygroundDOM(opcoes) {
  const container = document.getElementById(opcoes.idContainer);
  if (!container) return;

  const altura = opcoes.altura || 210;
  container.classList.add("playground");
  container.innerHTML = `
    <div class="playground__barra">
      <span class="playground__titulo">${opcoes.titulo || "Experimente você mesmo"}</span>
      <div class="playground__botoes">
        <button type="button" class="botao botao--secundario" data-acao="reiniciar">↺ Reiniciar</button>
        <button type="button" class="botao botao--primario" data-acao="executar">▶ Executar</button>
      </div>
    </div>
    <textarea class="playground__editor" spellcheck="false" style="min-height:120px;"></textarea>
    <iframe class="playground__iframe-dom" sandbox="allow-scripts" style="width:100%;height:${altura}px;border:1px solid var(--borda);border-radius:8px;background:#ffffff;margin-top:0.7rem;"></iframe>
    <div class="playground__saida" style="margin-top:0.5rem;"><span class="linha-vazia">Clique em "Executar" para carregar a página e testar seu código.</span></div>
  `;

  const editor = container.querySelector(".playground__editor");
  const iframeVisivel = container.querySelector(".playground__iframe-dom");
  const saida = container.querySelector(".playground__saida");
  const botaoExecutar = container.querySelector('[data-acao="executar"]');
  const botaoReiniciar = container.querySelector('[data-acao="reiniciar"]');

  editor.value = opcoes.codigoInicial;

  editor.addEventListener("keydown", (evento) => {
    if (evento.key === "Tab") {
      evento.preventDefault();
      const inicio = editor.selectionStart;
      const fim = editor.selectionEnd;
      editor.value = editor.value.slice(0, inicio) + "  " + editor.value.slice(fim);
      editor.selectionStart = editor.selectionEnd = inicio + 2;
    }
  });

  function montarDocumentoDom(codigoUsuario) {
    const script = `
      var __logs = [];
      function __serializar(v) { try { return typeof v === "string" ? v : JSON.stringify(v); } catch (e) { return String(v); } }
      console.log = function () { __logs.push({ tipo: "log", texto: Array.prototype.map.call(arguments, __serializar).join(" ") }); parent.postMessage({ tipo: "resultado-execucao", logs: __logs, erro: null }, "*"); };
      window.onerror = function (mensagem) {
        parent.postMessage({ tipo: "resultado-execucao", logs: __logs, erro: String(mensagem) }, "*");
        return true;
      };
      try {
        // eval garante que erros de sintaxe do aluno também sejam capturados aqui
        eval(${JSON.stringify(codigoUsuario)});
        parent.postMessage({ tipo: "resultado-execucao", logs: __logs, erro: null }, "*");
      } catch (erroExecucao) {
        parent.postMessage({ tipo: "resultado-execucao", logs: __logs, erro: erroExecucao.message }, "*");
      }
    `;
    return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
      body { font-family: "Segoe UI", Arial, sans-serif; padding: 1rem; color: #1a1a2e; margin:0; }
      button { cursor: pointer; padding: 0.45rem 0.9rem; border-radius: 6px; border: 1px solid #c7cbe0; background: #eef0fb; font-size: 0.9rem; }
      button:hover { background: #dfe2f7; }
      input, select, textarea { font-size: 0.9rem; padding: 0.35rem 0.5rem; border-radius: 6px; border: 1px solid #c7cbe0; }
      label { display: block; margin: 0.4rem 0 0.15rem; font-weight: 600; }
    </style></head><body>${opcoes.htmlBase}<script>${script}<\/script></body></html>`;
  }

  function executar() {
    _registroJanelasExecucao.set(iframeVisivel.contentWindow, {
      aoReceberResultado: (dados) => {
        if (dados.erro) {
          saida.innerHTML = `<span class="linha-erro">✖ Erro: ${dados.erro}</span>`;
        } else if (dados.logs && dados.logs.length > 0) {
          saida.innerHTML = dados.logs
            .map((l) => `<div class="linha-log">› ${l.texto}</div>`)
            .join("");
        } else {
          saida.innerHTML = '<span class="linha-vazia">Página carregada. Interaja com ela acima.</span>';
        }
      },
    });
    iframeVisivel.srcdoc = montarDocumentoDom(editor.value);
  }

  botaoExecutar.addEventListener("click", executar);
  botaoReiniciar.addEventListener("click", () => {
    editor.value = opcoes.codigoInicial;
    iframeVisivel.srcdoc = "";
    saida.innerHTML = '<span class="linha-vazia">Clique em "Executar" para carregar a página e testar seu código.</span>';
  });

  // Carrega automaticamente uma vez ao entrar na página
  executar();
}

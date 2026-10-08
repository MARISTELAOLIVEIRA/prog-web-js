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

/* ===================================================================
   Editor de projeto no estilo do VS Code: index.html, estilo.css e script.js
   O aluno vê os três arquivos completos, com números de linha e cores,
   e a página de resultado embaixo. Sem console: tudo aparece na página.
   =================================================================== */

const _ARQUIVOS = [
  { nome: "index.html", tipo: "html" },
  { nome: "estilo.css", tipo: "css" },
  { nome: "script.js", tipo: "js" },
];

function _escapar(texto) {
  return texto.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function _marca(classe, texto) {
  return '<span class="vs-' + classe + '">' + _escapar(texto) + "</span>";
}

// ---------- cores do código (tema escuro do VS Code) ----------

function _realcarHTML(codigo) {
  const partes = /(<!--[\s\S]*?-->)|(<!DOCTYPE[^>]*>)|(<\/?[a-zA-Z][^>]*>?)/gi;
  let saida = "";
  let ultimo = 0;
  let achado;
  while ((achado = partes.exec(codigo)) !== null) {
    saida += _escapar(codigo.slice(ultimo, achado.index));
    if (achado[1]) {
      saida += _marca("comentario", achado[1]);
    } else if (achado[2]) {
      saida += _marca("pontuacao", "<!") + _marca("tag", achado[2].slice(2, -1)) + _marca("pontuacao", ">");
    } else {
      saida += _realcarTag(achado[3]);
    }
    ultimo = partes.lastIndex;
  }
  return saida + _escapar(codigo.slice(ultimo));
}

function _realcarTag(tag) {
  const pedacos = /^(<\/?)([a-zA-Z][\w-]*)([\s\S]*?)(\/?>)?$/.exec(tag);
  if (!pedacos) {
    return _escapar(tag);
  }
  const atributos = (pedacos[3] || "").replace(/("[^"]*"|'[^']*')|([^\s="']+)|(=)|(\s+)/g, (trecho, texto, nome, igual) => {
    if (texto) return _marca("texto", texto);
    if (nome) return _marca("atributo", nome);
    if (igual) return _marca("pontuacao", igual);
    return trecho;
  });
  return _marca("pontuacao", pedacos[1]) + _marca("tag", pedacos[2]) + atributos + _marca("pontuacao", pedacos[4] || "");
}

function _realcarValorCSS(valor) {
  return valor.replace(/(#[0-9a-fA-F]{3,8})|(-?\d*\.?\d+)(px|em|rem|%|vh|vw|s|deg)?|([^#\d-]+|[#-])/g, (trecho, cor, numero, unidade, resto) => {
    if (cor) return _marca("texto", cor);
    if (numero) return _marca("numero", numero + (unidade || ""));
    return _marca("texto", resto || trecho);
  });
}

function _realcarCSS(codigo) {
  const partes = /(\/\*[\s\S]*?\*\/)|([^{}\s;\/][^{};]*?)(?=\s*\{)|([\w-]+)(\s*:\s*)([^;{}\n]*)/g;
  let saida = "";
  let ultimo = 0;
  let achado;
  while ((achado = partes.exec(codigo)) !== null) {
    saida += _escapar(codigo.slice(ultimo, achado.index));
    if (achado[1]) {
      saida += _marca("comentario", achado[1]);
    } else if (achado[2]) {
      saida += _marca("seletor", achado[2]);
    } else {
      saida += _marca("propriedade", achado[3]) + _escapar(achado[4]) + _realcarValorCSS(achado[5]);
    }
    ultimo = partes.lastIndex;
  }
  return saida + _escapar(codigo.slice(ultimo));
}

function _realcarJS(codigo) {
  const partes = new RegExp([
    "(\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)",
    "(\"(?:[^\"\\\\\\n]|\\\\.)*\"|'(?:[^'\\\\\\n]|\\\\.)*'|`(?:[^`\\\\]|\\\\.)*`)",
    "\\b(if|else|for|while|do|return|switch|case|break|continue|of|in)\\b",
    "\\b(const|let|var|function|new|typeof|true|false|null|undefined|this)\\b",
    "\\b(\\d+(?:\\.\\d+)?)\\b",
    "([A-Za-z_$][\\w$]*)(?=\\s*\\()",
    "(?<=\\.)([A-Za-z_$][\\w$]*)",
  ].join("|"), "g");
  const classes = ["comentario", "texto", "controle", "palavra", "numero", "funcao", "propriedade"];
  let saida = "";
  let ultimo = 0;
  let achado;
  while ((achado = partes.exec(codigo)) !== null) {
    saida += _escapar(codigo.slice(ultimo, achado.index));
    const grupo = achado.slice(1).findIndex((valor) => valor !== undefined);
    saida += _marca(classes[grupo], achado[0]);
    ultimo = partes.lastIndex;
  }
  return saida + _escapar(codigo.slice(ultimo));
}

const _REALCE = { html: _realcarHTML, css: _realcarCSS, js: _realcarJS };

// ---------- a página do aluno ----------

// Junta os três arquivos como o navegador faria: o <link> traz o estilo.css e o <script> traz o script.js.
// Se o aluno apagar o <link> ou o <script>, o CSS ou o JS deixam de valer, como na vida real.
function _montarProjeto(arquivos, codigoTestes) {
  const vigia = `<script>
    function __avisar(dados) {
      dados.tipo = "resultado-execucao";
      dados.testes = window.__resultadoTestes || null;
      parent.postMessage(dados, "*");
    }
    window.onerror = function (mensagem) {
      __avisar({ erro: String(mensagem) });
      return true;
    };
    window.addEventListener("load", function () {
      ${codigoTestes || ""}
      __avisar({ erro: window.__erroScript || null });
    });
  <\/script>`;
  const css = arquivos["estilo.css"].replace(/<\/style/gi, "<\\/style");
  const js = JSON.stringify(arquivos["script.js"]).replace(/<\/script/gi, "<\\/script");
  let html = arquivos["index.html"];
  html = html.replace(/<link\b[^>]*href\s*=\s*["']\.?\/?estilo\.css["'][^>]*>/i, () => "<style>" + css + "</style>");
  html = html.replace(/<script\b[^>]*src\s*=\s*["']\.?\/?script\.js["'][^>]*>\s*<\/script>/i,
    () => "<script>try { eval(" + js + "); } catch (erro) { window.__erroScript = erro.message; }<\/script>");
  if (/<head[^>]*>/i.test(html)) {
    return html.replace(/<head[^>]*>/i, (cabeca) => cabeca + vigia);
  }
  return vigia + html;
}

function _mostrarErroProjeto(saida, dados) {
  if (dados.erro) {
    saida.innerHTML = "";
    const aviso = document.createElement("span");
    aviso.className = "linha-erro";
    aviso.textContent = "✖ Curto-circuito no script.js: " + dados.erro;
    saida.appendChild(aviso);
    saida.hidden = false;
  } else {
    saida.hidden = true;
  }
}

// ---------- o editor ----------

function _montarEditorVS(container, opcoes, aoMudar) {
  const id = container.id;
  const pasta = opcoes.pasta || "meu-projeto";
  const janela = container.querySelector(".vscode");
  janela.innerHTML = `
    <div class="vscode__barra">
      <span class="semaforo" aria-hidden="true"><i></i><i></i><i></i></span>
      <span class="vscode__titulo"></span>
    </div>
    <div class="vscode__abas" role="tablist" aria-label="Arquivos do projeto"></div>
    <div class="vscode__migalhas" aria-hidden="true"></div>
    <div class="vscode__arquivos"></div>
  `;
  const abas = janela.querySelector(".vscode__abas");
  const arquivos = janela.querySelector(".vscode__arquivos");
  const titulo = janela.querySelector(".vscode__titulo");
  const migalhas = janela.querySelector(".vscode__migalhas");
  const editores = {};

  _ARQUIVOS.forEach((arquivo) => {
    const aba = document.createElement("button");
    aba.type = "button";
    aba.className = "vscode__aba vscode__aba--" + arquivo.tipo;
    aba.id = id + "-aba-" + arquivo.tipo;
    aba.setAttribute("role", "tab");
    aba.setAttribute("aria-controls", id + "-arquivo-" + arquivo.tipo);
    aba.textContent = arquivo.nome;
    aba.addEventListener("click", () => mostrar(arquivo.tipo));
    abas.appendChild(aba);

    const painel = document.createElement("div");
    painel.className = "vscode__arquivo";
    painel.id = id + "-arquivo-" + arquivo.tipo;
    painel.setAttribute("role", "tabpanel");
    painel.setAttribute("aria-labelledby", aba.id);
    painel.innerHTML = `
      <pre class="vscode__linhas" aria-hidden="true"></pre>
      <div class="vscode__area">
        <pre class="vscode__realce" aria-hidden="true"><code></code></pre>
        <textarea class="vscode__texto" spellcheck="false" wrap="off" autocapitalize="off" autocomplete="off"></textarea>
      </div>
    `;
    arquivos.appendChild(painel);

    const texto = painel.querySelector(".vscode__texto");
    const realce = painel.querySelector(".vscode__realce");
    const codigo = realce.querySelector("code");
    const linhas = painel.querySelector(".vscode__linhas");
    texto.setAttribute("aria-label", "Código do arquivo " + arquivo.nome);
    texto.value = opcoes.arquivos[arquivo.nome];

    function pintar() {
      // o espaço no fim garante a altura da última linha, igual à do textarea
      codigo.innerHTML = _REALCE[arquivo.tipo](texto.value) + "\n ";
      const total = texto.value.split("\n").length;
      let numeros = "";
      for (let numero = 1; numero <= total; numero++) {
        numeros += numero + "\n";
      }
      linhas.textContent = numeros;
      rolar();
    }

    function rolar() {
      realce.scrollTop = texto.scrollTop;
      realce.scrollLeft = texto.scrollLeft;
      linhas.scrollTop = texto.scrollTop;
    }

    texto.addEventListener("input", () => {
      pintar();
      aoMudar();
    });
    texto.addEventListener("scroll", rolar);

    // Tab indenta; Enter mantém o recuo da linha de cima, como no VS Code
    texto.addEventListener("keydown", (evento) => {
      const inicio = texto.selectionStart;
      const fim = texto.selectionEnd;
      if (evento.key === "Tab") {
        evento.preventDefault();
        texto.setRangeText("  ", inicio, fim, "end");
        texto.dispatchEvent(new Event("input"));
      }
      if (evento.key === "Enter") {
        evento.preventDefault();
        const linhaAtual = texto.value.slice(texto.value.lastIndexOf("\n", inicio - 1) + 1, inicio);
        let recuo = /^\s*/.exec(linhaAtual)[0];
        if (/[{(>]\s*$/.test(linhaAtual) && !/<\/[^>]*>\s*$/.test(linhaAtual)) {
          recuo += "  ";
        }
        texto.setRangeText("\n" + recuo, inicio, fim, "end");
        texto.dispatchEvent(new Event("input"));
      }
    });

    editores[arquivo.nome] = { texto: texto, pintar: pintar };
    pintar();
  });

  // setas do teclado trocam de aba, como em qualquer lista de abas
  abas.addEventListener("keydown", (evento) => {
    if (evento.key !== "ArrowRight" && evento.key !== "ArrowLeft") return;
    const tipos = _ARQUIVOS.map((arquivo) => arquivo.tipo);
    const atual = tipos.indexOf(janela.dataset.ativo);
    const passo = evento.key === "ArrowRight" ? 1 : tipos.length - 1;
    const proximo = tipos[(atual + passo) % tipos.length];
    mostrar(proximo);
    janela.querySelector("#" + id + "-aba-" + proximo).focus();
  });

  function mostrar(tipo) {
    janela.dataset.ativo = tipo;
    _ARQUIVOS.forEach((arquivo) => {
      const ativa = arquivo.tipo === tipo;
      const aba = janela.querySelector("#" + id + "-aba-" + arquivo.tipo);
      aba.setAttribute("aria-selected", String(ativa));
      aba.tabIndex = ativa ? 0 : -1;
      janela.querySelector("#" + id + "-arquivo-" + arquivo.tipo).hidden = !ativa;
      if (ativa) {
        abas.scrollLeft = aba.offsetLeft - abas.offsetLeft - 8; // a aba ativa nunca fica escondida no celular
        titulo.textContent = arquivo.nome + " — " + pasta;
        migalhas.textContent = pasta + " › " + arquivo.nome;
      }
    });
  }

  mostrar(opcoes.abaInicial || "html");

  return {
    ler: () => {
      const conteudo = {};
      Object.keys(editores).forEach((nome) => {
        conteudo[nome] = editores[nome].texto.value;
      });
      return conteudo;
    },
    reiniciar: () => {
      Object.keys(editores).forEach((nome) => {
        editores[nome].texto.value = opcoes.arquivos[nome];
        editores[nome].pintar();
      });
    },
  };
}

function _casca(opcoes, rodape) {
  return `
    ${opcoes.enunciado ? '<div class="exercicio__enunciado">' + opcoes.enunciado + "</div>" : ""}
    <div class="playground__barra">
      <span class="playground__titulo">${opcoes.titulo || "Experimente você mesmo"}</span>
      <div class="playground__botoes">
        <button type="button" class="botao botao--secundario" data-acao="reiniciar">↺ Reiniciar</button>
        <button type="button" class="botao botao--primario" data-acao="executar">▶ Atualizar a página</button>
      </div>
    </div>
    <div class="vscode" style="--altura-editor:${opcoes.alturaEditor || 320}px"></div>
    <p class="playground__rotulo-pagina">Resultado: o index.html aberto no navegador</p>
    <iframe class="playground__pagina" title="Resultado: ${opcoes.titulo || "página do projeto"}" sandbox="allow-scripts allow-forms${opcoes.mesmaOrigem ? " allow-same-origin" : ""}" style="height:${opcoes.altura || 220}px"></iframe>
    <div class="playground__saida" hidden></div>
    ${rodape || ""}
  `;
}

/**
 * Cria um projeto com index.html, estilo.css e script.js, no estilo do VS Code.
 * A página de resultado atualiza sozinha enquanto o aluno digita.
 * @param {object} opcoes
 * @param {string} opcoes.idContainer - id do <div> onde o projeto será montado
 * @param {string} opcoes.titulo - texto da barra superior
 * @param {string} [opcoes.pasta] - nome da pasta do projeto, mostrado na barra do editor
 * @param {{"index.html": string, "estilo.css": string, "script.js": string}} opcoes.arquivos - conteúdo inicial
 * @param {string} [opcoes.abaInicial="html"] - "html", "css" ou "js"
 * @param {number} [opcoes.altura=220] - altura da página de resultado, em pixels
 * @param {boolean} [opcoes.mesmaOrigem=false] - deixa a página usar o localStorage (ex.: guardar dados no navegador)
 */
function criarProjetoVS(opcoes) {
  const container = document.getElementById(opcoes.idContainer);
  if (!container) return;

  container.classList.add("playground", "playground--projeto");
  container.innerHTML = _casca(opcoes);
  const pagina = container.querySelector(".playground__pagina");
  const saida = container.querySelector(".playground__saida");
  let espera = null;

  const editor = _montarEditorVS(container, opcoes, () => {
    clearTimeout(espera);
    espera = setTimeout(atualizar, 500);
  });

  function atualizar() {
    _registroJanelasExecucao.set(pagina.contentWindow, {
      aoReceberResultado: (dados) => _mostrarErroProjeto(saida, dados),
    });
    saida.hidden = true;
    pagina.srcdoc = _montarProjeto(editor.ler(), "");
  }

  container.querySelector('[data-acao="executar"]').addEventListener("click", atualizar);
  container.querySelector('[data-acao="reiniciar"]').addEventListener("click", () => {
    editor.reiniciar();
    atualizar();
  });

  atualizar();
}

/**
 * Cria um exercício no editor de projeto, com correção automática.
 * Os testes rodam numa cópia escondida da página, depois que o script.js carrega.
 * @param {object} opcoes - as mesmas de criarProjetoVS, mais:
 * @param {string} opcoes.enunciado - HTML do enunciado
 * @param {Array<{descricao: string, expressao: string}>} opcoes.testes - expressões que devem dar true
 * @param {string} [opcoes.ajudantes] - funções auxiliares usadas nas expressões dos testes
 */
function criarExercicioVS(opcoes) {
  const container = document.getElementById(opcoes.idContainer);
  if (!container) return;

  container.classList.add("exercicio", "playground--projeto");
  container.innerHTML = _casca(opcoes, `
    <div class="playground__barra" style="margin-top:0.6rem;">
      <span class="playground__titulo">Correção automática</span>
      <div class="playground__botoes">
        <button type="button" class="botao botao--primario" data-acao="verificar">✔ Verificar</button>
      </div>
    </div>
    <div class="exercicio__resultados"></div>
  `);
  const pagina = container.querySelector(".playground__pagina");
  const saida = container.querySelector(".playground__saida");
  const resultados = container.querySelector(".exercicio__resultados");
  let espera = null;

  const editor = _montarEditorVS(container, opcoes, () => {
    clearTimeout(espera);
    espera = setTimeout(atualizar, 500);
  });

  function atualizar() {
    _registroJanelasExecucao.set(pagina.contentWindow, {
      aoReceberResultado: (dados) => _mostrarErroProjeto(saida, dados),
    });
    saida.hidden = true;
    pagina.srcdoc = _montarProjeto(editor.ler(), "");
  }

  function montarTestes() {
    const linhas = [opcoes.ajudantes || "", "window.__resultadoTestes = [];"];
    opcoes.testes.forEach((teste) => {
      linhas.push("try {");
      linhas.push("  window.__resultadoTestes.push({ descricao: " + JSON.stringify(teste.descricao) + ", passou: !!(" + teste.expressao + ") });");
      linhas.push("} catch (erroTeste) {");
      linhas.push("  window.__resultadoTestes.push({ descricao: " + JSON.stringify(teste.descricao) + ", passou: false });");
      linhas.push("}");
    });
    return linhas.join("\n");
  }

  function mostrarResultados(dados) {
    _mostrarErroProjeto(saida, dados);
    resultados.innerHTML = "";
    const testes = dados.testes || [];
    testes.forEach((teste) => {
      const linha = document.createElement("div");
      linha.className = "teste " + (teste.passou ? "ok" : "falhou");
      linha.innerHTML = `<span class="teste__selo">${teste.passou ? "✔" : "✖"}</span> `;
      linha.appendChild(document.createTextNode(teste.descricao));
      resultados.appendChild(linha);
    });
    if (testes.length > 0) {
      const acertos = testes.filter((teste) => teste.passou).length;
      const resumo = document.createElement("div");
      resumo.style.marginTop = "0.4rem";
      resumo.style.fontWeight = "700";
      resumo.textContent = acertos === testes.length
        ? "🎉 Compilou de primeira! Você passou nos " + testes.length + " testes."
        : "Você passou em " + acertos + " de " + testes.length + " testes. Confere a trilha e tenta de novo.";
      resultados.appendChild(resumo);
    }
  }

  // os testes rodam numa página escondida, para não bagunçar a que o aluno está vendo
  function verificar() {
    const oculto = document.createElement("iframe");
    oculto.setAttribute("sandbox", "allow-scripts");
    oculto.style.display = "none";
    document.body.appendChild(oculto);
    _registroJanelasExecucao.set(oculto.contentWindow, {
      aoReceberResultado: (dados) => {
        mostrarResultados(dados);
        oculto.remove();
      },
    });
    oculto.srcdoc = _montarProjeto(editor.ler(), montarTestes());
  }

  container.querySelector('[data-acao="verificar"]').addEventListener("click", verificar);
  container.querySelector('[data-acao="executar"]').addEventListener("click", atualizar);
  container.querySelector('[data-acao="reiniciar"]').addEventListener("click", () => {
    editor.reiniciar();
    resultados.innerHTML = "";
    atualizar();
  });

  atualizar();
}

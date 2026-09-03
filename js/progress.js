/* ===================================================================
   progress.js
   Controla o progresso do aluno usando localStorage.
   Cada módulo concluído fica salvo no navegador do aluno.
   =================================================================== */

// Lista oficial de módulos do curso (usada para calcular o progresso geral)
const MODULOS_DO_CURSO = [
  "01-variaveis",
  "02-condicionais",
  "03-lacos",
  "04-funcoes",
  "05-arrays-objetos",
  "06-dom-eventos",
  "07-formularios",
  "08-debug-boas-praticas",
];

const CHAVE_PROGRESSO = "curso-js:modulos-concluidos";

function obterModulosConcluidos() {
  try {
    const salvos = localStorage.getItem(CHAVE_PROGRESSO);
    return salvos ? JSON.parse(salvos) : [];
  } catch (erro) {
    return [];
  }
}

function moduloEstaConcluido(idModulo) {
  return obterModulosConcluidos().includes(idModulo);
}

function marcarModuloConcluido(idModulo) {
  const concluidos = obterModulosConcluidos();
  if (!concluidos.includes(idModulo)) {
    concluidos.push(idModulo);
    localStorage.setItem(CHAVE_PROGRESSO, JSON.stringify(concluidos));
  }
}

function desmarcarModuloConcluido(idModulo) {
  const concluidos = obterModulosConcluidos().filter((m) => m !== idModulo);
  localStorage.setItem(CHAVE_PROGRESSO, JSON.stringify(concluidos));
}

// Renderiza a barra de progresso geral (usada na página inicial)
function renderizarProgressoGeral(elementoBarra, elementoTexto) {
  const concluidos = obterModulosConcluidos().filter((m) =>
    MODULOS_DO_CURSO.includes(m)
  );
  const percentual = Math.round(
    (concluidos.length / MODULOS_DO_CURSO.length) * 100
  );
  elementoBarra.style.width = percentual + "%";
  elementoTexto.textContent =
    concluidos.length === MODULOS_DO_CURSO.length && concluidos.length > 0
      ? "Parabéns! Você concluiu todos os módulos. 🎉"
      : `${concluidos.length} de ${MODULOS_DO_CURSO.length} módulos concluídos (${percentual}%)`;
}

// Configura o botão "Marcar módulo como concluído" em uma página de aula
function configurarBotaoConcluir(idModulo) {
  const botao = document.querySelector("[data-botao-concluir]");
  const status = document.querySelector("[data-status-concluir]");
  if (!botao) return;

  function atualizarVisual() {
    if (moduloEstaConcluido(idModulo)) {
      botao.textContent = "✔ Módulo concluído (clique para desfazer)";
      botao.classList.add("botao--sucesso");
      if (status) status.textContent = "Progresso salvo neste navegador.";
    } else {
      botao.textContent = "Marcar módulo como concluído";
      botao.classList.remove("botao--sucesso");
      if (status) status.textContent = "";
    }
  }

  botao.addEventListener("click", () => {
    if (moduloEstaConcluido(idModulo)) {
      desmarcarModuloConcluido(idModulo);
    } else {
      marcarModuloConcluido(idModulo);
    }
    atualizarVisual();
  });

  atualizarVisual();
}

/* ===================================================================
   quiz.js
   Componente de quiz de múltipla escolha para fixação do conteúdo.
   =================================================================== */

/**
 * Cria um quiz dentro do elemento com o id informado.
 * @param {string} idContainer - id do <div> onde o quiz será montado
 * @param {Array<{pergunta: string, alternativas: string[], correta: number}>} perguntas
 */
function criarQuiz(idContainer, perguntas) {
  const container = document.getElementById(idContainer);
  if (!container) return;

  container.classList.add("quiz");

  const respostasDoAluno = new Array(perguntas.length).fill(null);

  container.innerHTML =
    perguntas
      .map((pergunta, indicePergunta) => {
        const alternativasHtml = pergunta.alternativas
          .map(
            (alternativa, indiceAlternativa) => `
          <label class="quiz__alternativa" data-pergunta="${indicePergunta}" data-alternativa="${indiceAlternativa}">
            <input type="radio" name="pergunta-${idContainer}-${indicePergunta}" value="${indiceAlternativa}" />
            ${alternativa}
          </label>`
          )
          .join("");

        return `
        <div class="quiz__pergunta" data-pergunta-container="${indicePergunta}">
          <div class="quiz__enunciado">${indicePergunta + 1}. ${pergunta.pergunta}</div>
          <div class="quiz__alternativas">${alternativasHtml}</div>
        </div>`;
      })
      .join("") +
    `<button type="button" class="botao botao--primario" data-acao="corrigir">Corrigir respostas</button>
     <div class="quiz__resultado" data-resultado></div>`;

  container.querySelectorAll(".quiz__alternativa").forEach((label) => {
    label.addEventListener("click", () => {
      const indicePergunta = Number(label.dataset.pergunta);
      const indiceAlternativa = Number(label.dataset.alternativa);
      respostasDoAluno[indicePergunta] = indiceAlternativa;
      label.querySelector("input").checked = true;
    });
  });

  container.querySelector('[data-acao="corrigir"]').addEventListener("click", () => {
    let acertos = 0;

    perguntas.forEach((pergunta, indicePergunta) => {
      const respondida = respostasDoAluno[indicePergunta];
      const labelsDaPergunta = container.querySelectorAll(
        `[data-pergunta-container="${indicePergunta}"] .quiz__alternativa`
      );

      labelsDaPergunta.forEach((label) => {
        label.classList.remove("correta", "incorreta");
        const indiceAlternativa = Number(label.dataset.alternativa);
        if (indiceAlternativa === pergunta.correta) {
          label.classList.add("correta");
        } else if (indiceAlternativa === respondida && respondida !== pergunta.correta) {
          label.classList.add("incorreta");
        }
      });

      if (respondida === pergunta.correta) acertos++;
    });

    const resultado = container.querySelector("[data-resultado]");
    resultado.textContent =
      acertos === perguntas.length
        ? `🎉 Você acertou todas as ${perguntas.length} perguntas!`
        : `Você acertou ${acertos} de ${perguntas.length} perguntas. Revise as alternativas em verde e tente novamente no próximo módulo.`;
  });
}

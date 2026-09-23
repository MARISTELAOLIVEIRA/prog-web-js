// Mostra na tela o código real de um <script> da página (assim o exemplo nunca fica diferente do que roda).
// Uso: <script id="script-exercicio">...</script> e <pre><code id="codigo-js"></code></pre>
function exibirCodigo(idScript, idDestino) {
  const linhas = document.getElementById(idScript).textContent.replace(/^\n+|\s+$/g, "").split("\n");

  // Remove a indentação comum, para o código aparecer alinhado à esquerda
  const recuos = linhas.filter((l) => l.trim() !== "").map((l) => l.match(/^ */)[0].length);
  const recuo = Math.min(...recuos);

  document.getElementById(idDestino).textContent = linhas.map((l) => l.slice(recuo)).join("\n");
}

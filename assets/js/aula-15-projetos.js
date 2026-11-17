/*
  aula-15-projetos.js: a página-modelo do tutorial "Do VS Code ao ar" (aula 15), no editor com cara de VS Code.
  Usa criarProjetoVS() do curso/js/playground.js (carregue antes). versão 1 · 2026-11-16
*/

const PASSOS_AULA_15 = {
  "p1": {
    "titulo": "Passo 1: a sua primeira página, o interruptor",
    "altura": 350,
    "alturaEditor": 360,
    "abaInicial": "js",
    "arquivos": {
      "index.html": "<!DOCTYPE html>\n<html lang=\"pt-br\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <title>Minha primeira página no ar</title>\n  <link rel=\"stylesheet\" href=\"estilo.css\">\n</head>\n<body>\n  <h1>Minha primeira página no ar</h1>\n  <p>Feita em HTML, CSS e JavaScript.</p>\n\n  <p id=\"lampada\" class=\"lampada\">🌑</p>\n  <button id=\"interruptor\" type=\"button\">Ligar</button>\n  <p id=\"aviso\">Luz apagada. Clique para acender.</p>\n\n  <script src=\"script.js\"></script>\n</body>\n</html>\n",
      "estilo.css": "body {\n  font-family: Arial, sans-serif;\n  max-width: 480px;\n  margin: 24px auto;\n  padding: 0 16px;\n  text-align: center;\n  background: #1d1f24;\n  color: #e8e8e8;\n  transition: background 0.4s;\n}\n\n/* quando a luz acende, o body ganha a classe \"acesa\" */\nbody.acesa {\n  background: #fff7d1;\n  color: #2a2200;\n}\n\n.lampada {\n  font-size: 80px;\n  margin: 16px 0;\n}\n\nbutton {\n  padding: 10px 24px;\n  border: none;\n  border-radius: 8px;\n  background: #f7df1e;\n  color: #1d1f24;\n  font-size: 16px;\n  cursor: pointer;\n}\n",
      "script.js": "// o estado da lâmpada: começa desligada\nlet ligada = false;\n\n// os lugares da página que o JavaScript vai mexer\nconst botao = document.querySelector(\"#interruptor\");\nconst lampada = document.querySelector(\"#lampada\");\nconst aviso = document.querySelector(\"#aviso\");\n\n// clicou no botão? inverte o estado e mostra na página\nbotao.addEventListener(\"click\", function () {\n  ligada = !ligada;\n\n  if (ligada) {\n    lampada.textContent = \"💡\";\n    aviso.textContent = \"Luz acesa! A sua página está viva.\";\n    botao.textContent = \"Desligar\";\n    document.body.classList.add(\"acesa\");\n  } else {\n    lampada.textContent = \"🌑\";\n    aviso.textContent = \"Luz apagada. Clique para acender.\";\n    botao.textContent = \"Ligar\";\n    document.body.classList.remove(\"acesa\");\n  }\n});\n"
    }
  }
};

// monta um editor em cada <div id="projeto-pN"> da página
Object.keys(PASSOS_AULA_15).forEach((chave) => {
  const passo = PASSOS_AULA_15[chave];
  criarProjetoVS({
    idContainer: "projeto-" + chave,
    titulo: passo.titulo,
    pasta: "minha-pagina",
    arquivos: passo.arquivos,
    abaInicial: passo.abaInicial,
    altura: passo.altura,
    alturaEditor: passo.alturaEditor,
  });
});

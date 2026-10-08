/*
  aula-10-projetos.js: "A turma na tela, parte II" da aula 10, em 4 passos, no editor com cara de VS Code.
  Usa criarProjetoVS() do curso/js/playground.js (carregue antes). O passo 4 usa mesmaOrigem,
  para a página de resultado poder guardar dados no navegador (localStorage). versão 1 · 2026-10-08
*/

const PASSOS_AULA_10 = {
  "p1": {
    "titulo": "Passo 1: a ficha completa",
    "altura": 270,
    "alturaEditor": 360,
    "mesmaOrigem": false,
    "arquivos": {
      "index.html": "<!DOCTYPE html>\n<html lang=\"pt-br\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Minha turma</title>\n  <link rel=\"stylesheet\" href=\"estilo.css\">\n</head>\n<body>\n  <h1>Minha turma</h1>\n  <div id=\"ficha\" class=\"cartao\"></div>\n\n  <script src=\"script.js\"></script>\n</body>\n</html>\n",
      "estilo.css": "body {\n  font-family: Arial, sans-serif;\n  max-width: 520px;\n  margin: 24px auto;\n  padding: 0 16px;\n  background: #f4f7f5;\n  color: #1d2b24;\n}\n\nh1 {\n  color: #2e7d5b;\n}\n\n.cartao {\n  padding: 16px;\n  border-radius: 10px;\n  background: white;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n\n.cartao h2 {\n  margin-top: 0;\n}\n\n.media {\n  font-size: 1.3em;\n  font-weight: bold;\n  color: #2e7d5b;\n}\n",
      "script.js": "// um objeto com uma lista de notas e um método (uma função dentro do objeto)\nconst aluno = {\n  nome: \"Ana Souza\",\n  turma: \"ADS 2B\",\n  notas: [8.5, 7, 9.2],\n\n  // método: calcula a média das notas DESTE aluno\n  // (this quer dizer \"o próprio objeto\")\n  media() {\n    let soma = 0;\n    for (const nota of this.notas) {\n      soma += nota;\n    }\n    return soma / this.notas.length;\n  }\n};\n\nconst ficha = document.querySelector(\"#ficha\");\n\n// para chamar o método, use parênteses: aluno.media()\nficha.innerHTML =\n  \"<h2>\" + aluno.nome + \"</h2>\" +\n  \"<p>Turma: \" + aluno.turma + \"</p>\" +\n  \"<p>Notas: \" + aluno.notas.join(\" · \") + \"</p>\" +\n  \"<p class='media'>Média: \" + aluno.media().toFixed(1) + \"</p>\";\n"
    }
  },
  "p2": {
    "titulo": "Passo 2: cadastrar pelo formulário",
    "altura": 330,
    "alturaEditor": 360,
    "mesmaOrigem": false,
    "arquivos": {
      "index.html": "<!DOCTYPE html>\n<html lang=\"pt-br\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Minha turma</title>\n  <link rel=\"stylesheet\" href=\"estilo.css\">\n</head>\n<body>\n  <h1>Minha turma</h1>\n\n  <label for=\"nome\">Nome</label>\n  <input id=\"nome\">\n  <label for=\"nota\">Nota</label>\n  <input id=\"nota\" type=\"number\" min=\"0\" max=\"10\" step=\"0.1\">\n  <button id=\"cadastrar\" type=\"button\">Cadastrar</button>\n\n  <table>\n    <thead>\n      <tr><th>Nome</th><th>Nota</th><th>Situação</th></tr>\n    </thead>\n    <tbody id=\"tabela\"></tbody>\n  </table>\n\n  <script src=\"script.js\"></script>\n</body>\n</html>\n",
      "estilo.css": "body {\n  font-family: Arial, sans-serif;\n  max-width: 520px;\n  margin: 24px auto;\n  padding: 0 16px;\n  background: #f4f7f5;\n  color: #1d2b24;\n}\n\nh1 {\n  color: #2e7d5b;\n}\n\ninput {\n  padding: 8px;\n  width: 120px;\n}\n\nbutton {\n  padding: 8px 14px;\n  border: none;\n  border-radius: 6px;\n  background: #2e7d5b;\n  color: white;\n  cursor: pointer;\n}\n\ntable {\n  width: 100%;\n  margin-top: 16px;\n  border-collapse: collapse;\n}\n\nth,\ntd {\n  padding: 8px;\n  text-align: left;\n  border-bottom: 1px solid #d5e2da;\n}\n\n/* as cores de cada situação: o JavaScript só escolhe a classe */\n.aprovado {\n  color: #2e7d5b;\n}\n\n.reprovado {\n  color: #c22450;\n}\n",
      "script.js": "// a turma: uma lista de objetos (cada aluno com nome e nota)\nconst turma = [\n  { nome: \"Ana\", nota: 8.5 },\n  { nome: \"Bruno\", nota: 5 }\n];\n\nconst campoNome = document.querySelector(\"#nome\");\nconst campoNota = document.querySelector(\"#nota\");\nconst botao = document.querySelector(\"#cadastrar\");\nconst tabela = document.querySelector(\"#tabela\");\n\n// desenha a tabela inteira a partir da lista\nfunction mostrarTurma() {\n  tabela.innerHTML = \"\";\n  for (const aluno of turma) {\n    let situacao = \"reprovado\";\n    if (aluno.nota >= 6) {\n      situacao = \"aprovado\";\n    }\n    tabela.innerHTML +=\n      \"<tr class='\" + situacao + \"'>\" +\n      \"<td>\" + aluno.nome + \"</td>\" +\n      \"<td>\" + aluno.nota + \"</td>\" +\n      \"<td>\" + situacao + \"</td>\" +\n      \"</tr>\";\n  }\n}\n\n// clicou? monta um objeto novo e coloca na lista com push\nbotao.addEventListener(\"click\", function () {\n  const novo = {\n    nome: campoNome.value,\n    nota: Number(campoNota.value) // o campo devolve texto; Number() vira número\n  };\n  turma.push(novo);\n  campoNome.value = \"\";\n  campoNota.value = \"\";\n  mostrarTurma();\n});\n\n// desenha a tabela pela primeira vez\nmostrarTurma();\n"
    }
  },
  "p3": {
    "titulo": "Passo 3: ver o JSON da turma",
    "altura": 470,
    "alturaEditor": 420,
    "mesmaOrigem": false,
    "arquivos": {
      "index.html": "<!DOCTYPE html>\n<html lang=\"pt-br\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Minha turma</title>\n  <link rel=\"stylesheet\" href=\"estilo.css\">\n</head>\n<body>\n  <h1>Minha turma</h1>\n\n  <label for=\"nome\">Nome</label>\n  <input id=\"nome\">\n  <label for=\"nota\">Nota</label>\n  <input id=\"nota\" type=\"number\" min=\"0\" max=\"10\" step=\"0.1\">\n  <button id=\"cadastrar\" type=\"button\">Cadastrar</button>\n\n  <table>\n    <thead>\n      <tr><th>Nome</th><th>Nota</th><th>Situação</th></tr>\n    </thead>\n    <tbody id=\"tabela\"></tbody>\n  </table>\n\n  <button id=\"verJson\" type=\"button\">Ver o JSON</button>\n  <pre id=\"json\"></pre>\n\n  <script src=\"script.js\"></script>\n</body>\n</html>\n",
      "estilo.css": "body {\n  font-family: Arial, sans-serif;\n  max-width: 520px;\n  margin: 24px auto;\n  padding: 0 16px;\n  background: #f4f7f5;\n  color: #1d2b24;\n}\n\nh1 {\n  color: #2e7d5b;\n}\n\ninput {\n  padding: 8px;\n  width: 120px;\n}\n\nbutton {\n  padding: 8px 14px;\n  border: none;\n  border-radius: 6px;\n  background: #2e7d5b;\n  color: white;\n  cursor: pointer;\n}\n\ntable {\n  width: 100%;\n  margin-top: 16px;\n  border-collapse: collapse;\n}\n\nth,\ntd {\n  padding: 8px;\n  text-align: left;\n  border-bottom: 1px solid #d5e2da;\n}\n\n/* as cores de cada situação: o JavaScript só escolhe a classe */\n.aprovado {\n  color: #2e7d5b;\n}\n\n.reprovado {\n  color: #c22450;\n}\n\n/* o quadro onde aparece o JSON */\npre {\n  padding: 12px;\n  border-radius: 8px;\n  background: #1d2b24;\n  color: #c8f2dc;\n  font-size: 13px;\n  overflow-x: auto;\n}\n",
      "script.js": "const turma = [\n  { nome: \"Ana\", nota: 8.5 },\n  { nome: \"Bruno\", nota: 5 }\n];\n\nconst campoNome = document.querySelector(\"#nome\");\nconst campoNota = document.querySelector(\"#nota\");\nconst botao = document.querySelector(\"#cadastrar\");\nconst tabela = document.querySelector(\"#tabela\");\nconst botaoJson = document.querySelector(\"#verJson\");\nconst quadro = document.querySelector(\"#json\");\n\n// desenha a tabela inteira a partir da lista\nfunction mostrarTurma() {\n  tabela.innerHTML = \"\";\n  for (const aluno of turma) {\n    let situacao = \"reprovado\";\n    if (aluno.nota >= 6) {\n      situacao = \"aprovado\";\n    }\n    tabela.innerHTML +=\n      \"<tr class='\" + situacao + \"'>\" +\n      \"<td>\" + aluno.nome + \"</td>\" +\n      \"<td>\" + aluno.nota + \"</td>\" +\n      \"<td>\" + situacao + \"</td>\" +\n      \"</tr>\";\n  }\n}\n\n// clicou? monta um objeto novo e coloca na lista com push\nbotao.addEventListener(\"click\", function () {\n  const novo = {\n    nome: campoNome.value,\n    nota: Number(campoNota.value) // o campo devolve texto; Number() vira número\n  };\n  turma.push(novo);\n  campoNome.value = \"\";\n  campoNota.value = \"\";\n  mostrarTurma();\n});\n\n// JSON.stringify transforma a lista de objetos em TEXTO\n// (o null e o 2 só deixam o texto organizado, com recuo)\nbotaoJson.addEventListener(\"click\", function () {\n  quadro.textContent = JSON.stringify(turma, null, 2);\n});\n\nmostrarTurma();\n"
    }
  },
  "p4": {
    "titulo": "Passo 4: guardar no navegador",
    "altura": 380,
    "alturaEditor": 440,
    "mesmaOrigem": true,
    "arquivos": {
      "index.html": "<!DOCTYPE html>\n<html lang=\"pt-br\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Minha turma</title>\n  <link rel=\"stylesheet\" href=\"estilo.css\">\n</head>\n<body>\n  <h1>Minha turma</h1>\n\n  <label for=\"nome\">Nome</label>\n  <input id=\"nome\">\n  <label for=\"nota\">Nota</label>\n  <input id=\"nota\" type=\"number\" min=\"0\" max=\"10\" step=\"0.1\">\n  <button id=\"cadastrar\" type=\"button\">Cadastrar</button>\n  <button id=\"limpar\" type=\"button\" class=\"secundario\">Limpar turma</button>\n\n  <p id=\"contagem\" class=\"aviso\"></p>\n  <table>\n    <thead>\n      <tr><th>Nome</th><th>Nota</th><th>Situação</th></tr>\n    </thead>\n    <tbody id=\"tabela\"></tbody>\n  </table>\n\n  <script src=\"script.js\"></script>\n</body>\n</html>\n",
      "estilo.css": "body {\n  font-family: Arial, sans-serif;\n  max-width: 520px;\n  margin: 24px auto;\n  padding: 0 16px;\n  background: #f4f7f5;\n  color: #1d2b24;\n}\n\nh1 {\n  color: #2e7d5b;\n}\n\ninput {\n  padding: 8px;\n  width: 120px;\n}\n\nbutton {\n  padding: 8px 14px;\n  border: none;\n  border-radius: 6px;\n  background: #2e7d5b;\n  color: white;\n  cursor: pointer;\n}\n\ntable {\n  width: 100%;\n  margin-top: 16px;\n  border-collapse: collapse;\n}\n\nth,\ntd {\n  padding: 8px;\n  text-align: left;\n  border-bottom: 1px solid #d5e2da;\n}\n\n/* as cores de cada situação: o JavaScript só escolhe a classe */\n.aprovado {\n  color: #2e7d5b;\n}\n\n.reprovado {\n  color: #c22450;\n}\n\n.secundario {\n  background: #8a9a92;\n}\n\n.aviso {\n  color: #5c6b63;\n  font-size: 14px;\n}\n",
      "script.js": "// 1. ao abrir a página: lê a turma guardada no navegador\n//    getItem devolve TEXTO (ou null, se não tiver nada guardado)\n//    JSON.parse transforma o texto de volta em lista de objetos\nconst guardada = localStorage.getItem(\"minha-turma\");\nlet turma = [];\nif (guardada) {\n  turma = JSON.parse(guardada);\n}\n\nconst campoNome = document.querySelector(\"#nome\");\nconst campoNota = document.querySelector(\"#nota\");\nconst botao = document.querySelector(\"#cadastrar\");\nconst tabela = document.querySelector(\"#tabela\");\nconst botaoLimpar = document.querySelector(\"#limpar\");\nconst contagem = document.querySelector(\"#contagem\");\n\n// 2. guarda a lista no navegador, como texto JSON\nfunction salvar() {\n  localStorage.setItem(\"minha-turma\", JSON.stringify(turma));\n}\n\n// desenha a tabela inteira a partir da lista\nfunction mostrarTurma() {\n  contagem.textContent = turma.length + \" aluno(s) guardado(s) neste navegador.\";\n  tabela.innerHTML = \"\";\n  for (const aluno of turma) {\n    let situacao = \"reprovado\";\n    if (aluno.nota >= 6) {\n      situacao = \"aprovado\";\n    }\n    tabela.innerHTML +=\n      \"<tr class='\" + situacao + \"'>\" +\n      \"<td>\" + aluno.nome + \"</td>\" +\n      \"<td>\" + aluno.nota + \"</td>\" +\n      \"<td>\" + situacao + \"</td>\" +\n      \"</tr>\";\n  }\n}\n\n// clicou? monta um objeto novo e coloca na lista com push\nbotao.addEventListener(\"click\", function () {\n  const novo = {\n    nome: campoNome.value,\n    nota: Number(campoNota.value) // o campo devolve texto; Number() vira número\n  };\n  turma.push(novo);\n  salvar(); // guardou na lista? guarda no navegador também\n  campoNome.value = \"\";\n  campoNota.value = \"\";\n  mostrarTurma();\n});\n\n// esvazia a lista e o que estava guardado\nbotaoLimpar.addEventListener(\"click\", function () {\n  turma = [];\n  salvar();\n  mostrarTurma();\n});\n\nmostrarTurma();\n"
    }
  },
};

// monta um editor em cada <div id="projeto-pN"> da página
Object.keys(PASSOS_AULA_10).forEach((chave) => {
  const passo = PASSOS_AULA_10[chave];
  criarProjetoVS({
    idContainer: "projeto-" + chave,
    titulo: passo.titulo,
    pasta: "aula10",
    arquivos: passo.arquivos,
    abaInicial: "js",
    altura: passo.altura,
    alturaEditor: passo.alturaEditor,
    mesmaOrigem: passo.mesmaOrigem,
  });
});

/*
  aula-11-projetos.js: "O Cadastro ganha cara" da aula 11, em 6 passos, no editor com cara de VS Code.
  Usa criarProjetoVS() do curso/js/playground.js (carregue antes).
  versão 1 · 2026-10-16
*/

const PASSOS_AULA_11 = {
  "p1": {
    "titulo": "Passo 1: o JavaScript escreve na página",
    "altura": 170,
    "alturaEditor": 300,
    "mesmaOrigem": false,
    "aba": "js",
    "arquivos": {
      "index.html": "<!DOCTYPE html>\n<html lang=\"pt-br\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Cadastro de Alunos</title>\n  <link rel=\"stylesheet\" href=\"estilo.css\">\n</head>\n<body>\n  <h1 id=\"titulo\">Título provisório</h1>\n  <p id=\"mensagem\">Este texto ainda é do HTML.</p>\n\n  <!-- o script fica no fim do body: assim o HTML já existe quando ele roda -->\n  <script src=\"script.js\"></script>\n</body>\n</html>\n",
      "estilo.css": "body {\n  font-family: Arial, sans-serif;\n  max-width: 560px;\n  margin: 24px auto;\n  padding: 0 16px;\n  background: #f4f7f5;\n  color: #1d2b24;\n}\n\nh1 {\n  color: #2e7d5b;\n}\n",
      "script.js": "// 1. pega o título pelo id (sem o #)\nconst titulo = document.getElementById(\"titulo\");\n\n// 2. troca o texto do título\ntitulo.textContent = \"Cadastro de Alunos\";\n\n// 3. pega o parágrafo com querySelector (com o #, como no CSS)\nconst mensagem = document.querySelector(\"#mensagem\");\n\n// 4. troca o texto do parágrafo\nmensagem.textContent = \"Este texto foi escrito pelo JavaScript!\";\n"
    }
  },
  "p2": {
    "titulo": "Passo 2: a tabela vazia",
    "altura": 190,
    "alturaEditor": 360,
    "mesmaOrigem": false,
    "aba": "html",
    "arquivos": {
      "index.html": "<!DOCTYPE html>\n<html lang=\"pt-br\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Cadastro de Alunos</title>\n  <link rel=\"stylesheet\" href=\"estilo.css\">\n</head>\n<body>\n  <h1>Cadastro de Alunos</h1>\n  <p id=\"aviso\"></p>\n\n  <table>\n    <thead>\n      <tr>\n        <th>Nome</th>\n        <th>Média</th>\n        <th>Situação</th>\n      </tr>\n    </thead>\n    <!-- o tbody começa vazio: quem vai preencher é o JavaScript -->\n    <tbody id=\"tabela\"></tbody>\n  </table>\n\n  <script src=\"script.js\"></script>\n</body>\n</html>\n",
      "estilo.css": "body {\n  font-family: Arial, sans-serif;\n  max-width: 560px;\n  margin: 24px auto;\n  padding: 0 16px;\n  background: #f4f7f5;\n  color: #1d2b24;\n}\n\nh1 {\n  color: #2e7d5b;\n}\n\ntable {\n  width: 100%;\n  border-collapse: collapse;\n  background: white;\n}\n\nth,\ntd {\n  padding: 8px;\n  text-align: left;\n  border-bottom: 1px solid #d5e2da;\n}\n\nth {\n  background: #2e7d5b;\n  color: white;\n}\n",
      "script.js": "// pega a tabela (o tbody) e o parágrafo de aviso\nconst tabela = document.querySelector(\"#tabela\");\nconst aviso = document.querySelector(\"#aviso\");\n\n// querySelector achou? Então tabela não é null.\n// Vamos conferir escrevendo no aviso:\naviso.textContent = \"Achei a tabela! Ela tem \" + tabela.children.length + \" linhas.\";\n"
    }
  },
  "p3": {
    "titulo": "Passo 3: a primeira linha",
    "altura": 190,
    "alturaEditor": 400,
    "mesmaOrigem": false,
    "aba": "js",
    "arquivos": {
      "index.html": "<!DOCTYPE html>\n<html lang=\"pt-br\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Cadastro de Alunos</title>\n  <link rel=\"stylesheet\" href=\"estilo.css\">\n</head>\n<body>\n  <h1>Cadastro de Alunos</h1>\n  <p id=\"aviso\"></p>\n\n  <table>\n    <thead>\n      <tr>\n        <th>Nome</th>\n        <th>Média</th>\n        <th>Situação</th>\n      </tr>\n    </thead>\n    <!-- o tbody começa vazio: quem vai preencher é o JavaScript -->\n    <tbody id=\"tabela\"></tbody>\n  </table>\n\n  <script src=\"script.js\"></script>\n</body>\n</html>\n",
      "estilo.css": "body {\n  font-family: Arial, sans-serif;\n  max-width: 560px;\n  margin: 24px auto;\n  padding: 0 16px;\n  background: #f4f7f5;\n  color: #1d2b24;\n}\n\nh1 {\n  color: #2e7d5b;\n}\n\ntable {\n  width: 100%;\n  border-collapse: collapse;\n  background: white;\n}\n\nth,\ntd {\n  padding: 8px;\n  text-align: left;\n  border-bottom: 1px solid #d5e2da;\n}\n\nth {\n  background: #2e7d5b;\n  color: white;\n}\n",
      "script.js": "const tabela = document.querySelector(\"#tabela\");\n\n// 1. cria uma linha nova (ela ainda não aparece na página)\nconst linha = document.createElement(\"tr\");\n\n// 2. cria as três células\nconst celulaNome = document.createElement(\"td\");\nconst celulaMedia = document.createElement(\"td\");\nconst celulaSituacao = document.createElement(\"td\");\n\n// 3. escreve o texto de cada célula\ncelulaNome.textContent = \"Ana Souza\";\ncelulaMedia.textContent = 8.5;\ncelulaSituacao.textContent = \"aprovado\";\n\n// 4. coloca as células dentro da linha\nlinha.append(celulaNome, celulaMedia, celulaSituacao);\n\n// 5. coloca a linha dentro da tabela: agora ela aparece!\ntabela.append(linha);\n"
    }
  },
  "p4": {
    "titulo": "Passo 4: uma linha para cada aluno",
    "altura": 250,
    "alturaEditor": 440,
    "mesmaOrigem": false,
    "aba": "js",
    "arquivos": {
      "index.html": "<!DOCTYPE html>\n<html lang=\"pt-br\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Cadastro de Alunos</title>\n  <link rel=\"stylesheet\" href=\"estilo.css\">\n</head>\n<body>\n  <h1>Cadastro de Alunos</h1>\n  <p id=\"aviso\"></p>\n\n  <table>\n    <thead>\n      <tr>\n        <th>Nome</th>\n        <th>Média</th>\n        <th>Situação</th>\n      </tr>\n    </thead>\n    <!-- o tbody começa vazio: quem vai preencher é o JavaScript -->\n    <tbody id=\"tabela\"></tbody>\n  </table>\n\n  <script src=\"script.js\"></script>\n</body>\n</html>\n",
      "estilo.css": "body {\n  font-family: Arial, sans-serif;\n  max-width: 560px;\n  margin: 24px auto;\n  padding: 0 16px;\n  background: #f4f7f5;\n  color: #1d2b24;\n}\n\nh1 {\n  color: #2e7d5b;\n}\n\ntable {\n  width: 100%;\n  border-collapse: collapse;\n  background: white;\n}\n\nth,\ntd {\n  padding: 8px;\n  text-align: left;\n  border-bottom: 1px solid #d5e2da;\n}\n\nth {\n  background: #2e7d5b;\n  color: white;\n}\n",
      "script.js": "// a turma do Cadastro: uma lista de objetos\nconst turma = [\n  { nome: \"Ana Souza\", media: 8.5 },\n  { nome: \"Bruno Lima\", media: 5.2 },\n  { nome: \"Carla Dias\", media: 7 }\n];\n\nconst tabela = document.querySelector(\"#tabela\");\n\n// para cada aluno da lista, uma linha na tabela\nfor (const aluno of turma) {\n  const linha = document.createElement(\"tr\");\n\n  const celulaNome = document.createElement(\"td\");\n  celulaNome.textContent = aluno.nome;\n\n  const celulaMedia = document.createElement(\"td\");\n  celulaMedia.textContent = aluno.media;\n\n  const celulaSituacao = document.createElement(\"td\");\n  if (aluno.media >= 6) {\n    celulaSituacao.textContent = \"aprovado\";\n  } else {\n    celulaSituacao.textContent = \"reprovado\";\n  }\n\n  linha.append(celulaNome, celulaMedia, celulaSituacao);\n  tabela.append(linha);\n}\n"
    }
  },
  "p5": {
    "titulo": "Passo 5: aprovado em verde",
    "altura": 250,
    "alturaEditor": 440,
    "mesmaOrigem": false,
    "aba": "js",
    "arquivos": {
      "index.html": "<!DOCTYPE html>\n<html lang=\"pt-br\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Cadastro de Alunos</title>\n  <link rel=\"stylesheet\" href=\"estilo.css\">\n</head>\n<body>\n  <h1>Cadastro de Alunos</h1>\n  <p id=\"aviso\"></p>\n\n  <table>\n    <thead>\n      <tr>\n        <th>Nome</th>\n        <th>Média</th>\n        <th>Situação</th>\n      </tr>\n    </thead>\n    <!-- o tbody começa vazio: quem vai preencher é o JavaScript -->\n    <tbody id=\"tabela\"></tbody>\n  </table>\n\n  <script src=\"script.js\"></script>\n</body>\n</html>\n",
      "estilo.css": "body {\n  font-family: Arial, sans-serif;\n  max-width: 560px;\n  margin: 24px auto;\n  padding: 0 16px;\n  background: #f4f7f5;\n  color: #1d2b24;\n}\n\nh1 {\n  color: #2e7d5b;\n}\n\ntable {\n  width: 100%;\n  border-collapse: collapse;\n  background: white;\n}\n\nth,\ntd {\n  padding: 8px;\n  text-align: left;\n  border-bottom: 1px solid #d5e2da;\n}\n\nth {\n  background: #2e7d5b;\n  color: white;\n}\n\n/* as cores ficam aqui no CSS; o JavaScript só escolhe a classe */\n.aprovado {\n  background: #e3f4ea;\n  color: #1f6b47;\n}\n\n.reprovado {\n  background: #fbe4ea;\n  color: #a51d44;\n}\n",
      "script.js": "const turma = [\n  { nome: \"Ana Souza\", media: 8.5 },\n  { nome: \"Bruno Lima\", media: 5.2 },\n  { nome: \"Carla Dias\", media: 7 }\n];\n\nconst tabela = document.querySelector(\"#tabela\");\n\nfor (const aluno of turma) {\n  // decide a situação uma vez só, numa variável\n  let situacao = \"reprovado\";\n  if (aluno.media >= 6) {\n    situacao = \"aprovado\";\n  }\n\n  const linha = document.createElement(\"tr\");\n  // classList.add liga a classe do CSS: a linha ganha a cor\n  linha.classList.add(situacao);\n\n  const celulaNome = document.createElement(\"td\");\n  celulaNome.textContent = aluno.nome;\n\n  const celulaMedia = document.createElement(\"td\");\n  celulaMedia.textContent = aluno.media.toFixed(1);\n\n  const celulaSituacao = document.createElement(\"td\");\n  celulaSituacao.textContent = situacao;\n\n  linha.append(celulaNome, celulaMedia, celulaSituacao);\n  tabela.append(linha);\n}\n"
    }
  },
  "p6": {
    "titulo": "Passo 6: a versão final do Cadastro",
    "altura": 260,
    "alturaEditor": 480,
    "mesmaOrigem": false,
    "aba": "js",
    "arquivos": {
      "index.html": "<!DOCTYPE html>\n<html lang=\"pt-br\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Cadastro de Alunos</title>\n  <link rel=\"stylesheet\" href=\"estilo.css\">\n</head>\n<body>\n  <h1>Cadastro de Alunos</h1>\n  <p id=\"vazio\" class=\"vazio\" hidden>Nenhum aluno cadastrado.</p>\n\n  <table id=\"quadro\">\n    <thead>\n      <tr>\n        <th>Nome</th>\n        <th>Média</th>\n        <th>Situação</th>\n      </tr>\n    </thead>\n    <tbody id=\"tabela\"></tbody>\n  </table>\n\n  <script src=\"script.js\"></script>\n</body>\n</html>\n",
      "estilo.css": "body {\n  font-family: Arial, sans-serif;\n  max-width: 560px;\n  margin: 24px auto;\n  padding: 0 16px;\n  background: #f4f7f5;\n  color: #1d2b24;\n}\n\nh1 {\n  color: #2e7d5b;\n}\n\n/* desafio criativo: cantos arredondados e sombra na tabela */\ntable {\n  width: 100%;\n  border-collapse: collapse;\n  background: white;\n  border-radius: 10px;\n  overflow: hidden;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n\nth,\ntd {\n  padding: 10px;\n  text-align: left;\n  border-bottom: 1px solid #d5e2da;\n}\n\nth {\n  background: #2e7d5b;\n  color: white;\n}\n\n.aprovado {\n  background: #e3f4ea;\n  color: #1f6b47;\n}\n\n.reprovado {\n  background: #fbe4ea;\n  color: #a51d44;\n}\n\n/* a linha muda de cor quando o mouse passa por cima */\ntbody tr:hover {\n  filter: brightness(0.95);\n}\n\n.vazio {\n  padding: 16px;\n  border: 2px dashed #8a9a92;\n  border-radius: 10px;\n  text-align: center;\n  color: #5c6b63;\n}\n",
      "script.js": "const turma = [\n  { nome: \"Ana Souza\", media: 8.5 },\n  { nome: \"Bruno Lima\", media: 5.2 },\n  { nome: \"Carla Dias\", media: 7 }\n];\n\nconst tabela = document.querySelector(\"#tabela\");\nconst quadro = document.querySelector(\"#quadro\");\nconst vazio = document.querySelector(\"#vazio\");\n\n// cria uma célula com o texto: evita repetir as mesmas 2 linhas\nfunction criarCelula(texto) {\n  const celula = document.createElement(\"td\");\n  celula.textContent = texto;\n  return celula;\n}\n\n// desenha a tabela inteira a partir da lista\nfunction mostrarTurma(lista) {\n  // E se a turma ainda não tem alunos?\n  if (lista.length === 0) {\n    quadro.hidden = true; // esconde a tabela\n    vazio.hidden = false; // mostra o aviso\n    return;               // e para por aqui\n  }\n\n  quadro.hidden = false;\n  vazio.hidden = true;\n  tabela.textContent = \"\"; // apaga as linhas antigas antes de desenhar\n\n  for (const aluno of lista) {\n    let situacao = \"reprovado\";\n    if (aluno.media >= 6) {\n      situacao = \"aprovado\";\n    }\n\n    const linha = document.createElement(\"tr\");\n    linha.classList.add(situacao);\n    linha.append(\n      criarCelula(aluno.nome),\n      criarCelula(aluno.media.toFixed(1)),\n      criarCelula(situacao)\n    );\n    tabela.append(linha);\n  }\n}\n\nmostrarTurma(turma);\n"
    }
  },
};

// monta um editor em cada <div id="projeto-pN"> da página
Object.keys(PASSOS_AULA_11).forEach((chave) => {
  const passo = PASSOS_AULA_11[chave];
  criarProjetoVS({
    idContainer: "projeto-" + chave,
    titulo: passo.titulo,
    pasta: "aula11",
    arquivos: passo.arquivos,
    abaInicial: passo.aba,
    altura: passo.altura,
    alturaEditor: passo.alturaEditor,
    mesmaOrigem: passo.mesmaOrigem,
  });
});

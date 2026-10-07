/*
  aula-09-projetos.js: o projeto "Minha turma" da aula 9, em 5 passos, no editor com cara de VS Code.
  Usa criarProjetoVS() do curso/js/playground.js (carregue antes). versão 1 · 2026-10-07
*/

const PASSOS_AULA_09 = {
  "c1": {
    "titulo": "Passo 1: a lista e o tamanho dela",
    "altura": 170,
    "alturaEditor": 340,
    "abaInicial": "js",
    "arquivos": {
      "index.html": "<!DOCTYPE html>\n<html lang=\"pt-br\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Minha turma</title>\n  <link rel=\"stylesheet\" href=\"estilo.css\">\n</head>\n<body>\n  <h1>Minha turma</h1>\n  <p id=\"total\"></p>\n  <p id=\"primeiro\"></p>\n\n  <script src=\"script.js\"></script>\n</body>\n</html>\n",
      "estilo.css": "body {\n  font-family: Arial, sans-serif;\n  max-width: 480px;\n  margin: 24px auto;\n  padding: 0 16px;\n  background: #f4f7f5;\n  color: #1d2b24;\n}\n\nh1 {\n  color: #2e7d5b;\n}\n",
      "script.js": "// um array: a lista inteira numa variável só\nconst alunos = [\"Ana\", \"Bruno\", \"Carla\", \"Davi\", \"Eva\"];\n\n// os lugares da página onde vamos escrever\nconst total = document.querySelector(\"#total\");\nconst primeiro = document.querySelector(\"#primeiro\");\n\n// length: quantos itens a lista tem\ntotal.textContent = \"A turma tem \" + alunos.length + \" alunos.\";\n\n// [0]: o primeiro item (a contagem começa no zero!)\nprimeiro.textContent = \"Primeira da chamada: \" + alunos[0];\n"
    }
  },
  "c2": {
    "titulo": "Passo 2: um <li> para cada nome",
    "altura": 260,
    "alturaEditor": 340,
    "abaInicial": "js",
    "arquivos": {
      "index.html": "<!DOCTYPE html>\n<html lang=\"pt-br\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Minha turma</title>\n  <link rel=\"stylesheet\" href=\"estilo.css\">\n</head>\n<body>\n  <h1>Minha turma</h1>\n  <p id=\"total\"></p>\n  <ul id=\"lista\"></ul>\n\n  <script src=\"script.js\"></script>\n</body>\n</html>\n",
      "estilo.css": "body {\n  font-family: Arial, sans-serif;\n  max-width: 480px;\n  margin: 24px auto;\n  padding: 0 16px;\n  background: #f4f7f5;\n  color: #1d2b24;\n}\n\nh1 {\n  color: #2e7d5b;\n}\n\nli {\n  padding: 6px 0;\n  border-bottom: 1px solid #d5e2da;\n}\n",
      "script.js": "const alunos = [\"Ana\", \"Bruno\", \"Carla\", \"Davi\", \"Eva\"];\n\nconst total = document.querySelector(\"#total\");\nconst lista = document.querySelector(\"#lista\");\n\ntotal.textContent = \"A turma tem \" + alunos.length + \" alunos.\";\n\n// for...of: visita a lista item por item\n// a cada volta, \"aluno\" vale um nome\nfor (const aluno of alunos) {\n  lista.innerHTML += \"<li>\" + aluno + \"</li>\";\n}\n"
    }
  },
  "c3": {
    "titulo": "Passo 3: o botão que coloca na lista",
    "altura": 300,
    "alturaEditor": 340,
    "abaInicial": "js",
    "arquivos": {
      "index.html": "<!DOCTYPE html>\n<html lang=\"pt-br\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Minha turma</title>\n  <link rel=\"stylesheet\" href=\"estilo.css\">\n</head>\n<body>\n  <h1>Minha turma</h1>\n\n  <label for=\"nome\">Nome do aluno</label>\n  <input id=\"nome\">\n  <button id=\"adicionar\" type=\"button\">Adicionar</button>\n\n  <p id=\"total\"></p>\n  <ul id=\"lista\"></ul>\n\n  <script src=\"script.js\"></script>\n</body>\n</html>\n",
      "estilo.css": "body {\n  font-family: Arial, sans-serif;\n  max-width: 480px;\n  margin: 24px auto;\n  padding: 0 16px;\n  background: #f4f7f5;\n  color: #1d2b24;\n}\n\nh1 {\n  color: #2e7d5b;\n}\n\nli {\n  padding: 6px 0;\n  border-bottom: 1px solid #d5e2da;\n}\n\ninput {\n  padding: 8px;\n}\n\nbutton {\n  padding: 8px 14px;\n  border: none;\n  border-radius: 6px;\n  background: #2e7d5b;\n  color: white;\n  cursor: pointer;\n}\n",
      "script.js": "const alunos = [\"Ana\", \"Bruno\", \"Carla\"];\n\nconst campo = document.querySelector(\"#nome\");\nconst botao = document.querySelector(\"#adicionar\");\nconst total = document.querySelector(\"#total\");\nconst lista = document.querySelector(\"#lista\");\n\n// desenha a lista inteira na página\nfunction mostrarLista() {\n  lista.innerHTML = \"\"; // apaga o que tinha\n  for (const aluno of alunos) {\n    lista.innerHTML += \"<li>\" + aluno + \"</li>\";\n  }\n  total.textContent = \"A turma tem \" + alunos.length + \" alunos.\";\n}\n\n// clicou? push coloca o nome no fim da lista\nbotao.addEventListener(\"click\", function () {\n  alunos.push(campo.value);\n  campo.value = \"\";\n  mostrarLista();\n});\n\n// desenha a lista pela primeira vez\nmostrarLista();\n"
    }
  },
  "c4": {
    "titulo": "Passo 4: a ficha de um aluno",
    "altura": 230,
    "alturaEditor": 340,
    "abaInicial": "js",
    "arquivos": {
      "index.html": "<!DOCTYPE html>\n<html lang=\"pt-br\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Minha turma</title>\n  <link rel=\"stylesheet\" href=\"estilo.css\">\n</head>\n<body>\n  <h1>Minha turma</h1>\n  <div id=\"ficha\" class=\"cartao\"></div>\n\n  <script src=\"script.js\"></script>\n</body>\n</html>\n",
      "estilo.css": "body {\n  font-family: Arial, sans-serif;\n  max-width: 480px;\n  margin: 24px auto;\n  padding: 0 16px;\n  background: #f4f7f5;\n  color: #1d2b24;\n}\n\nh1 {\n  color: #2e7d5b;\n}\n\n.cartao {\n  padding: 16px;\n  border-radius: 10px;\n  background: white;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n\n.cartao h2 {\n  margin-top: 0;\n}\n",
      "script.js": "// um objeto: várias informações do MESMO aluno,\n// cada uma com um nome (a propriedade) e um valor\nconst aluno = {\n  nome: \"Ana Souza\",\n  turma: \"ADS 2B\",\n  nota: 8.5\n};\n\nconst ficha = document.querySelector(\"#ficha\");\n\n// objeto.propriedade pega uma informação\nficha.innerHTML =\n  \"<h2>\" + aluno.nome + \"</h2>\" +\n  \"<p>Turma: \" + aluno.turma + \"</p>\" +\n  \"<p>Nota: \" + aluno.nota + \"</p>\";\n"
    }
  },
  "c5": {
    "titulo": "Passo 5: a turma inteira numa tabela",
    "altura": 330,
    "alturaEditor": 400,
    "abaInicial": "js",
    "arquivos": {
      "index.html": "<!DOCTYPE html>\n<html lang=\"pt-br\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Minha turma</title>\n  <link rel=\"stylesheet\" href=\"estilo.css\">\n</head>\n<body>\n  <h1>Minha turma</h1>\n\n  <table>\n    <thead>\n      <tr><th>Nome</th><th>Nota</th><th>Situação</th></tr>\n    </thead>\n    <tbody id=\"tabela\"></tbody>\n  </table>\n\n  <p id=\"resumo\"></p>\n\n  <script src=\"script.js\"></script>\n</body>\n</html>\n",
      "estilo.css": "body {\n  font-family: Arial, sans-serif;\n  max-width: 480px;\n  margin: 24px auto;\n  padding: 0 16px;\n  background: #f4f7f5;\n  color: #1d2b24;\n}\n\nh1 {\n  color: #2e7d5b;\n}\n\ntable {\n  width: 100%;\n  border-collapse: collapse;\n}\n\nth,\ntd {\n  padding: 8px;\n  text-align: left;\n  border-bottom: 1px solid #d5e2da;\n}\n\n/* as cores de cada situação: o JavaScript só escolhe a classe */\n.aprovado {\n  color: #2e7d5b;\n}\n\n.reprovado {\n  color: #c22450;\n}\n",
      "script.js": "// uma lista de objetos: a turma inteira, cada aluno com nome e nota\nconst turma = [\n  { nome: \"Ana\", nota: 8.5 },\n  { nome: \"Bruno\", nota: 5 },\n  { nome: \"Carla\", nota: 9.2 },\n  { nome: \"Davi\", nota: 6 },\n  { nome: \"Eva\", nota: 4.5 }\n];\n\nconst tabela = document.querySelector(\"#tabela\");\nconst resumo = document.querySelector(\"#resumo\");\n\n// uma linha da tabela para cada aluno\nfor (const aluno of turma) {\n  // a classe escolhe a cor (as cores estão no estilo.css)\n  let situacao = \"reprovado\";\n  if (aluno.nota >= 6) {\n    situacao = \"aprovado\";\n  }\n  tabela.innerHTML +=\n    \"<tr class='\" + situacao + \"'>\" +\n    \"<td>\" + aluno.nome + \"</td>\" +\n    \"<td>\" + aluno.nota + \"</td>\" +\n    \"<td>\" + situacao + \"</td>\" +\n    \"</tr>\";\n}\n\n// filter: escolhe só quem passou\n// (aluno) => ... é a arrow function: o jeito curto de escrever uma função\nconst aprovados = turma.filter((aluno) => aluno.nota >= 6);\n\n// reduce: junta todas as notas numa soma só\nconst soma = turma.reduce((total, aluno) => total + aluno.nota, 0);\nconst media = soma / turma.length;\n\nresumo.textContent =\n  \"Média da turma: \" + media.toFixed(1) +\n  \" · Aprovados: \" + aprovados.length + \" de \" + turma.length;\n"
    }
  },
};

// monta um editor em cada <div id="projeto-cN"> da página
Object.keys(PASSOS_AULA_09).forEach((chave) => {
  const passo = PASSOS_AULA_09[chave];
  criarProjetoVS({
    idContainer: "projeto-" + chave,
    titulo: passo.titulo,
    pasta: "aula09",
    arquivos: passo.arquivos,
    abaInicial: passo.abaInicial,
    altura: passo.altura,
    alturaEditor: passo.alturaEditor,
  });
});

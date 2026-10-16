/*
  aula-13-projetos.js: o painel da coordenação da aula 13, em JavaScript puro e com Vue, no editor com cara de VS Code.
  Usa criarProjetoVS() do curso/js/playground.js (carregue antes).
  versão 1 · 2026-10-16
*/

const PASSOS_AULA_13 = {
  "p1": {
    "titulo": "Passo 1: o painel em JavaScript puro",
    "altura": 360,
    "alturaEditor": 440,
    "mesmaOrigem": false,
    "aba": "js",
    "arquivos": {
      "index.html": "<!DOCTYPE html>\n<html lang=\"pt-br\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Painel da coordenação</title>\n  <link rel=\"stylesheet\" href=\"estilo.css\">\n</head>\n<body>\n  <h1>Painel da coordenação</h1>\n\n  <div class=\"painel\">\n    <p class=\"total aprovado\"><strong id=\"aprovados\">0</strong> aprovados</p>\n    <p class=\"total reprovado\"><strong id=\"reprovados\">0</strong> reprovados</p>\n  </div>\n\n  <form id=\"form-nota\">\n    <input name=\"nome\" placeholder=\"Nome\">\n    <input name=\"nota\" type=\"number\" placeholder=\"Nota\">\n    <button type=\"submit\">Lançar nota</button>\n  </form>\n\n  <ul id=\"lista\"></ul>\n\n  <script src=\"script.js\"></script>\n</body>\n</html>\n",
      "estilo.css": "body {\n  font-family: Arial, sans-serif;\n  max-width: 560px;\n  margin: 24px auto;\n  padding: 0 16px;\n  background: #f4f7f5;\n  color: #1d2b24;\n}\n\nh1 {\n  color: #2e7d5b;\n}\n\n.painel {\n  display: flex;\n  gap: 12px;\n  margin-bottom: 16px;\n}\n\n.total {\n  flex: 1;\n  padding: 14px;\n  border-radius: 10px;\n  background: white;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  text-align: center;\n}\n\n.total strong {\n  display: block;\n  font-size: 32px;\n}\n\n.total.aprovado strong {\n  color: #1f6b47;\n}\n\n.total.reprovado strong {\n  color: #a51d44;\n}\n\nform {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  margin-bottom: 12px;\n}\n\ninput {\n  padding: 8px;\n  border: 2px solid #c5d6cc;\n  border-radius: 6px;\n  font-size: 15px;\n}\n\nbutton {\n  padding: 8px 14px;\n  border: none;\n  border-radius: 6px;\n  background: #2e7d5b;\n  color: white;\n  font-size: 15px;\n  cursor: pointer;\n}\n\nul {\n  padding-left: 20px;\n}\n\n.aprovado {\n  color: #1f6b47;\n}\n\n.reprovado {\n  color: #a51d44;\n}\n",
      "script.js": "// JavaScript puro: VOCÊ cuida de cada pedaço da página\nconst turma = [\n  { nome: \"Ana\", media: 8.5 },\n  { nome: \"Bruno\", media: 5.2 }\n];\n\nconst aprovados = document.querySelector(\"#aprovados\");\nconst reprovados = document.querySelector(\"#reprovados\");\nconst lista = document.querySelector(\"#lista\");\nconst form = document.querySelector(\"#form-nota\");\n\n// toda vez que a turma mudar, alguém tem que chamar esta função\nfunction atualizarPainel() {\n  const quantosAprovados = turma.filter((aluno) => aluno.media >= 6).length;\n  aprovados.textContent = quantosAprovados;\n  reprovados.textContent = turma.length - quantosAprovados;\n\n  lista.textContent = \"\";\n  for (const aluno of turma) {\n    const item = document.createElement(\"li\");\n    item.textContent = aluno.nome + \": \" + aluno.media;\n    item.classList.add(aluno.media >= 6 ? \"aprovado\" : \"reprovado\");\n    lista.append(item);\n  }\n}\n\nform.addEventListener(\"submit\", (event) => {\n  event.preventDefault();\n  turma.push({ nome: form.nome.value, media: Number(form.nota.value) });\n  form.reset();\n  atualizarPainel(); // esqueceu esta linha? O painel não muda!\n});\n\natualizarPainel();\n"
    }
  },
  "p2": {
    "titulo": "Passo 2: o mesmo painel com Vue",
    "altura": 360,
    "alturaEditor": 440,
    "mesmaOrigem": false,
    "aba": "html",
    "arquivos": {
      "index.html": "<!DOCTYPE html>\n<html lang=\"pt-br\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Painel da coordenação</title>\n  <link rel=\"stylesheet\" href=\"estilo.css\">\n</head>\n<body>\n  <!-- tudo dentro do #app é controlado pelo Vue -->\n  <div id=\"app\">\n    <h1>Painel da coordenação</h1>\n\n    <div class=\"painel\">\n      <!-- {{ }} mostra o valor e se atualiza sozinho -->\n      <p class=\"total aprovado\"><strong>{{ aprovados }}</strong> aprovados</p>\n      <p class=\"total reprovado\"><strong>{{ turma.length - aprovados }}</strong> reprovados</p>\n    </div>\n\n    <!-- @submit.prevent: o submit com o preventDefault() já embutido -->\n    <form @submit.prevent=\"lancar\">\n      <!-- v-model liga o campo à variável: digitou, mudou -->\n      <input v-model=\"nome\" placeholder=\"Nome\">\n      <input v-model.number=\"nota\" type=\"number\" placeholder=\"Nota\">\n      <button type=\"submit\">Lançar nota</button>\n    </form>\n\n    <ul>\n      <!-- v-for: um <li> para cada aluno da turma -->\n      <li v-for=\"aluno in turma\" :class=\"aluno.media >= 6 ? 'aprovado' : 'reprovado'\">\n        {{ aluno.nome }}: {{ aluno.media }}\n      </li>\n    </ul>\n  </div>\n\n  <!-- o Vue, direto da internet (CDN): sem instalar nada -->\n  <script src=\"https://unpkg.com/vue@3.5.13/dist/vue.global.prod.js\"></script>\n  <script src=\"script.js\"></script>\n</body>\n</html>\n",
      "estilo.css": "body {\n  font-family: Arial, sans-serif;\n  max-width: 560px;\n  margin: 24px auto;\n  padding: 0 16px;\n  background: #f4f7f5;\n  color: #1d2b24;\n}\n\nh1 {\n  color: #2e7d5b;\n}\n\n.painel {\n  display: flex;\n  gap: 12px;\n  margin-bottom: 16px;\n}\n\n.total {\n  flex: 1;\n  padding: 14px;\n  border-radius: 10px;\n  background: white;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  text-align: center;\n}\n\n.total strong {\n  display: block;\n  font-size: 32px;\n}\n\n.total.aprovado strong {\n  color: #1f6b47;\n}\n\n.total.reprovado strong {\n  color: #a51d44;\n}\n\nform {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  margin-bottom: 12px;\n}\n\ninput {\n  padding: 8px;\n  border: 2px solid #c5d6cc;\n  border-radius: 6px;\n  font-size: 15px;\n}\n\nbutton {\n  padding: 8px 14px;\n  border: none;\n  border-radius: 6px;\n  background: #2e7d5b;\n  color: white;\n  font-size: 15px;\n  cursor: pointer;\n}\n\nul {\n  padding-left: 20px;\n}\n\n.aprovado {\n  color: #1f6b47;\n}\n\n.reprovado {\n  color: #a51d44;\n}\n",
      "script.js": "// Vue: você cuida dos DADOS, e o Vue cuida da página\nconst { createApp } = Vue;\n\ncreateApp({\n  // os dados do painel\n  data() {\n    return {\n      turma: [\n        { nome: \"Ana\", media: 8.5 },\n        { nome: \"Bruno\", media: 5.2 }\n      ],\n      nome: \"\",\n      nota: \"\"\n    };\n  },\n\n  // valores calculados: o Vue refaz a conta quando a turma muda\n  computed: {\n    aprovados() {\n      return this.turma.filter((aluno) => aluno.media >= 6).length;\n    }\n  },\n\n  // o que acontece quando o formulário é enviado\n  methods: {\n    lancar() {\n      this.turma.push({ nome: this.nome, media: this.nota });\n      this.nome = \"\";\n      this.nota = \"\";\n      // nenhum atualizarPainel(): o Vue redesenha sozinho\n    }\n  }\n}).mount(\"#app\");\n"
    }
  },
};

// monta um editor em cada <div id="projeto-pN"> da página
Object.keys(PASSOS_AULA_13).forEach((chave) => {
  const passo = PASSOS_AULA_13[chave];
  criarProjetoVS({
    idContainer: "projeto-" + chave,
    titulo: passo.titulo,
    pasta: "aula13",
    arquivos: passo.arquivos,
    abaInicial: passo.aba,
    altura: passo.altura,
    alturaEditor: passo.alturaEditor,
    mesmaOrigem: passo.mesmaOrigem,
  });
});

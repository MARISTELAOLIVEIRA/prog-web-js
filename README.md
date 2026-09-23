<p align="center">
  <img src="img/EstrelaLogo.png" alt="Logo do curso" width="110" />
</p>

<h1 align="center">Curso Interativo de HTML, CSS e JavaScript</h1>

<p align="center">
  <strong>Tema visual cyberpunk</strong> · verde neon · chuva de zeros e uns animada 🟢⚡
</p>

<p align="center">
  <img alt="Módulos" src="https://img.shields.io/badge/módulos-8-39ff14?style=flat-square&labelColor=050807" />
  <img alt="Tecnologias" src="https://img.shields.io/badge/tecnologias-HTML%20%7C%20CSS%20%7C%20JS-00ff9d?style=flat-square&labelColor=050807" />
  <img alt="Servidor" src="https://img.shields.io/badge/servidor-não%20necessário-39e6ff?style=flat-square&labelColor=050807" />
  <img alt="Licença" src="https://img.shields.io/badge/uso-educacional-ff2e63?style=flat-square&labelColor=050807" />
</p>

---

Curso feito para acompanhar (e simplificar!) o conteúdo do **NetAcad JavaScript Essentials 1**, pensado para a
disciplina de **Programação Web 1**. Nada de slides estáticos: cada módulo tem teoria direta ao ponto, um editor
de código que roda de verdade no navegador, exercícios com correção automática e quiz de fixação — tudo isso
com um fundo neon animado estilo Matrix. 😎

## ✨ Destaques

- 🖥️ **Editor de código ao vivo** — o aluno escreve e executa JavaScript de verdade, isolado em um `<iframe>`
  sandbox, sem risco para a página.
- 🧪 **Exercícios com correção automática** — o aluno completa uma função, clica em "Verificar" e recebe
  feedback instantâneo, teste por teste.
- 🖱️ **Playgrounds de DOM/Formulários** — uma mini página HTML de verdade dentro do próprio módulo, para clicar
  em botões e ver o resultado na hora.
- ❓ **Quiz de múltipla escolha** em cada módulo, com correção visual (verde = certo, magenta = errado).
- 💾 **Progresso salvo no navegador** — o botão "Marcar módulo como concluído" atualiza a barra de progresso da
  página inicial via `localStorage`.
- ⚡ **Fundo animado estilo Matrix** — colunas de zeros e uns caindo pela tela, em `<canvas>` puro (sem bibliotecas
  externas). Dá para ajustar tamanho, velocidade e opacidade no início de [js/circuito-fundo.js](js/circuito-fundo.js).

## 🧩 Módulos

| # | Módulo | O que você aprende |
|---|--------|---------------------|
| 1 | [Variáveis, Tipos e Operadores](modulos/01-variaveis/index.html) | `let`/`const`, tipos de dados, operadores aritméticos, lógicos e de comparação |
| 2 | [Estruturas Condicionais](modulos/02-condicionais/index.html) | `if`/`else`, `switch`, operador ternário |
| 3 | [Laços de Repetição](modulos/03-lacos/index.html) | `for`, `while`, `do...while`, `break`/`continue` |
| 4 | [Funções](modulos/04-funcoes/index.html) | funções tradicionais, arrow functions, parâmetros, retorno, escopo |
| 5 | [Arrays e Objetos](modulos/05-arrays-objetos/index.html) | listas, `push`/`pop`, objetos, arrays de objetos |
| 6 | [DOM e Eventos](modulos/06-dom-eventos/index.html) | `querySelector`, `addEventListener`, `classList` |
| 7 | [Formulários e Validação](modulos/07-formularios/index.html) | `preventDefault`, leitura de `<input>`, validação de dados |
| 8 | [Debugging e Boas Práticas](modulos/08-debug-boas-praticas/index.html) | leitura de erros, `console.log` estratégico, boas práticas de código |

## ▶️ Como usar

1. Baixe/clone esta pasta.
2. Abra o [index.html](index.html) direto no navegador — **não precisa de servidor nem instalação**.
3. *(Opcional, recomendado)* use a extensão **Live Server** do VS Code para uma experiência ainda mais estável
   com o progresso salvo entre páginas.

## 🗂️ Estrutura do projeto

```
CursoJavascript/
├── index.html                  # página inicial (lista de módulos + progresso geral)
├── css/
│   └── style.css               # tema visual (cores, fontes, componentes)
├── js/
│   ├── playground.js           # editor de código ao vivo + exercícios com correção automática
│   ├── quiz.js                 # motor dos quizzes de múltipla escolha
│   ├── progress.js             # progresso do aluno (localStorage)
│   └── circuito-fundo.js       # fundo animado estilo Matrix (zeros e uns caindo)
├── img/
│   ├── EstrelaLogo.png         # logo do curso
│   └── memoji.png              # avatar exibido no cabeçalho
└── modulos/
    ├── 01-variaveis/index.html
    ├── 02-condicionais/index.html
    ├── 03-lacos/index.html
    ├── 04-funcoes/index.html
    ├── 05-arrays-objetos/index.html
    ├── 06-dom-eventos/index.html
    ├── 07-formularios/index.html
    └── 08-debug-boas-praticas/index.html
```

## 🎨 Personalizando

- **Teoria/texto de um módulo:** edite o HTML dentro da respectiva pasta em `modulos/`.
- **Perguntas do quiz:** procure `criarQuiz("quiz-moduloX", [...])` no final do arquivo do módulo.
- **Exercícios com correção automática:** procure `criarExercicio({...})` e ajuste enunciado, código inicial e testes.
- **Cores/tema:** as variáveis estão todas no topo do [css/style.css](css/style.css) (`:root { ... }`).
- **Novo módulo:** copie a estrutura de uma pasta existente, adicione o link em `index.html` (lista
  `DADOS_MODULOS`) e em `js/progress.js` (lista `MODULOS_DO_CURSO`).

---

<p align="center">
  Criado para a disciplina de <strong>Programação Web 1</strong> · HTML, CSS e JavaScript<br />
  <strong>Profª Maristela</strong>
</p>

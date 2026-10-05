// Banco de questões do Quiz de Revisão · 1º Bimestre (módulos 1, 2 e 3).
//
// Como editar:
// - "respostas": a PRIMEIRA é sempre a correta. O quiz embaralha as alternativas sozinho a cada tentativa.
// - Use crases (`assim`) para destacar código no meio do texto.
// - "codigo" (opcional): um trecho de código mostrado abaixo do enunciado.
// - "explicacao": o feedback mostrado ao aluno depois que ele responde.

const QUESTOES_REVISAO = [
  // ---------- Módulo 1 · Variáveis, tipos e operadores ----------
  {
    modulo: 1,
    enunciado: "Qual palavra-chave cria uma variável cujo valor não pode ser reatribuído depois?",
    respostas: ["`const`", "`let`", "`var`", "`function`"],
    explicacao: "`const` cria uma constante: se você tentar trocar o valor depois, o JavaScript gera um erro. Já `let` (e o antigo `var`) permitem reatribuir.",
  },
  {
    modulo: 1,
    enunciado: "Qual é o resultado de `typeof 3.14`?",
    respostas: ["\"number\"", "\"decimal\"", "\"float\"", "\"string\""],
    explicacao: "No JavaScript, números inteiros e decimais são do mesmo tipo: `number`.",
  },
  {
    modulo: 1,
    enunciado: "Qual destes valores é do tipo `boolean`?",
    respostas: ["`true`", "`\"true\"`", "`1`", "`null`"],
    explicacao: "Um boolean só pode ser `true` ou `false`, sem aspas. `\"true\"` entre aspas é uma string e `1` é um number.",
  },
  {
    modulo: 1,
    enunciado: "Qual é o resultado de `10 % 3`?",
    respostas: ["`1`", "`3`", "`0`", "`3.33`"],
    explicacao: "O operador `%` devolve o resto da divisão. 10 dividido por 3 dá 3 e sobra 1.",
  },
  {
    modulo: 1,
    enunciado: "Qual é o resultado de `\"10\" === 10`?",
    respostas: ["`false`", "`true`", "`undefined`", "Dá erro"],
    explicacao: "O `===` compara valor e tipo. `\"10\"` é string e `10` é number, então o resultado é `false`. Com `==` seria `true`, por isso o recomendado é usar `===`.",
  },
  {
    modulo: 1,
    enunciado: "O que aparece no console ao executar este código?",
    codigo: "let nome = \"Ana\";\nconsole.log(`Olá, ${nome}!`);",
    respostas: ["Olá, Ana!", "Olá, ${nome}!", "Olá, nome!", "Dá erro"],
    explicacao: "Dentro de crases (template literal), `${...}` é trocado pelo valor da variável. Por isso aparece `Olá, Ana!`.",
  },
  {
    modulo: 1,
    enunciado: "O que aparece no console ao executar este código?",
    codigo: "let idade = 20;\nconsole.log(idade >= 18 && idade < 65);",
    respostas: ["`true`", "`false`", "`20`", "`undefined`"],
    explicacao: "O `&&` (E) só é verdadeiro se os dois lados forem verdadeiros. 20 >= 18 é verdadeiro e 20 < 65 também, então o resultado é `true`.",
  },
  {
    modulo: 1,
    enunciado: "O que aparece no console ao executar este código?",
    codigo: "console.log(\"5\" + 2);",
    respostas: ["52", "7", "5 + 2", "Dá erro"],
    explicacao: "Quando um dos lados do `+` é texto, o JavaScript concatena (junta) em vez de somar. O resultado é o texto `52`.",
  },
  {
    modulo: 1,
    enunciado: "O que faz a instrução `x += 1`?",
    respostas: [
      "Soma 1 ao valor de `x` (o mesmo que `x = x + 1`)",
      "Guarda o valor 1 em `x`",
      "Compara se `x` é igual a 1",
      "Diminui 1 do valor de `x`",
    ],
    explicacao: "`+=` é um operador de atribuição combinado: soma o valor à direita ao que já está em `x` e guarda o resultado.",
  },

  // ---------- Módulo 2 · Estruturas condicionais ----------
  {
    modulo: 2,
    enunciado: "O que aparece no console ao executar este código?",
    codigo: "let idade = 16;\nif (idade >= 18) {\n  console.log(\"Maior de idade\");\n} else {\n  console.log(\"Menor de idade\");\n}",
    respostas: ["Menor de idade", "Maior de idade", "Os dois textos", "Nada aparece"],
    explicacao: "A condição `16 >= 18` é falsa, então o bloco do `if` é ignorado e o bloco do `else` é executado.",
  },
  {
    modulo: 2,
    enunciado: "O que aparece no console ao executar este código?",
    codigo: "let nota = 7.5;\nif (nota >= 9) {\n  console.log(\"Conceito A\");\n} else if (nota >= 7) {\n  console.log(\"Conceito B\");\n} else {\n  console.log(\"Conceito C\");\n}",
    respostas: ["Conceito B", "Conceito A", "Conceito C", "Conceito A e Conceito B"],
    explicacao: "`7.5 >= 9` é falso, mas `7.5 >= 7` é verdadeiro. Então o JavaScript executa esse bloco e ignora o resto.",
  },
  {
    modulo: 2,
    enunciado: "O que aparece no console ao executar este código?",
    codigo: "let nota = 9;\nif (nota >= 5) {\n  console.log(\"C\");\n} else if (nota >= 9) {\n  console.log(\"A\");\n}",
    respostas: ["C", "A", "C e depois A", "Nada aparece"],
    explicacao: "O JavaScript testa as condições na ordem e para na primeira que for verdadeira. Como `9 >= 5` é verdadeiro, mostra `C` e ignora o resto. Por isso a ordem dos `else if` importa: as condições mais restritas devem vir primeiro.",
  },
  {
    modulo: 2,
    enunciado: "O que aparece no console ao executar este código?",
    codigo: "let n = 1;\nswitch (n) {\n  case 1:\n    console.log(\"um\");\n  case 2:\n    console.log(\"dois\");\n    break;\n  default:\n    console.log(\"outro\");\n}",
    respostas: ["um e depois dois", "Somente um", "Somente dois", "um, dois e outro"],
    explicacao: "O `case 1` não tem `break`, então o código \"cai\" para o próximo `case` (isso se chama fall-through) e mostra `dois`. O `break` do `case 2` interrompe o `switch` antes do `default`.",
  },
  {
    modulo: 2,
    enunciado: "O que aparece no console ao executar este código?",
    codigo: "let idade = 20;\nlet status = idade >= 18 ? \"adulto\" : \"menor de idade\";\nconsole.log(status);",
    respostas: ["adulto", "menor de idade", "true", "20"],
    explicacao: "O operador ternário `condição ? valorSeVerdadeiro : valorSeFalso` escolhe o primeiro valor quando a condição é verdadeira. Como `20 >= 18` é verdadeiro, `status` recebe `\"adulto\"`.",
  },
  {
    modulo: 2,
    enunciado: "Para entrar na montanha-russa, a pessoa precisa ter altura maior ou igual a 1.50 E estar acompanhada. Qual condição representa isso?",
    respostas: [
      "`altura >= 1.50 && acompanhada`",
      "`altura >= 1.50 || acompanhada`",
      "`altura >= 1.50 = acompanhada`",
      "`altura > 1.50 && !acompanhada`",
    ],
    explicacao: "O `&&` (E) exige que as duas condições sejam verdadeiras. O `||` (OU) aceitaria só uma delas, e um único `=` é atribuição, não comparação.",
  },

  // ---------- Módulo 3 · Laços de repetição ----------
  {
    modulo: 3,
    enunciado: "O que aparece no console ao executar este código?",
    codigo: "for (let i = 1; i <= 3; i++) {\n  console.log(i);\n}",
    respostas: ["1, 2 e 3", "1 e 2", "0, 1, 2 e 3", "1, 2, 3 e 4"],
    explicacao: "O `for` começa com `i = 1`, repete enquanto `i <= 3` e soma 1 a cada volta. Então `i` vale 1, 2 e 3, e para quando chega a 4.",
  },
  {
    modulo: 3,
    enunciado: "Quantas vezes o bloco do `while` é executado neste código?",
    codigo: "let energia = 100;\nwhile (energia > 0) {\n  energia -= 25;\n}",
    respostas: ["4 vezes", "3 vezes", "5 vezes", "Infinitas vezes"],
    explicacao: "A energia vai de 100 para 75, 50, 25 e 0. São 4 voltas. Quando chega a 0, a condição `energia > 0` fica falsa e o laço termina.",
  },
  {
    modulo: 3,
    enunciado: "Quantas vezes aparece \"oi\" no console?",
    codigo: "let n = 10;\ndo {\n  console.log(\"oi\");\n  n++;\n} while (n < 5);",
    respostas: ["1 vez", "Nenhuma vez", "5 vezes", "Infinitas vezes"],
    explicacao: "O `do...while` executa o bloco primeiro e só depois testa a condição. Por isso o \"oi\" aparece uma vez, mesmo com `n < 5` sendo falso desde o começo.",
  },
  {
    modulo: 3,
    enunciado: "O que aparece no console ao executar este código?",
    codigo: "for (let i = 1; i <= 5; i++) {\n  if (i === 3) {\n    continue;\n  }\n  console.log(i);\n}",
    respostas: ["1, 2, 4 e 5", "1, 2, 3, 4 e 5", "1 e 2", "4 e 5"],
    explicacao: "O `continue` pula para a próxima repetição sem executar o resto do bloco, então o 3 não é mostrado. Já o `break` interromperia o laço inteiro (aí só apareceriam 1 e 2).",
  },
  {
    modulo: 3,
    enunciado: "O que acontece ao executar este código?",
    codigo: "let x = 1;\nwhile (x <= 3) {\n  console.log(x);\n}",
    respostas: [
      "Loop infinito: mostra 1 sem parar",
      "Mostra 1, 2 e 3",
      "Mostra só o 1 e para",
      "Dá erro antes de executar",
    ],
    explicacao: "O valor de `x` nunca muda dentro do laço, então `x <= 3` fica sempre verdadeiro e o laço nunca termina. Faltou algo como `x++` dentro do bloco.",
  },
];

const MODULOS_REVISAO = {
  1: "Módulo 1 · Variáveis, tipos e operadores",
  2: "Módulo 2 · Estruturas condicionais",
  3: "Módulo 3 · Laços de repetição",
};

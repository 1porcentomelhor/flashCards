## 📸 Preview

<img src=".img/flashcards.png" width="450">

📌 Sobre o projeto

Este projeto foi criado para ajudar nos estudos usando um sistema simples inspirado em spaced repetition. A cada flashcard respondido, o usuário escolhe um dos botões:

🔴 Difícil

🟡 Bom

🟢 Fácil

Cada clique é registrado no histórico diário. Assim, você consegue acompanhar como está seu desempenho ao longo do tempo.

O projeto funciona 100% no navegador, sem back‑end. Os dados ficam gravados no localStorage do browser.

✨ Funcionalidades

✔️ Contadores para cada tipo de resposta (difícil, bom e fácil)

✔️ Registro diário de respostas em um histórico agrupado por dia

✔️ Histórico permanece salvo mesmo ao atualizar a página (via localStorage)

✔️ Botão para visualizar histórico formatado por dia

✔️ Botão para limpar o histórico completo

✔️ Layout simples e funcional

🧠 Como o histórico funciona

Cada registro salvo contém:

{
  dia: "dd/mm/aaaa",
  tipo: "hard | good | easy"
}

Quando o histórico é exibido, os registros são agrupados por dia, resultando em algo como:

10/01/2026
 Difícil: 3
 Bom: 5
 Fácil: 2
💾 Armazenamento no navegador

Os dados são salvos com localStorage.setItem() e recuperados com localStorage.getItem().

Caso queira zerar tudo, basta clicar no botão Limpar histórico.

🚀 Como executar

Baixe os arquivos do projeto

Abra o arquivo index.html em qualquer navegador moderno

Comece a usar 🎉

Não é necessário instalar nada.

📂 Estrutura básica do projeto
/
├── index.html
├── script.js
└── style.css   (opcional)
🛠 Tecnologias utilizadas

HTML5

CSS3

JavaScript (puro)

🔮 Melhorias futuras (ideias!)

✨ Adicionar níveis de repetição automática

✨ Exportar histórico em arquivo

✨ Tema escuro

✨ Gráfico de desempenho

🤝 Contribuições

Sinta‑se à vontade para sugerir melhorias e evoluir o projeto 😄

📜 Licença

Você pode usar este projeto livremente para estudo.

💚 Bons estudos e boa prática!

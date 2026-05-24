# Frontend LangApp:
- O app foi concebido como um caderno online de vocabulário para estudantes de idiomas (sendo inglês o foco inicial), combinando palavras básicas¹ pré-definidas com outras adicionadas pelo próprio usuário.
- Tecnicamente, trata-se de um sistema de CRUD que disponibliza algumas palavras da língua inglesa e permite ao usuário inserir as suas próprias. Conta com sistema de cadastro e login com nome de usuário, senha e email (que pode ser validado através de código enviado). A senha também pode ser recuperada através do email cadastrado e validado. Posssivelmente, esse app é a versão embrionário do futuro projeto de conclusão de curso.

## Descrição:
- Essa é a versão inicial do frontend do LangApp, um projeto acadêmico/educacional de nível iniciante focado na fixação e prática de conceitos básicos da stack listada abaixo. Durante seu desenvolvimento, foram consultados documentações oficiais, tutoriais e ferramentas de inteligência artificial. As implementações, no entanto, foram adaptadas as necessidades específicas do projeto.

## Preview:
### Landpage
### Login
### SignUp
### Settings
### AddWord
### WordCard
  
## Tecnologias utilizadas:
- React (com Javascript puro) para construção das páginas e roteamento.
- React Bootstrap para formatação de componentes.
- Zod e React Hook Form para validação de formulários.
- Redux Toolkit para gerenciamento de estado.

## Features
- Landpage pública básica.
- Telas de login, cadastro, recuperação de senha e validação de email.
- Mensagens de erro e de carregamento.
- Formulário de adição de palavras com campos dinâmicos.
- Possibilidade de filtrar as palavras nas listas tanto em português como em inglês.
- Exigência da senha para ações críticas (como alteração ou deleção da conta).

## Melhorias planejadas:
- Opção de categorizar e visualizar palavras por área ("viagens", "comidas", "esportes"), ao invés de classe gramatical somente.
- Adição de aba introduzindo o usuário ao uso do Alfabeto Fonético Internacional. 
- Criação de aba de favoritos.
- Criação e integração com extensão para navegador que permita ao estudante a adção de novas palavras de forma mais prática.
- Recurso de exportação de listas de palavras personalizadas em formato .csv, compatível com plataformas amplamente utilizadas de flashcards, como Anki e Quizlet.

## Importante
- Eu estou ciente de que diversas melhorias e refatorações são possíveis em alguns componentes (principalmente nos modais usados no Settings.jsx).
- Por ser um projeto de nível iniciante, é esperado que existem problemas de desempenho e mesmo lógicos em certas partes, especialmente relacionados 

# Notas
- ¹A lista das "palavras básicas" referidas acima vem desse post, que ficou relativamente conhecido no meio de aprendizado de idiomas algum tempo atrás: https://www.reddit.com/r/languagelearning/comments/hy2hmt/625_words_to_learn_in_your_target_language

# WebApp: PROFFY 

A aplicação, realizada na NextLevelWeek pela Rocketseat, permite que o usuário se cadastre como professor ou faça uma busca no banco de dados por um professor que atenda seus requisitos.

## Objetivo da aplicação

Facilitar a vida de professores, que realizam aulas particulares, através de uma plataforma online em que o aluno realiza a busca por um conteúdo específico. Ao informar o conteúdo desejado, a plataforma irá filtrar no banco de dados e mostrar o valor da hora/aula e os dias dísponiveis dos professores que derem match. O aluno terá a sua disposição o número para contato do professor para realizar a aula que deseja.

### Como executar a aplicação

Depois de baixar/clonar o repositório, entre no diretório principal e digite

`npm install`

para instalar os pacotes JavaScript utilizados pela aplicação.

Para iniciar o desenvolvimento digite

`npm run dev`

A partir de então a aplicação estará disponível na porta 5500, definida no arquivo **server.js**. Para acessar, use o navegador e digite o endereço `https://localhost:5500`.

### Em produção

Depois que o código da aplicação está pronto é preciso gerar as versões otimizadas dos arquivos. Para gerar a versão em produção dessa aplicação, no diretório principal digite

`npm run build`

#### Executando a aplicação em produção

Para executar a aplicação em modo produção entre no diretório principal e digite

`node build/app.js`

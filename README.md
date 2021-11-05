<p align="center">
    <img src="https://user-images.githubusercontent.com/62573072/140557803-c7b8615e-6574-48f4-aae8-208db0566832.png"/>)</p>


<h1 align="center">
    🚀Configurando o ambiente local para o desenvolvimento do site🚀
</h1>
 
### 🛠 Features
- [x] Baixar e Instalar Git

- Para baixar e instalar o Git, acesse o site [Git](https://git-scm.com/downloads). Selecione o instalador referente ao seu sistema operacional:<br />

<p align="center">
    <img src="https://user-images.githubusercontent.com/62573072/140518031-752fed0d-5a49-4983-a58d-36b57b6900ae.png"/>)</p>

Com isso, o Git deve ter sido instalado em sua máquina. Você pode testar, clicando com o botão direito em qualquer lugar da área de trabalho e vendo se a opção Gui Bash Here e Git GUI Here aparecem ou não.

Ao clicar na opção Gui Bash Here um terminal será aberto, faremos uso dele nas configurações adiantes.<br />
<p align="center">
    <img src="(https://user-images.githubusercontent.com/62573072/140558024-35ccd14d-9860-49cf-b6be-cb4b1901453b.png/>)</p>
              
<p align="center">
    <img src="https://user-images.githubusercontent.com/62573072/140558140-77c44175-f0b1-4cf8-bf9a-268d6a484e13.png"/>)</p>


- [x] Baixar e Instalar Node.js  

- Para baixar e instalar o Node.js, acesse o site [Node](https://nodejs.org/en/download/). Selecione o instalador da versão LTS (a versão LTS é a mais estável) referente ao seu sistema operacional:
                                                                                                                    
<p align="center">
    <img src="https://user-images.githubusercontent.com/62573072/140558648-9dbb2441-3fbd-4228-a2c5-3dcfb9e7d317.png"/>)</p>

Após realizar a instalação, teste se as variáveis de ambientes do Node estão configuradas corretamente. Em seu desktop, clique com o botão direito e então abra o terminal do Git selecionando a opção Git Bash Here (como visto anteriormente na instalação do Git). Com o terminal aberto, digite o comando:

```shell script
node -v
```
Após isso, aguarde a instalação do NPX ser concluída. Quando a instalação é concluída, a seguinte mensagem aparecerá no terminal.

Configurando seu GitHub 

Se o Node.js tiver sido instalado corretamente e as variáveis de ambiente já tiverem sido configuradas automaticamente pelo instalador, então o terminal irá informar a versão atual do Node.js instalado em sua máquina. Com isso você já pode ir para a próxima etapa deste documento.
                                                                                                                    
<p align="center">
    <img src="https://user-images.githubusercontent.com/62573072/140560424-e70ebcbc-6b8a-443f-ac6a-aba9b66a9539.png"/>)</p>


- [x] Instalar NPX

Abra o terminal Git (em qualquer local de sua escolha, por exemplo, em seu desktop) e então digite o comando:

```shell script
npm install -g npx
```

- [x] Configurando seu GitHub 

Para realizar o controle de versionamento do repositório no GitHub é necessário configurá-lo para aceitar os comandos de versionamento local.

Inicie o Git Bash e então digite o seguinte comando:

```shell script
ssh-keygen -t rsa -C "seuEmail@email.com"
```
<p>* Lembre de mudar a string entre aspas para o seu email>
                                         
<p align="center">
    <img src="https://user-images.githubusercontent.com/62573072/140561128-3d2228e8-2c52-4757-9c97-1597285422b4.png"/>)</p>
                                         
Ele irá apresentar três mensagens. A primeira é para definir algum arquivo específico para salvar a SSH key gerada, apenas pressione ENTER. Note que então, ele irá salvar a SSH Key gerada no local: C:\Usuários\SeuNomeDeUsuario\.ssh\id_rsa

<p align="center">
    <img src="https://user-images.githubusercontent.com/62573072/140561292-31acf61e-335c-4540-9821-99907725cff1.png"/>)</p>
    
A segunda mensagem é pedindo uma senha. Se você não quiser ter de ficar digitando uma senha toda vez que fizer um envio do repositório local para o repositório online no GitHub, então apenas pressione ENTER novamente. A terceira mensagem é pedindo para confirmar a senha digitada anteriormente, se você não definiu nenhuma senha e apenas pressionou ENTER anteriormente, então apenas pressione ENTER novamente.
                                                                                                                    
<p align="center">
    <img src="https://user-images.githubusercontent.com/62573072/140561375-3cf4da9d-8807-4ce0-88a3-1761f13ee6c9.png"/>)</p>

Após esse processo a chave SSH terá sido gerada no endereço especificado anteriormente ( C:\Usuários\SeuNomeDeUsuario\.ssh\id_rsa )
Acesse a página de configurações do seu perfil do GitHub (https://github.com/settings/profile), em seguida acesse a aba SSH and GPG keys.
                                                                                                                    
<p align="center">
    <img src="https://user-images.githubusercontent.com/62573072/140561521-61e18e75-cfdb-456f-aa78-dc17de24d9a4.png"/>)</p>

Na tela de SSH and GPG keys você deverá clicar em New SSH key na qual irá abrir uma nova tela para inserir um Title (nome de livre escolha á SSH key) e a própria Key. A SSH key que você irá inserir, foi a gerada anteriormente pelo Git Bash, ela então, provavelmente se encontrará no seguinte diretório: 

C:\Usuários\SeuNomeDeUsuario\.ssh\id_rsa

Neste diretório abra o arquivo do tipo .pub com o bloco de notas, copie todo seu conteúdo e então cole no campo Key, após isso clique em Add SSH key e então a chave deve aparecer registrada na aba SSH and GPG keys.
<p align="center">
    <img src="https://user-images.githubusercontent.com/62573072/140561620-8c0e99fd-71e2-498f-9ef8-70ff3d873b92.png"/>)</p>
<p align="center">
    <img src="https://user-images.githubusercontent.com/62573072/140561657-cfeaa656-0862-44e3-8bc1-c18968574a7d.png"/>)</p>
<p align="center">
    <img src="https://user-images.githubusercontent.com/62573072/140561781-43cdd943-4fd0-41f5-845e-ed97792f7d7f.png"/>)</p>
                                                                                                                   
- [x] Clonando o projeto e finalizando as configurações

Após ter realizado todos os passos anteriores, clone o projeto do site (abrindo o Git Bash em algum local de fácil acesso - como por exemplo no Desktop) digitando o seguinte comando:
    
```shell script
git clone https://github.com/competdev/compet_site.git
```
 
Nisso, uma nova pasta com o nome de compet_site terá sido criada no local em que você abriu o Git Bash. Após isso, entre na pasta compet_site, abra um Git Bash dentro dela e então instale o React Dom do Next utilizando o seguinte comando:

```shell script
npm install next react-dom
```

Após isso você precisará apenas baixar o arquivo referente a variável de ambiente do banco de dados e então, colocar esse arquivo baixado dentro da pasta compet_site. 
Para obter acesso ao arquivo mande um email para o coordenador do projeto: julio.1009@hotmail.com

Por último, dentro da pasta compet_site você irá precisar instalar as bibliotecas necessárias para rodar o projeto (novamente, abrindo o Git Bash dentro da pasta compet_site), que até o momento são:

```shell script
npm install @material-ui/core
```
    
```shell script
npm install @material-ui/lab
```
    
```shell script
npm install @material-ui/icons 
```

Você agora pode então, iniciar o projeto, abrindo o Git Bash dentro da pasta compet_site e digitando:
    
```shell script
npm run dev
```

O projeto então estará rodando no seguinte link: http://localhost:3000

<h1 align="center">
    <img alt="logo" title="logo" src="https://i.imgur.com/0sy4Fxc.png" width="300"/>
</h1>

# Dá carona
- WebApp
- React + Firebase

Muitas pessoas dependem de carona para ir para o trabalho, faculdade ou eventos, e este webapp vem para simplificar o processo de oferecer/pedir carona.

Através de uma interface simples os destinos são criados, os caroneiros e os interessados em caronas se registram e combinam facilmente suas idas e vindas.

# Primeira versão  (03/11 - 10/11)

O usuário poderá criar sua conta (usando seu numero de celular) e verá quais eventos existem, que são para os quais as pessoas darão carona.

## Criar conta
- Ao acessar o webapp, solicitar que crie a conta usando a autenticação por telefone do firebase
- Após confirmar o telefone, informar nome completo, e avançar
- Salvar nome e telefone do usuário em `/users/{uid}/name` e `/users/{uid}/phone`
- Assim que conseguir confirmar a conta, ir para a tela inicial
- Ao fechar o webapp e abrir novamente, se já tiver conta ir para tela inicial, senão, para tela de registro

## Tela inicial - eventos
- Na tela inicial listar os eventos futuros, o mais próximo no alto
- Se não houver eventos, apresentar "Sem eventos futuros"
- Ter um botão "Criar evento", que irá apresentar o formulário
- Preencher Título, Data, Hora e Local. Exemplo: "MBA FGV", "4 de Novembro", "13:30", "FGV Passos". Salvar e voltar para a tela inicial, onde o novo evento aparecerá na lista

## Entregavel
- Ser web app, instalável
- Usar apenas firebase para dados, usar firestore
- Publicar online (vercel, heroku, firebase hosting)
- Criar um repositório privado e me convidar nele (tiagogouvea)

# Segunda versão (18/11 - 24/11)

Nesta segunda versão o usuário poderá o oferecer carona em eventos, e os usuários poderão ver as caronas oferecidas.

## Detalhe do evento
- Ao clicar em um evento, ir para rota do evento, apresentando o Título, data e hora, e local
- Logo abaixo ter duas abas "Dar carona" e "Pedir carona"

## Oferecer carona
- Ao visualizar um evento, ter um botão "Oferecer carona", que abrirá um form
- Informar veículo, Carro, Moto, Van, Micro-ônibus, Ônibus
- Informar quantas vagas tem para carona, já trazendo o máximo preenchido (carro no máximo 4, moto 1, van 20, micro-onibus 20, ônibus 60)
- Informar "Saindo as" com campo de texto livre, uma linha
- Informar "Saindo de" com campo de texto livre, uma linha
- Informar "Passando por" com campo de texto livre, uma linha
- Informar "Contribuição pela carona", com campo em texto livre, onde a pessoa poderá digitar um valor qualquer, caso queira

## Salvar dados do usuário
- Assim que o usuário informar o veículo, salvar no firebase qual seu veículo em `/users/{uid}/vehicle` com um dos valores : `car`, `motorcycle`, `van`, `minibus` ou `bus`. 
- Salvar também o número de vagas que ele informou ter.
- Ao ir novamente em oferecer carona, se ele já tiver um veículo salvo no firebase, já vir este veículo selecionado na view com o número de vagas também da última vez.

## Visualizar caronas disponíveis
- Ao acessar um evento, se tiverem pessoas oferecendo carona, apresentar cada carona em um card, com um ícone indicando se é carro, moto, etc. Apresentar também a hora da saída e a contribuição caso tenha, e quantas vagas tem
- Ao clicar nesta oferta de carona, nesta própria view exibir de onde sairá, por onde irá passar, se a pessoa tiver informado

Nesta view, nas próximas versões, a pessoa irá pedir carona.

## Good to have

- Ao clicar em um botão de enviar, entrar, coisa assim, desabilitar o botão enquanto a ação acontece, para evitar do usuário clicar várias vezes, e apresentar algo indicando que está carregando
- Ao fazer, testar sempre no formato mobile (pelo devtools) para garantir que ficou bom de usar pelo celular

# Terceira versão (última)

Chegou a hora do usuário poder pedir sua carona, e ter sua carona confirmada.

**Pedindo carona:**

Ao acessar os detalhes de um evento, ao ver ofertas de carona e tiver uma vaga sobrando, poder clicar em "pedir carona". 

O usuário não poderá ver os outros que pediram carona, nem saber que outros pediram.

Ao ter seu pedido de carona aceito, exibir na view de detalhe da carona um botão "Falar com caroneiro" que abre o whatsapp com o telefone do caroneiro, usando `https://api.whatsapp.com/send?phone=5532988735683&text=Obrigado%20pela%20carona!`.

**Oferecendo carona:**

Se a carona for do próprio usuário (ele oferecendo), não tem porque ele ter como pedir carona (pra ele mesmo).

Ao abrir a carona que ofereceu, vê os nomes das pessoas que pediram carona e tem um botão "aceitar" em cada pessoa, um ícone de telefone com link para `tel:32988735683` do telefone da pessoa, e um ícone de whatsapp com link para `https://api.whatsapp.com/send?phone=5532988735683&text=Sobre%20seu%20pedido%20de%20carona.`

Ao aceitar a carona, o registro do pedido de carona daquele usuário fica marcado como confirmada, e o número de vagas na carona diminui.

Ao aceitar o máximo de caronas que cabe no carro, não deixar mais aceitar caronas.

- Pedir carona para um evento
- Enviar notificações

## Notificações

As pessoas precisam saber que o que está acontecendo.

Para enviar notificações, você precisará pedir permissão para o usuário de receber notificações, obter o token no navegador do usuário, enviar esse token para o firestore e salvar no objeto `user` lá. Este token é o "endereço" de notificações dele.

Se o usuário não der permissão para receber as notificações, ele não terá como usar o app. Então não saia da página de pedido permissão enquanto ele não der.

Uma forma de testar o envio das notifações entre usuário é usar dois navegadores (chrome/firefox por exemplo), um com um usuário oferecendo caronas, e outro com um usuário pedindo caronas.

Você pode fazer o envio usando cloud function (mais difícil, não recomendo), ou apenas obter o token do usuário para o qual deseja enviar (pelo front), e enviar.

**Dono da carona recebe notificações quando:**
- Quando alguém pede carona

**Quem pede carona recebe notificações quando:**
- Quando sua carona é confirmada
- Quando todas as caronas de um carro forem aceitas, e o usuário não foi aceito, receber "Carro cheio"

👉 Todas notificações vão com link para página de detalhe da carona em questão.

## Algo mais

- Em cada carona oferecida, vir o nome da pessoa que está oferecendo

# Próximas versões

- Ao oferecer carona, ter a placa/cor/modelo do automóvel
- Pedir carona para o evento, sem escolher uma pessoa específica
- Ter como a pessoa cancelar a carona oferecida, e também cancelar pedido de carona
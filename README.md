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
- Ao acessar um evento, se tiverem pessoas oferecendo carona, apresentar cada carona em um card, com um ícone indicando sem é carro, moto, etc. Apresentar também a hora da saída e a contribuição caso tenha, e quantas vagas tem
- Ao clicar nesta oferta de carona, nesta própria view exibir de onde sairá, por onde irá passar, se a pessoa tiver informado

Nesta view, nas próximas versões, a pessoa irá pedir carona.

## Good to have

- Ao clicar em um botão de enviar, entrar, coisa assim, desabilitar o botão enquanto a ação acontece, para evitar do usuário clicar várias vezes, e apresentar algo indicando que está carregando
- Ao fazer, testar sempre no formato mobile (pelo devtools) para garantir que ficou bom de usar pelo celular
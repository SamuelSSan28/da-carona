<h1 align="center">
    <img alt="logo" title="logo" src="https://i.imgur.com/0sy4Fxc.png" width="300"/>
</h1>

# Dá carona
- WebApp
- React + Firebase

Muitas pessoas dependem de carona para ir para o trabalho, faculdade ou eventos, e este webapp vem para simplificar o processo de oferecer/pedir carona.

Através de uma interface simples os destinos são criados, os caroneiros e os interessados em caronas se registram e combinam facilmente suas idas e vindas.

# Primeira versão

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

# Próximas versões
- Oferecer carona para um evento
- Pedir carona para um evento
- Confirmar carona para um evento
- Enviar notificações

# Segunda versão
- Ao clicar em um evento, ir para rota do evento, apresentando Título, data e hora, e local
- Logo abaixo ter duas abas "Dar carona" e "Pedir carona"
Ler   Criar  Atualizar     Apagar
GET / POST / PATCH / PUT / DELETE / HEAD / OPTIONS / CONNECT / TRACE

/auth/login         POST        autenticar usuário      Aberta

/user/              POST        Criar usuário           Aberta
/user/me            PATCH       Atualizar usuário       JWT
/user/me            DELETE      Apagar usuário          JWT
/user/me            GET         Ver dados do usuário    JWT
/user/me/password   PATCH       Atualizar senha         JWT

/post/              GET         Ver todos os posts      Aberta
/post/:slug         GET         Ver um post             Aberta
/post/me            GET         Posts de um usuário     JWT
/post/me            POST        Criar post              JWT
/post/me/:uuid      GET         Post de um usuário      JWT
/post/me/:uuid      PATCH       Atualizar um post       JWT
/post/me/:uuid      DELETE      Apagar um post          JWT

/upload              POST        Enviar imagem           JWT
/uploads/img.jpg     GET/NGINX   Ver imagem              Aberta
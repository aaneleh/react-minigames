# React Minigames  
![Badge last-commit](https://img.shields.io/github/last-commit/aaneleh/react-minigames)
![wakatime](https://wakatime.com/badge/user/63a62ebf-02b8-40ab-b01b-99f672dace05/project/8a882fc3-e5a0-439d-ac07-9b545e01a0b5.svg)
[![Badge twitter](https://img.shields.io/twitter/follow/helena_kurzzz)](https://twitter.com/helena_kurzzz)


## Indice

* [Características](#características)
* [Linguagens](#linguagens)
* [Demonstração](#demonstração)
* [Descrição](#descrição)

## Características

- Mudança de páginas com Router e Links
- Sem carregamento entre páginas
- Modo escuro e claro
- Jogo da velha
- Forca
- Combine 3
- Termo


## Linguagens

- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"  width="20px" height="auto" /> **React**
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg"  width="20px" height="auto" /> **Tailwind**


## Demonstração

[https://react-minigames.vercel.app/](https://react-minigames.vercel.app/)
  
[![Thumbnail do vídeo](https://img.youtube.com/vi/3GWXBo5eqM4/0.jpg)](https://youtu.be/3GWXBo5eqM4)

## Descrição

Site com React com 4 minigames: Jogo da velha, forca, combine 3 e termo.  
A página 'Main' contém o header — com a sidebar e o botão para alterar entre o modo escuro e claro — o corpo que mudará usando o React Router com Links e o footer.  
O corpo da página está contido em uma div com uma classe de 'light' ou 'dark', quando o botão do modo for clicado o useState dessa classe mudará de valor e as classes do tailwind usarão seu respectivo modo.  
  
Jogo da velha: os cliques colocaram um caracter 'X' ou 'O' alternadamente, a simbolo que formar uma linha, coluna ou diagonal ganha e o jogo acaba. O jogo também pode acabar quando os todos os espaços forem preenchidos.  
Forca: se a letra clicada uma função verificará se essa palavra já está no tabuleiro, se não estiver procura ela na palavra e se ela existir coloca ela no tabuleiro. O jogo acaba quando todos os espaços do tabuleiro estiverem preenchidos ou quando houver mais de 6 erros.  
Combine 3: A cada 250ms checa o tabuleiro por combinações de 3 ou espaços vazios. Quando o usuário interage com o tabuleiro, uma função armazena qual peça — usando seu index — está sendo movida, outra armazena para onde ela está sendo movida e uma terceira verifica se esse movimento está em uma distância aceitável e formará uma combinação.  
Termo: Chute uma palavra de 5 letras e se ela estiver na lista de palavra compara ela com a palavra certa deixando os caracteres que estão na posição correta verdes, os que existem na palavra mas estão em outra posição e cinzas os que não existem na palavra. Se todos os caracteres ficarem verdes o jogador vence, se forem feitas 6 tentativas sem sucesso o jogador perde.
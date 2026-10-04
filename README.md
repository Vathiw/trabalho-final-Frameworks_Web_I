# Pokédex React

Aplicação web desenvolvida como **Trabalho Final de Frameworks Web I (Unilavras)**. Permite explorar os Pokémon com busca em tempo real, filtros combináveis (tipo e geração), paginação e página de detalhes com status, habilidades e medidas.

**API utilizada:** [PokéAPI](https://pokeapi.co/)

## Integrantes

Matheus Carvalho Silva

## Tecnologias

React 18 · Vite · Material-UI (MUI) · react-router-dom · axios · Hooks (`useState`, `useEffect`, `useMemo`)

## Funcionalidades

- Listagem com paginação (20 por página)
- Busca por nome em tempo real, combinada com filtros de tipo e geração
- Página de detalhes em rota dinâmica `/pokemon/:id`
- Indicadores de carregamento e mensagens de erro amigáveis (com botão "Tentar de novo")
- Layout responsivo

## Estrutura

```
src/
  components/  Header, PokemonCard, Filters, Feedback
  pages/       Home, Details
  services/    api.js (axios + chamadas à PokéAPI)
```

## Como executar

Pré-requisito: Node.js 18+.

```bash
git clone https://github.com/SEU-USUARIO/trabalho-final-Frameworks_Web_I.git
cd trabalho-final-Frameworks_Web_I
npm install
npm run dev
```

Acesse o endereço exibido no terminal (geralmente http://localhost:5173).

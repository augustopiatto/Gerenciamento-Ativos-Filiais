# Gerenciamento de Ativos das Filiais

## Visão Geral do Projeto

Este é um projeto que usa React, Typescript, Vite e AntDesign. É uma stack de desenvolvimento web moderna que é rápida e eficiente para construir aplicativos web escaláveis.

## Preview

O projeto traz as informações da [API](https://github.com/tractian/fake-api) para visualização dessas informações pelo usuário.

### Telas

#### Home

![image](https://github.com/augustopiatto/Tractian-ProcessoSeletivo/assets/77405968/07f6ebff-547b-48c7-9047-456be73c7fbf)

#### Não encontrada

![image](https://github.com/augustopiatto/Tractian-ProcessoSeletivo/assets/77405968/5c0fd69e-62fa-4d6e-ac4e-befa722f1228)

## Começando

Para iniciar o projeto, siga os passos abaixo:

- Clone o repositório em sua máquina local
- Execute `npm install` para instalar as dependências do projeto (utilizado node v20.1.0 e npm v9.6.6)
- Execute `npm run dev` para iniciar o servidor de desenvolvimento
- Abra seu navegador e acesse `http://localhost:5173/` para ver a aplicação funcionando

## Estrutura de pasta

```
├── dist                   # Arquivos compilados
├── public                 # Assets públicos
├── src                    # Código fonte
│   ├── api                # API (nesse caso mock da API)
│   ├── assets             # Assets estáticos
│   │   ├── styles         # Estilos gerais
│   ├── commons            # Códigos reutilizáveis
│   ├── components         # Componentes reutilizáveis
|   |   ├── tests          # Testes unitários dos componentes usando Vitest
│   ├── contexts           # Separação de contexts
│   ├── pages              # Componentes de página
│   ├── App.vue            # Componente raiz
│   └── main.ts            # Entry point
├── tsconfig.json          # Configuração do TypeScript
├── package.json           # Dependências e scripts
├── vite.config.ts         # Configuração do Vite
└── README.md              # Documentação do projeto
```

## Tecnologias e Funcionalidades

### Tecnologias

O projeto inclui as seguintes tecnologias:

- React para reatividade.
- Typescript para segurança de tipo e escalabilidade.
- Vite para desenvolvimento e construção rápidos e eficientes
- Highcharts como biblioteca de gráficos.
- Ant Design como biblioteca para UI.
- Axios para chamadas HTTP.
- React router DOM para Client Side Routing.

### Funcionalidades

O projeto possui as seguintes funcionalidades:

- Hooks
- React Router
- useContext
- Componentes Funcionais
- Eventos

## Scripts

O projeto inclui os seguintes scripts:

- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run build`: Builda o aplicativo pronto para produção
- `npm run lint`: Linta e corrige os arquivos
- `npm run deploy`: Cria acesso via GitHub Pages - `https://augustopiatto.github.io/Tractian-ProcessoSeletivo/`

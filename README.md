# FitTrack — Entrega 2 (Desenvolvimento Móvel)

**Grupo:** Anderson Silva, Gabriel Magro e Victor Hugo Daguis  
**Tema acadêmico:** aplicativo de apoio camuflado em uma fachada de academia.  
**Estado deste pacote:** primeira versão navegável, com dados simulados em memória. A execução/teste em aparelho ou emulador ainda deve ser feita pelo grupo.

## O que já está implementado

- Fachada de academia com início, treino destacado, progresso e histórico demonstrativo.
- Navegação por abas (Início, Treinos, Exercícios e Histórico).
- Gatilho secreto: manter pressionado o botão **INICIAR TREINO** por aproximadamente 3 segundos abre a área de apoio.
- Área de apoio em Drawer: central de apoio, contatos de confiança, ocorrências, pontos de apoio, SOS e sobre o projeto.
- Navegação por Stack entre a fachada e a área de apoio.
- Dados demonstrativos em estado React, sem API ou banco de dados.
- CRUD local demonstrativo de treinos, exercícios, contatos e ocorrências: criar, listar, editar e excluir enquanto a aplicação está aberta.
- Relacionamento local entre exercícios e treinos por `workoutId`.
- Saída rápida para retornar à fachada.
- Canais 180 e 190 visíveis e aviso de que o app é um protótipo acadêmico.
- Arquivo `USO_IA.md` inicializado para registrar o apoio de IA.

## Como executar

> Use a pasta `FitTrack_Entrega2` deste pacote. **Não use a pasta `__MACOSX`** que aparece em alguns ZIPs: ela contém metadados do macOS, e não os arquivos-fonte do aplicativo.

1. Instale uma versão atual do Node.js compatível com o Expo SDK do projeto.
2. Extraia este ZIP para uma pasta normal do computador.
3. Abra um terminal dentro da pasta `FitTrack_Entrega2`.
4. Instale as dependências:

   ```bash
   npm install
   npx expo install --fix
   ```

5. Inicie o Expo:

   ```bash
   npx expo start
   ```

6. Abra pelo Expo Go em um celular compatível ou execute no emulador. O terminal exibirá um QR Code e os atalhos disponíveis.

Se aparecer algum aviso de dependências, rode `npx expo-doctor` e siga a sugestão de compatibilidade do SDK.

## Como demonstrar o disfarce

1. Abra o app: a primeira tela é o FitTrack, com aparência de aplicativo de academia.
2. Toque normalmente em **INICIAR TREINO** para abrir a lista de treinos.
3. Volte ao início e mantenha **INICIAR TREINO** pressionado por cerca de 3 segundos.
4. O aplicativo abre a Central de Apoio.
5. Demonstre as telas do Drawer e o cadastro/edição/exclusão dos dados fictícios.
6. Use **SAÍDA RÁPIDA** para retornar à fachada.

## Limites desta etapa

- Os dados são mockados e ficam somente em memória; podem voltar ao estado inicial ao recarregar o aplicativo.
- Ainda não há API, autenticação real, banco de dados, envio de SOS ou painel de atendimento integrado. A integração com API é uma etapa posterior.
- O botão “Simular acionamento” **não envia um alerta real**. Os botões de 180/190 tentam abrir o discador do aparelho.
- Os contatos e registros iniciais são fictícios. Não insiram dados reais de vítimas.

## Organização

```text
FitTrack_Entrega2/
├── App.js
├── app.json
├── package.json
├── USO_IA.md
└── src/
    ├── components/UI.js
    ├── context/AppContext.js
    ├── data/initialData.js
    ├── navigation/AppNavigator.js
    └── screens/
        ├── FitnessScreens.js
        └── SupportScreens.js
```

## Checklist da Entrega 2

- [ ] Instalar dependências e abrir no Expo sem erros.
- [ ] Testar todas as abas e itens do menu lateral.
- [ ] Testar o long-press e a saída rápida em celular/emulador.
- [ ] Cada integrante revisar o arquivo, entender e testar as telas/código sob sua responsabilidade.
- [ ] Atualizar `USO_IA.md` com as ferramentas/prompts usados e a revisão real feita pelo grupo.
- [ ] Fazer commits individuais e descritivos no repositório GitHub.
- [ ] Mover cards no Kanban para refletir o estado real (não marcar tarefa não testada como concluída).
- [ ] Não anexar a pasta `node_modules` ao GitHub.

## Responsabilidades inicialmente planejadas

- **Anderson Silva:** Treinos.
- **Gabriel Magro:** Exercícios e relacionamento com Treinos.
- **Victor Hugo Daguis:** Contatos de confiança.

A divisão acima retoma o planejamento inicial. O grupo deve ajustar a atribuição conforme a contribuição efetivamente realizada por cada integrante e manter commits individuais.

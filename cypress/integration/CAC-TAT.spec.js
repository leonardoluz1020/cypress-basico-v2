// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('Cebtral de Atendimento ao Cliente TAT', function () {
    const THREE_SECONDS_IN_MS = 3000;
    beforeEach(() => {
        cy.visit('./src/index.html');
    })
    it('Verificar o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
    })
    it('preenche os campos obrigatórios e envia o formulário', () => {
        const testLong = 'Precisamos aprender Cypress URGENTE para entrarmos na area de analista de teste automatizado Precisamos aprender Cypress URGENTE para entrarmos na area de analista de teste automatizado Precisamos aprender Cypress URGENTE para entrarmos na area de analista de teste automatizado Precisamos aprender Cypress URGENTE para entrarmos na area de analista de teste automatizado'; // variavel com texto

        cy.clock(); // congelando o tempo do clock

        cy.get('#firstName').type('Leonardo').should('have.value', 'Leonardo');
        cy.get('#lastName').type('Luz').should('have.value', 'Luz');
        cy.get('#email').type('leonardoluz10@hotmail.com').should('have.value', 'leonardoluz10@hotmail.com');
        cy.get('#phone').type('11975267492').should('have.value', '11975267492');
        cy.get('#open-text-area').should('be.visible').type(testLong, { delay: 0 }); // usando um objeto delay para digitar textos longos
        cy.contains('button', 'Enviar').click();

        cy.get('.success').should('be.visible'); // usando a classe .success
        cy.tick(THREE_SECONDS_IN_MS); // o uso do tick serve para que podemos retirar os segundos de espera do tempo
        cy.get('.success').should('not.be.visible') // verificando se a mensagem saiu após 3seg

    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {

        cy.clock(); // congelando o tempo do clock

        cy.get('#firstName').type('Leonardo');
        cy.get('#lastName').type('Luz');
        cy.get('#email').type('leonardoluz10.hotmail.com');
        cy.get('#phone').type('11975267492');
        cy.get('#open-text-area').type('teste');
        cy.contains('button', 'Enviar').click();

        cy.get('.error').should('be.visible'); // usando a classe .error
        cy.tick(THREE_SECONDS_IN_MS);// o uso do tick serve para que podemos retirar os segundos de espera do tempo
        cy.get('.error').should('not.be.visible');// verificando a mensagem que de .error se sumiu

    })
    Cypress._.times(5, () => {
        it('Campo telefone continua vazio quando preenchido com valor não numerico', () => {
            cy.get('#phone') // acesso ao imput da lista de telefone 
                .type('AbCdEfGhIjHLmNoPqRsTuVxZ') // escrevendo na lista numerica as letras 
                .should('have.value', ''); // verificando se a caracteres no identificador #phone 
        })

    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.clock(); // congelando o tempo do clock

        cy.get('#firstName').type('Leonardo');// colocando o nome no identificador 
        cy.get('#lastName').type('Luz'); // colocando sobrenome no identificador
        cy.get('#email').type('leonardoluz10@hotmail.com');// colocando email no identificador
        cy.get('#phone-checkbox').check();// marcando o check-box do identificador phone 
        cy.get('#open-text-area').type('teste');// escrevendo no text-area 
        cy.contains('button', 'Enviar').click();// clicando no button enviar 

        cy.get('.error').should('be.visible'); // usando a classe .error
        cy.tick(THREE_SECONDS_IN_MS);// o uso do tick serve para que podemos retirar os segundos de espera do tempo
        cy.get('.error').should('not.be.visible');// verificando a mensagem que de .error se sumiu

    })
    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName').type('Leonardo').should('have.value', 'Leonardo').clear().should('have.value', '');
        cy.get('#lastName').type('Luz').should('have.value', 'Luz').clear().should('have.value', '');
        cy.get('#email').type('leonardoluz10@hotmail.com').should('have.value', 'leonardoluz10@hotmail.com').clear().should('have.value', '');
        cy.get('#phone').type('11975267492').should('have.value', '11975267492').clear().should('have.value', '');
        cy.get('#open-text-area').type('Teste').clear().should('have.value', '');

    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.clock();// congelando o tempo do clock
        cy.get('button[type="submit"]').click();
        cy.get('.error').should('be.visible');
        cy.tick(THREE_SECONDS_IN_MS);// o uso do tick serve para que podemos retirar os segundos de espera do tempo
        cy.get('.error').should('not.be.visible');
    })
    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.clock();// congelando o tempo do clock
        cy.fillMandatoryFieldsAndSubmit('Leonardo', 'Luz', 'leonardo@hotmail.com', '119755665', 'teste'); // comando costomizado.
        cy.get('.success').should('be.visible');
        cy.tick(THREE_SECONDS_IN_MS);// o uso do tick serve para que podemos retirar os segundos de espera do tempo
        cy.get('.success').should('not.be.visible');

    })
    it('selecione um produto (YouTube) por seu texto', () => {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })
    it('seleciona um produto (mentoria) por seu valor (value)', () => {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })
    it('selecione um produto (blog) por seu índice', () => {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })
    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]') // identificando o elemento input
            .check() // encadeou o check para marcar o radio button ou seja da check no feedback
            .should('have.value', 'feedback'); // encadeado o should para verificar se o valor foi selecionado (feedback)
    })
    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]') // usando o input para verificar a quantidade de elemento de do type="radio"

            .should('have.length', 3) // verificando e confirmando a quantidade de elementos 

            .each(function ($radio) { // usando a função .each para passar em cada um dos elementos 

                cy.wrap($radio).check(); // com o comando cy.wrap empacotamos o elemento para mandar comandos de testes ex .should .check

                cy.wrap($radio).should('be.checked'); // com o .should no wrap $radio se verifica se esta checado o radio.
            })
    })
    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]') // com o cy.get para pegar os elementos do input type checkbox
            .check() // marca o elemento com um check
            .should('be.checked') // verifica se está marcado o elemento
            .last() //vai para o ultimo elemento da lista de checkbox
            .uncheck() // desmarca o ultimo elemento devido esta está listado com .last
            .should('not.be.checked'); // verifica se não está marcado
    })
    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]#file-upload')  // fez um cy.get para pegar o input do type file 

            .should('not.have.value') // encaminho um should com "not.have.value" para verificar que não tem nenhum valor dentro

            .selectFile('cypress/fixtures/example.json') // Usamos a funcionalidade do .selectFile para passar um arquivo ex do example.json

            .should((input) => { // encaminhou um should com uma função de callback (Função) para receber como elemento o input recebido pelo cy.get.

                expect(input[0].files[0].name).to.equal('example.json') // com o expect se faz uma verificação no input[0] que contem um .file [0] e nele contem um .nome que é verificado pelo .to.equal('')o seu nome "example.json".

            })
    })
    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]#file-upload')  // fez um cy.get para pegar o input do type file 

            .should('not.have.value') // encaminho um should com "not.have.value" para verificar que não tem nenhum valor dentro

            .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' }) // usando o { action: 'drag-drop'} é simular um arrasto do arquivo para o .selectFile.   

            .should((input) => { // encaminhou um should com uma função de callbackFn (Função) para receber como elemento o input recebido pelo cy.get.

                expect(input[0].files[0].name).to.equal('example.json') // com o expect se faz uma verificação no input[0] que contem um .file [0] e nele contem um .nome que é verificado pelo .to.equal('')o seu nome "example.json". 

            })

    })
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {

        cy.fixture('example.json').as('sampleFile') // Podemos usar o cy.fixture e passar o nome do arquivo dentro e com o .as dá um nome a esse arquivo para ser usado como @sampleFile.

        cy.get('input[type="file"]#file-upload')  // fez um cy.get para pegar o input do type file 

            .selectFile('@sampleFile') // com o nome do .as podemos apenas passar o nome para o .selectFile sem necessidade de passar o endereço do arquivo.

            .should((input) => { // encaminhou um should com uma função de callbackFn (Função) para receber como elemento o input recebido pelo cy.get.

                expect(input[0].files[0].name).to.equal('example.json') // com o expect se faz uma verificação no input[0] que contem um .file [0] e nele contem um .nome que é verificado pelo .to.equal('')o seu nome "example.json". 

            })
    })
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('#privacy a') // pegamos o elementos do tipo ancora com id #privacy.
            .should('have.attr', 'target', '_blank') // verificamos se tem o valor o atributo do tipo  target="_blanck" usando o should 'have.attr','target','blank'.

    })
    it('acessa a página da política de privacidade removendo o target e então clicanco no link', () => {
        cy.get('#privacy a') // pegamos o elementos do tipo ancora com id #privacy.
            .should('have.attr', 'target', '_blank') // verificamos se tem o valor o atributo do tipo  target="_blanck" usando o should 'have.attr','target','blank'.
            .invoke('removeAttr', 'target') // removemos o atributo target com o .invoke para não abrir em outra pagina
            .click(); // e clicamos nela para abrir a pagina sem a necessidade de abrir outra aba devido a função target="_blank" estar removida.
        cy.contains('Talking About Testing').should('be.visible'); // usamos um cy.contains para verificar se existe o nome do texto descrito e should com a função be.visible para verificar se está vísivel 
    })
    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke()', () => {
        cy.get('.success') // pegando o elemento de class .success 
            .should('not.be.visible') // verificando que o elemento não está visível 
            .invoke('show') // usando o metodo .invoke chamando um 'show' para mostrar o elemento
            .should('be.visible') // verificando se está visível
            .and('contain', 'Mensagem enviada com sucesso.') // usando o and para continuar com a verificação se contain a mensagem descrita
            .invoke('hide') // usando o metodo .invoke chamando um hide para esconder o elemento 
            .should('not.be.visible')// verificando se o elemento não está visível 
        cy.get('.error')// pegando o elemento da class  .error
            .should('not.be.visible')// Verificando que o elemento não está visível
            .invoke('show')// usando o metodo .invoke chamando um 'show' para mostrar o elemento 
            .should('be.visible')// verificando se o elemento está visísvel
            .and('contain', 'Valide os campos obrigatórios!')// usando o and para continuar com a verificação se contain a mensagem descrita
            .invoke('hide')// usando o metodo .invoke chamadno um 'hide' para esconder o elemento 
            .should('not.be.visible')// verificando se o elemento não está visível
    })
})
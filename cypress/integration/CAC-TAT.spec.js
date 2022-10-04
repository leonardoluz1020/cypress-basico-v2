// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('Cebtral de Atendimento ao Cliente TAT', function () {
    beforeEach(() => {
        cy.visit('./src/index.html');
    })

    it('Verificar o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
    })

    it('preenche os campos obrigatórios e envia o formulário', () => {
        const testLong = 'Precisamos aprender Cypress URGENTE para entrarmos na area de analista de teste automatizado Precisamos aprender Cypress URGENTE para entrarmos na area de analista de teste automatizado Precisamos aprender Cypress URGENTE para entrarmos na area de analista de teste automatizado Precisamos aprender Cypress URGENTE para entrarmos na area de analista de teste automatizado'; // variavel com texto

        cy.get('#firstName').type('Leonardo').should('have.value', 'Leonardo');
        cy.get('#lastName').type('Luz').should('have.value', 'Luz');
        cy.get('#email').type('leonardoluz10@hotmail.com').should('have.value', 'leonardoluz10@hotmail.com');
        cy.get('#phone').type('11975267492').should('have.value', '11975267492');
        cy.get('#open-text-area').should('be.visible').type(testLong, { delay: 0 }); // usando um objeto delay para digitar textos longos
        cy.contains('button','Enviar').click();

        cy.get('.success').should('be.visible'); // usando a classe .success

    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {

        cy.get('#firstName').type('Leonardo');
        cy.get('#lastName').type('Luz');
        cy.get('#email').type('leonardoluz10.hotmail.com');
        cy.get('#phone').type('11975267492');
        cy.get('#open-text-area').type('teste');
        cy.contains('button','Enviar').click();

        cy.get('.error').should('be.visible'); // usando a classe .error

    })

    it('Campo telefone continua vazio quando preenchido com valor não numerico', () => {
        cy.get('#phone')
            .type('AbCdEfGhIjHLmNoPqRsTuVxZ')
            .should('have.value', '');
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {

        cy.get('#firstName').type('Leonardo');
        cy.get('#lastName').type('Luz');
        cy.get('#email').type('leonardoluz10@hotmail.com');
        cy.get('#phone-checkbox').click();
        cy.get('#open-text-area').type('teste');
        cy.contains('button','Enviar').click();

    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName').type('Leonardo').should('have.value', 'Leonardo').clear().should('have.value', '');
        cy.get('#lastName').type('Luz').should('have.value', 'Luz').clear().should('have.value', '');
        cy.get('#email').type('leonardoluz10@hotmail.com').should('have.value', 'leonardoluz10@hotmail.com').clear().should('have.value', '');
        cy.get('#phone').type('11975267492').should('have.value', '11975267492').clear().should('have.value', '');
        cy.get('#open-text-area').type('Teste').clear().should('have.value', '');

    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.get('button[type="submit"]').click();
        cy.get('.error').should('be.visible');
    })

    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit('Leonardo','Luz','leonardo@hotmail.com','119755665','teste'); // comando costomizado.
        cy.get('.success').should('be.visible');
    })
    it('selecione um produto (YouTube) por seu texto',()=>{
         cy.get('#product')
         .select('YouTube')
         .should('have.value','youtube')
    })    
    it('seleciona um produto (mentoria) por seu valor (value)',()=>{
        cy.get('#product')
        .select('mentoria')
        .should('have.value','mentoria')
    })
    it('selecione um produto (blog) por seu índice',()=>{
        cy.get('#product')
        .select(2)
        .should('have.value','blog')
    })
    it.only('marca o tipo de atendimento "Feedback"',()=>{
        
    })

})
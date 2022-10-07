it('testa a página da política de privavidade de forma independente', () => {
    cy.visit('./src/privacy.html'); // visitanto o link ou arquivo que deseja fazer o teste.
    cy.contains('Talking About Testing')// verificando se existe a frase no contains.
    .should('be.visible') // com o .should be visible afirmamos que está visivel
})


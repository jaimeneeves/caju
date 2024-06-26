describe('Review Registration Test', () => {
  beforeEach(() => {
    // Visita a página inicial onde o RegistrationCard é renderizado
    cy.visit('http://localhost:3001/#/dashboard');
  });

  it('should review a registration', () => {
    // Verifica se há registros disponíveis
    cy.get('[data-cy=registration-card]').should('have.length.greaterThan', 0);

    // Simula o clique no botão de revisão do primeiro registro
    cy.get('[data-cy=registration-card]').first().within(() => {
      cy.get('[data-cy=review-button]').click();
    });

    // Verifica se o modal de confirmação de revisão está visível
    cy.contains('Confirmar revisão').should('be.visible');

    // Confirma a revisão clicando no botão de confirmação dentro do modal
    cy.get('[data-cy=modal-confirm]').click();

    // Verifica se o toast de sucesso de revisão é exibido
    cy.contains('Registro enviado para revisão novamente').should('be.visible');
  });
 
});

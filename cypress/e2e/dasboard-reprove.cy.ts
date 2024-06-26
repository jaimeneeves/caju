describe('Reprove Registration Test', () => {
  beforeEach(() => {
    // Visita a página inicial onde o RegistrationCard é renderizado
    cy.visit('http://localhost:3001/#/dashboard');
  });
  it('should reprove a registration after confirming the reprove', () => {
    // Simula o clique no botão de reprovar
    cy.get('[data-cy=registration-card]').first().within(() => {
      cy.get('[data-cy=reprove-button]').click();
    });

    // Verifica se o modal de confirmação de reprovação está visível
    cy.contains('Confirmar reprovação').should('be.visible');

    // Confirma a reprovação clicando no botão de confirmação dentro do modal
    cy.get('[data-cy=modal-confirm]').click();

    // Verifica se o toast de sucesso de reprovação é exibido
    cy.contains('Registro reprovado com sucesso').should('be.visible');
  });
});

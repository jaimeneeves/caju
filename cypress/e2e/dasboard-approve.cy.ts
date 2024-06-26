describe('Approve Registration Test', () => {
  beforeEach(() => {
    // Visita a página inicial onde o RegistrationCard é renderizado
    cy.visit('http://localhost:3001/#/dashboard');
  });
  it('should approve a registration after confirming the approval', () => {
    // Simula o clique no botão de aprovar
    cy.get('[data-cy=registration-card]').first().within(() => {
      cy.get('[data-cy=approve-button]').click();
    });

    // Verifica se o modal de confirmação de aprovação está visível
    cy.contains('Confirmar aprovação').should('be.visible');

    // Confirma a aprovação clicando no botão de confirmação dentro do modal
    cy.get('[data-cy=modal-confirm]').click();

    // Verifica se o toast de sucesso de aprovação é exibido
    cy.contains('Registro aprovado com sucesso').should('be.visible');
  });
});

describe('Review Registration Test', () => {
  beforeEach(() => {
    // Visita a página inicial onde o RegistrationCard é renderizado
    cy.visit('http://localhost:3001/#/dashboard');
  });

  it('should review a registration', () => {
    // Simula o cadastro de um novo registro
    cy.get('[data-testid=new-admission]').click();

    // Preenche o formulário de cadastro
    cy.get('input[placeholder="Nome"]').type('Davi da Silva');
    cy.get('input[placeholder="Email"]').type('davi@gmail.com');
    cy.get('input[placeholder="CPF"]').type('17019788068');
    cy.get('input[type="date"]').type('2024-06-26');
    cy.get('button[id="submit"]').click();

    // Simula o clique no botão de aprovar
    cy.get('[data-cy=registration-card]').first().within(() => {
      cy.get('[data-cy=approve-button]').click();
    });

    // Confirma a aprovação clicando no botão de confirmação dentro do modal
    cy.get('[data-cy=modal-confirm]').click();

    // Simula o clique no botão de revisão do primeiro registro
    cy.get('[data-cy=registration-review-card]').first().within(() => {
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

describe('Delete Registration Test', () => {
  beforeEach(() => {
    // Visita a página inicial onde o RegistrationCard é renderizado
    cy.visit('http://localhost:3001/#/dashboard');
  });
  
  it('should delete a registration after confirming the deletion', () => {
    // Simula o cadastro de um novo registro
    cy.get('[data-testid=new-admission]').click();

    // Preenche o formulário de cadastro
    cy.get('input[placeholder="Nome"]').type('Silvio Pereira');
    cy.get('input[placeholder="Email"]').type('silvio@gmail.com');
    cy.get('input[placeholder="CPF"]').type('17019788068');
    cy.get('input[type="date"]').type('2024-06-26');
    cy.get('button[id="submit"]').click();

    // Simula o clique no ícone de lixeira
    cy.get('[data-cy=registration-card]').first().within(() => {
      cy.get('[data-cy=delete-icon]').click();
    });

    // Verifica se o modal de confirmação de exclusão está visível
    cy.contains('Confirmar exclusão').should('be.visible');

    // Confirma a exclusão clicando no botão de confirmação dentro do modal
    cy.contains('Confirmar').should('be.visible');

    cy.get('[data-cy=modal-confirm]').click();

    // Verifica se o toast de sucesso de exclusão é exibido
    cy.contains('Registro excluído com sucesso').should('be.visible');
  });
});

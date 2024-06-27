describe('Approve Registration Test', () => {
  beforeEach(() => {
    // Visita a página inicial onde o RegistrationCard é renderizado
    cy.visit('http://localhost:3001/#/dashboard');
  });
  it('should approve a registration after confirming the approval', () => {
    // Simula o cadastro de um novo registro
    cy.get('[data-testid=new-admission]').click(); // Botão para abrir o formulário de cadastro

    // Preenche o formulário de cadastro
    cy.get('input[placeholder="Nome"]').type('João da Silva');
    cy.get('input[placeholder="Email"]').type('joão@gmail.com');
    cy.get('input[placeholder="CPF"]').type('17019788068');
    cy.get('input[type="date"]').type('2024-06-26');
    cy.get('button[id="submit"]').click();

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

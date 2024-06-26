describe('Criando novo usuário', () => {
  it('deve criar um usuário', () => {
    cy.visit('http://localhost:3001/#/new-user');
    cy.get('input[placeholder="Nome"]').type('João da Silva');
    cy.get('input[placeholder="Email"]').type('joão@gmail.com');
    cy.get('input[placeholder="CPF"]').type('17019788068');
    cy.get('input[type="date"]').type('2024-06-26');
    cy.get('button[id="submit"]').click();
  })

  it('deve validar que todos os campos são obrigatórios', () => {
    cy.visit('http://localhost:3001/#/new-user');

    cy.get('button[id="submit"]').disabled = false;

    // Tentativa de submissão sem preencher nenhum campo
    cy.get('button[id="submit"]').click();

    // Validação da mensagem de erro
    cy.contains('Todos os campos são obrigatórios.').should('be.visible');
  });
  
})
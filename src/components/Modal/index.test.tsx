import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Modal from './index';

describe('Componente de Modal', () => {
  it('renderiza corretamente e responde aos cliques de botão', () => {
    const onCloseMock = jest.fn();
    const onConfirmMock = jest.fn();
    const modalTitle = 'Test Modal';

    render(
      <Modal title={modalTitle} onClose={onCloseMock} onConfirm={onConfirmMock}>
        <div>Modal content</div>
      </Modal>
    );

    // Verifica se o título é renderizado
    expect(screen.getByText(modalTitle)).toBeInTheDocument();

    // Simula clique no botão de fechar e verifica se onClose foi chamado
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(onCloseMock).toHaveBeenCalled();

    // Simula clique no botão de confirmar e verifica se onConfirm foi chamado
    fireEvent.click(screen.getByText(/confirm/i));
    expect(onConfirmMock).toHaveBeenCalled();
  });
});
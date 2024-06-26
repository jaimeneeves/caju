import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import MeuComponente from './index';

describe('Componente de TextField', () => {
  test('renderiza corretamente', () => {
    const { getByLabelText, getByText } = render(
      <MeuComponente id="meu-input" label="Meu Label" value="" onChange={() => {}} setValue={() => {}} />
    );

    expect(getByLabelText('Meu Label')).toBeInTheDocument();
  });

  test('chama onChange e setValue quando o valor é alterado', () => {
    const mockOnChange = jest.fn();
    const mockSetValue = jest.fn();
    const { getByLabelText } = render(
      <MeuComponente id="meu-input" label="Meu Label" value="" onChange={mockOnChange} setValue={mockSetValue} />
    );

    fireEvent.change(getByLabelText('Meu Label'), { target: { value: 'novo valor' } });

    expect(mockOnChange).toHaveBeenCalled();
    expect(mockSetValue).toHaveBeenCalledWith('novo valor');
  });

  test('exibe mensagem de erro quando a prop error é fornecida', () => {
    const { getByText } = render(
      <MeuComponente id="meu-input" label="Meu Label" value="" onChange={() => {}} setValue={() => {}} error="Erro de validação" />
    );

    expect(getByText('Erro de validação')).toBeInTheDocument();
  });
});
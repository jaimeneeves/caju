import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import LoadingOverlay from './index';

describe('LoadingOverlay Component', () => {
  test('deve renderizar o overlay e spinner', () => {
    render(<LoadingOverlay />);
    expect(screen.getByTestId('overlay')).toBeInTheDocument();
  });
});
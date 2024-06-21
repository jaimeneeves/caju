import {act} from 'react';
import { render, screen } from '@testing-library/react';
import { useDebounce } from './useDebounce';

jest.useFakeTimers();

const TestComponent = ({ value, delay }: { value: string; delay: number }) => {
  const debouncedValue = useDebounce(value, delay);
  return <div data-testid="debouncedValue">{debouncedValue}</div>;
};

describe('useDebounce', () => {
  it('should debounce value changes', () => {
    render(<TestComponent value="test" delay={500} />);

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(screen.getByTestId('debouncedValue').textContent).toBe('test');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(screen.getByTestId('debouncedValue').textContent).toBe('test');
  });

  it('should update debounced value after delay', () => {
    const { rerender } = render(<TestComponent value="test" delay={500} />);

    rerender(<TestComponent value="new test" delay={500} />);

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(screen.getByTestId('debouncedValue').textContent).toBe('test');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(screen.getByTestId('debouncedValue').textContent).toBe('new test');
  });
});

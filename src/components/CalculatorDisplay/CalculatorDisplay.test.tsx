import { render, screen } from '@testing-library/react';
import { CalculatorDisplayKey } from '../CalculatorDislayKey';

describe('<CalculatorDisplay />', () => {
  it('should render', () => {
    render(<CalculatorDisplayKey value="111" />);
    expect(screen.getByText(/111/i)).toBeInTheDocument();
  });
});

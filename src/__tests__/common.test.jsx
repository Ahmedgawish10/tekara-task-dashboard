import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Page from '../components/common/page';

describe('Common Page Component', () => {
  it('should render simple heading', () => {
    render(<Page />);
    
    // check if theis text exisit in ui simple test Heading test
    const loginHeading = screen.getByRole('heading', { name: /Heading test/i });
    expect(loginHeading).toBeInTheDocument();
  });
}); 
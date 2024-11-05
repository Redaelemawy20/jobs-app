import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import InfoCard from './InfoCard';

jest.mock('../styles/skillcard.module.css', () => ({
  mainTitle: 'mainTitle',
  statistics: 'statistics',
}));

describe('InfoCard Component', () => {
  const defaultProps = {
    title: 'Test Title',
    info: [
      { key: 'Key1', value: 'Value1' },
      { key: 'Key2', value: 'Value2' },
    ],
  };

  const renderComponent = (props = {}) => {
    return render(
      <BrowserRouter>
        <InfoCard {...defaultProps} {...props} />
      </BrowserRouter>
    );
  };

  test('renders title correctly without link when href is not provided', () => {
    renderComponent();
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  test('wraps title in a link when href is provided', () => {
    renderComponent({ href: '/test-link' });
    const link = screen.getByRole('link', { name: /test title/i });
    expect(link).toHaveAttribute('href', '/test-link');
  });

  test('renders description when provided', () => {
    renderComponent({ description: 'Test Description' });
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  test('does not render description when not provided', () => {
    renderComponent();
    expect(screen.queryByText('Test Description')).not.toBeInTheDocument();
  });

  test('renders info key-value pairs correctly', () => {
    renderComponent();
    expect(screen.getByText('Key1:')).toBeInTheDocument();
    expect(screen.getByText('Value1')).toBeInTheDocument();
    expect(screen.getByText('Key2:')).toBeInTheDocument();
    expect(screen.getByText('Value2')).toBeInTheDocument();
  });
});

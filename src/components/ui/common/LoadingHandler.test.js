import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoadingHandler from './LoadingHandler';

// Mocked props for the test cases
const loadingUI = <div>Loading content...</div>;
const errorUI = <div>Error loading content.</div>;
const childrenContent = (status) => (
  <div>{`Loaded content with status: ${status}`}</div>
);

describe('LoadingHandler Component', () => {
  test('displays loading UI when status is "loading"', () => {
    render(
      <LoadingHandler
        status="loading"
        loadingUI={loadingUI}
        onError={errorUI}
        children={childrenContent}
      />
    );
    expect(screen.getByText('Loading content...')).toBeInTheDocument();
  });

  test('displays error UI when status is "error"', () => {
    render(
      <LoadingHandler
        status="error"
        loadingUI={loadingUI}
        onError={errorUI}
        children={childrenContent}
      />
    );
    expect(screen.getByText('Error loading content.')).toBeInTheDocument();
  });

  test('renders children content with given status when status is a loaded value', () => {
    const loadedStatus = 'loaded'; // any generic value indicating success
    render(
      <LoadingHandler
        status={loadedStatus}
        loadingUI={loadingUI}
        onError={errorUI}
        children={childrenContent}
      />
    );
    expect(
      screen.getByText(`Loaded content with status: ${loadedStatus}`)
    ).toBeInTheDocument();
  });

  test('calls onLoad with the correct status when status changes to loaded', () => {
    const onLoadMock = jest.fn();
    const loadedStatus = 'loaded';
    render(
      <LoadingHandler
        status={loadedStatus}
        loadingUI={loadingUI}
        onError={errorUI}
        children={childrenContent}
        onLoad={onLoadMock}
      />
    );
    expect(onLoadMock).toHaveBeenCalledWith(loadedStatus);
  });
});

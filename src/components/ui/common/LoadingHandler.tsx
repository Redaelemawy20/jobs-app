import { ReactNode, useEffect } from 'react';

// Define possible statuses as a union type
type Status<T> = 'loading' | T | 'error';

interface LoadingHandlerProps<T> {
  status: Status<T>;
  loadingUI?: ReactNode;
  onError: ReactNode;
  children: (status: T) => React.ReactElement;
  onLoad?: (status: T) => void;
}

const LoadingHandler = <T,>({
  status,
  loadingUI,
  onError,
  children,
  onLoad,
}: LoadingHandlerProps<T>) => {
  useEffect(() => {
    if (status && status !== 'loading' && status !== 'error')
      onLoad && onLoad(status);
  }, [status]);
  if (!status || status === 'loading')
    return <>{loadingUI ?? <>Loading...</>}</>;
  if (status === 'error') return <>{onError}</>;
  return children(status);
};

export default LoadingHandler;

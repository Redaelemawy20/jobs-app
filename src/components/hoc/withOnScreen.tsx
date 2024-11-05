import React, { useEffect } from 'react';
import useOnScreen from '../hooks/useOnScreen';

type WithOnScreenProps = {
  onVisible: () => void; // Action to run when the component appears
  threshold?: number;
};

// Higher-order component
function withOnScreen<T>(WrappedComponent: React.ComponentType<T>) {
  return function (props: WithOnScreenProps & T) {
    const { onVisible, threshold, ...rest } = props;
    const [ref, isVisible] = useOnScreen<HTMLDivElement>({
      threshold: threshold ?? 0.5,
    });

    useEffect(() => {
      if (isVisible) {
        onVisible(); // Run the provided action when the component is visible
      }
    }, [isVisible, onVisible]);

    return (
      <div ref={ref}>
        <WrappedComponent {...(rest as any)} />
      </div>
    );
  };
}

export default withOnScreen;

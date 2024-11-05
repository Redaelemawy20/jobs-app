import { useEffect } from 'react';
import useOnScreen from '../../hooks/useOnScreen';

interface LoadMoreI {
  error: string;
  onLoad: VoidFunction;
}
const LoadMore = ({ error, onLoad }: LoadMoreI) => {
  const [ref, isVisible] = useOnScreen<HTMLDivElement>({ threshold: 0.5 });
  useEffect(() => {
    if (isVisible) {
      onLoad();
    }
  }, [isVisible]);
  return (
    <div ref={ref} className="mainWrapper">
      <h2>{error ? error : 'Loading Jobs ....'} </h2>
    </div>
  );
};

export default LoadMore;

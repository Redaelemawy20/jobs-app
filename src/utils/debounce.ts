export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay = 200
) {
  let timerId: ReturnType<typeof setTimeout> | null;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

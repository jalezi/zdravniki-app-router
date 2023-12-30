import { useEffect, useState } from 'react';

export const useEscapeKey = (callback: () => void) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        callback();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [callback]);
};

export const useTimer = ({ initialTime }: { initialTime: number }) => {
  if (initialTime <= 0) throw new Error('Initial time must be greater than 0');

  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    const handleTimer = () => {
      setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
    };

    const intervalId = setInterval(handleTimer, 1000);

    if (timeLeft <= 0) {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  return timeLeft;
};

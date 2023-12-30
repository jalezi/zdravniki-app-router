import { HTMLAttributes } from 'react';

import { useTimer } from '@/lib/hooks';

interface TimerProps extends HTMLAttributes<HTMLDivElement> {
  initialTime?: number;
}

const Timer = ({ initialTime = 30, ...props }: TimerProps) => {
  const timeLeft = useTimer({ initialTime });

  return (
    <div role='timer' aria-atomic='true' {...props}>
      <span>{timeLeft}</span>
    </div>
  );
};

export default Timer;

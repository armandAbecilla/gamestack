import { useEffect, useState, useCallback, useRef } from 'react';

export default function ShuffleCounter({
  count = 1000,
  duration = 1500 /* in millisecond */,
}) {
  const [displayedCount, setDisplayedCount] = useState(count);
  const animationFrame = useRef();

  const generateRandomNumberInRange = useCallback(
    (target, progress) => {
      const maxRange = count / 2;
      const currentRange = maxRange * (1 - progress); // Shrink as time passes
      const min = target - currentRange;
      const max = target + currentRange;
      return Math.floor(min + Math.random() * (max - min));
    },
    [count],
  );

  useEffect(() => {
    let startTime = performance.now(); // more precise than Date.now()

    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      if (progress >= 1) {
        setDisplayedCount(count);
        cancelAnimationFrame(animationFrame.current);
      } else {
        const randomNumber = generateRandomNumberInRange(count, progress);
        setDisplayedCount(randomNumber);
        animationFrame.current = requestAnimationFrame(animate);
      }
    }

    animationFrame.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame.current);
    };
  }, [count, duration, generateRandomNumberInRange]);

  return (
    <span className='font-heading text-center text-2xl font-bold text-white'>
      {displayedCount}
    </span>
  );
}

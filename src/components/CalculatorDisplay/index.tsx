import { FC, useRef, useState, useEffect } from 'react';
import './style.scss';
import { getFormattedValue } from '@/utils';
import { CalculatorDisplayKey } from '../CalculatorDislayKey';

export interface ICalculatorDisplayProps {
  value: string;
}

export const CalculatorDisplay: FC<ICalculatorDisplayProps> = ({ value = '0' }) => {
  const [scale, setScale] = useState<number>(1);
  const parentRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const availableWidth = parentRef?.current?.offsetWidth;
    const actualWidth = innerRef?.current?.offsetWidth;
    const actualScale = availableWidth && actualWidth ? availableWidth / actualWidth : 1;
    if (actualScale < 1) {
      setScale(actualScale);
    } else if (scale < 1) {
      setScale(1);
    }
  });

  return (
    <div className="calculator-display" ref={parentRef} data-testid="calculator-display">
      <div
        className="calculator-display__auto-scaling flex"
        style={{ transform: `scale(${scale},${scale})` }}
        ref={innerRef}
        data-testid="calculator-display-inner"
      >
        {[...getFormattedValue(value)].map(char => <CalculatorDisplayKey value={char} />)}
      </div>
    </div>
  );
};

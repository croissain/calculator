import { FC, useState } from 'react';
import './style.scss';

export interface ICalculatorDisplayKeyProps {
  value: string;
}

export const CalculatorDisplayKey: FC<ICalculatorDisplayKeyProps> = ({ value = '0' }) => {
  const [isActive, setIsActive] = useState(false);

  return (
      <div
        className={`calculator-display-key ${isActive&&"active"}`}
        data-testid="calculator-display-inner-key"
        onClick={()=>setIsActive(!isActive)}
      >
        {value}
      </div>
  );
};

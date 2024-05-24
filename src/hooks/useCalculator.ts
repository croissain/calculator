import { useEffect, useReducer } from 'react';
import { calculatorOperations } from '../utils';
import { calculatorReducer, initialState, IInputDigit, IInputDot, IInputPercent, IClearLastChar, IClearDisplay, IPerformOperation, IClearAll } from './reducer';
import { EInputTypes } from '../types';

export const useCalculator = () => {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  const handleClick = (type: EInputTypes, payload?: string) => {
    if (payload) {
      dispatch({ type, payload });
    } else {
      dispatch({ type, payload: null });
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (/\d/.test(e.key)) {
      e.preventDefault();
      dispatch({
        type: EInputTypes.inputDigit,
        payload: e.key,
      } as IInputDigit);
    } else if (e.key in calculatorOperations) {
      e.preventDefault();
      dispatch({
        type: EInputTypes.performOperation,
        payload: e.key,
      } as IPerformOperation);
    } else if (e.key === ',') {
      e.preventDefault();
      dispatch({
        type: EInputTypes.inputDot,
      } as IInputDot);
    } else if (e.key === '.') {
      e.preventDefault();
      dispatch({
        type: EInputTypes.inputDot,
      } as IInputDot);
    } else if (e.key === '%') {
      e.preventDefault();
      dispatch({
        type: EInputTypes.inputPercent,
      } as IInputPercent);
    } else if (e.key === 'Backspace') {
      e.preventDefault();
      dispatch({
        type: EInputTypes.clearLastChar,
      } as IClearLastChar);
    } else if (e.key === 'Clear') {
      e.preventDefault();

      if (state.displayValue !== '0') {
        dispatch({
          type: EInputTypes.clearDisplay,
        } as IClearDisplay);
      } else {
        dispatch({
          type: EInputTypes.clearAll,
        } as IClearAll);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  return { state, handleClick };
};

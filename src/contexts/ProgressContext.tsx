import React from 'react';
import type { ReactNode } from 'react';
import type { ProgressState } from '../types';
import { useProgressState } from '../hooks/useProgressState';
import { ProgressContext } from './progressContextDefinition';

interface ProgressProviderProps {
  children: ReactNode;
}

export const ProgressProvider: React.FC<ProgressProviderProps> = ({ children }) => {
  const progressState = useProgressState();

  const value: ProgressState = progressState;

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};

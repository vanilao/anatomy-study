import { useContext } from 'react';
import { ProgressContext } from '../contexts/progressContextDefinition';
import type { ProgressState } from '../types';

export const useProgress = (): ProgressState => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

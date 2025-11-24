import { createContext } from 'react';
import type { ProgressState } from '../types';

export const ProgressContext = createContext<ProgressState | undefined>(undefined);

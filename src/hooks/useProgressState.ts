import { useState } from 'react';
import type { StudyProgress } from '../types';

const DEFAULT_PROGRESS: StudyProgress = {
  cardsStudied: 0,
  correctAnswers: 0,
  totalCards: 0,
  quizScores: [],
  averageScore: 0,
  studyStreak: 0,
  totalTimeSpent: 0,
  lastStudyDate: null,
  masteryLevel: {},
};

export const useProgressState = () => {
  // Initialize state from localStorage to avoid setState in effect
  const initializeProgress = (): StudyProgress => {
    try {
      const savedProgress = localStorage.getItem('phoneticards-progress');
      if (savedProgress) {
        const parsed = JSON.parse(savedProgress);
        return { ...DEFAULT_PROGRESS, ...parsed };
      }
    } catch (error) {
      console.error('Error parsing progress data:', error);
    }
    return DEFAULT_PROGRESS;
  };

  const [progress, setProgressState] = useState<StudyProgress>(initializeProgress);

  const updateProgress = (updates: Partial<StudyProgress>) => {
    setProgressState(prev => {
      const newProgress = { ...prev, ...updates };
      
      // Calculate average score
      if (updates.quizScores) {
        const scores = updates.quizScores || prev.quizScores;
        newProgress.averageScore = scores.length > 0 
          ? scores.reduce((a, b) => a + b, 0) / scores.length 
          : 0;
      }

      // Update study streak
      if (updates.lastStudyDate) {
        const today = new Date();
        const lastStudy = updates.lastStudyDate;
        const daysDiff = Math.floor((today.getTime() - lastStudy.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysDiff === 1) {
          newProgress.studyStreak = prev.studyStreak + 1;
        } else if (daysDiff > 1) {
          newProgress.studyStreak = 1;
        } else if (daysDiff === 0) {
          newProgress.studyStreak = prev.studyStreak;
        }
      }

      localStorage.setItem('phoneticards-progress', JSON.stringify(newProgress));
      return newProgress;
    });
  };

  const resetProgress = () => {
    setProgressState(DEFAULT_PROGRESS);
    localStorage.removeItem('phoneticards-progress');
  };

  return { progress, updateProgress, resetProgress };
};

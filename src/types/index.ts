export interface BilingualText {
  en: string;
  th: string;
}

export interface FlashCard {
  id: string;
  category: 'organs' | 'functions' | 'tricks' | 'diagrams';
  front: BilingualText;
  back: BilingualText;
  difficulty: 'easy' | 'medium' | 'hard';
  lastStudied: Date | null;
  timesCorrect: number;
  timesIncorrect: number;
}

export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank';
  question: BilingualText;
  options?: BilingualText[];
  correctAnswer: string | number;
  explanation: BilingualText;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

export interface QuizState {
  currentQuestion: number;
  answers: (string | number | null)[];
  score: number;
  startTime: Date;
  endTime: Date | null;
  mode: 'practice' | 'timed';
}

export interface StudyProgress {
  cardsStudied: number;
  correctAnswers: number;
  totalCards: number;
  quizScores: number[];
  averageScore: number;
  studyStreak: number;
  totalTimeSpent: number;
  lastStudyDate: Date | null;
  masteryLevel: Record<string, number>;
}

export type Language = 'en' | 'th' | 'both';

export interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export interface ProgressState {
  progress: StudyProgress;
  updateProgress: (updates: Partial<StudyProgress>) => void;
  resetProgress: () => void;
}

export interface SpeechOrgan {
  id: string;
  name: BilingualText;
  location: BilingualText;
  function: BilingualText;
  description: BilingualText;
  system: 'respiratory' | 'phonatory' | 'articulatory';
}

export interface ContentSection {
  id: string;
  title: BilingualText;
  content: BilingualText;
  keyTerms: BilingualText[];
  subsections?: ContentSection[];
}

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { QuizQuestionComponent } from './QuizQuestion';
import { useProgress } from '@/hooks/useProgress';
import type { QuizQuestion } from '../types';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';

interface QuizSessionProps {
  questions: QuizQuestion[];
  onSessionComplete: (results: { correct: number; total: number; timeSpent: number }) => void;
  onExit: () => void;
  timeLimit?: number; // in seconds, undefined for no limit
}

interface QuizAnswer {
  questionId: string;
  answer: string | number | boolean;
  isCorrect: boolean;
  timeSpent: number; // time spent on this question in seconds
}

export function QuizSession({ questions, onSessionComplete, onExit, timeLimit }: QuizSessionProps) {
  const { updateProgress, progress } = useProgress();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState(() => Date.now());
  const [timeRemaining] = useState(timeLimit || 0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [startTime] = useState(() => Date.now());

  const currentQuestion = questions[currentQuestionIndex];
  const quizProgress = ((currentQuestionIndex + (showFeedback ? 1 : 0)) / questions.length) * 100;


  const completeQuiz = useCallback(() => {
    const totalTime = (Date.now() - startTime) / 1000;
    const correctCount = answers.filter(a => a.isCorrect).length;
    
    updateProgress({
      quizScores: [...(progress.quizScores || []), Math.round((correctCount / questions.length) * 100)]
    });
    
    setIsCompleted(true);
    
    onSessionComplete({
      correct: correctCount,
      total: questions.length,
      timeSpent: totalTime
    });
  }, [startTime, answers, questions.length, updateProgress, onSessionComplete, progress.quizScores]);

  const handleAnswer = (answer: string | number | boolean) => {
    setShowFeedback(true);
    
    // Validate answer
    let isCorrect = false;
    
    switch (currentQuestion.type) {
      case 'multiple-choice':
        isCorrect = answer === currentQuestion.correctAnswer;
        break;
      case 'true-false':
        isCorrect = answer === currentQuestion.correctAnswer;
        break;
      case 'fill-blank':
        if (typeof answer === 'string') {
          // Case-insensitive comparison with trimming
          const correctAnswer = currentQuestion.correctAnswer.toString().toLowerCase().trim();
          const userAnswer = answer.toLowerCase().trim();
          isCorrect = userAnswer === correctAnswer;
        }
        break;
    }
    
    const questionTime = (Date.now() - questionStartTime) / 1000;
    const quizAnswer: QuizAnswer = {
      questionId: currentQuestion.id,
      answer,
      isCorrect,
      timeSpent: questionTime
    };
    
    setAnswers([...answers, quizAnswer]);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowFeedback(false);
      setQuestionStartTime(Date.now());
    } else {
      // Quiz completed
      completeQuiz();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      // Show previous answer if it exists
      const previousAnswer = answers[currentQuestionIndex - 1];
      if (previousAnswer) {
        setShowFeedback(true);
      }
    }
  };


  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isCompleted) {
    return (
      <div className="space-y-6 p-4 max-w-2xl mx-auto">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Quiz Complete!</h2>
          <div className="space-y-2">
            <div className="text-5xl font-bold text-primary">
              {Math.round((answers.filter(a => a.isCorrect).length / questions.length) * 100)}%
            </div>
            <p className="text-muted-foreground">
              {answers.filter(a => a.isCorrect).length} out of {questions.length} correct
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Quiz Session</h2>
        <p className="text-muted-foreground">
          Question {currentQuestionIndex + 1} of {questions.length}
        </p>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progress</span>
          <span>{Math.round(quizProgress)}%</span>
        </div>
        <Progress value={quizProgress} className="w-full" />
      </div>

      {/* Timer */}
      {timeLimit && (
        <Card>
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span className="font-medium">Time Remaining</span>
            </div>
            <Badge variant={timeRemaining < 60 ? 'destructive' : 'default'}>
              {formatTime(timeRemaining)}
            </Badge>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>

        <div className="flex gap-2">
          <Badge variant="outline">
            Correct: {answers.filter(a => a.isCorrect).length}
          </Badge>
          <Badge variant="outline">
            Remaining: {questions.length - currentQuestionIndex - (showFeedback ? 0 : 1)}
          </Badge>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleNext}
          disabled={!showFeedback}
        >
          {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>

      {/* Question */}
      <QuizQuestionComponent
        question={currentQuestion}
        onAnswer={handleAnswer}
        showFeedback={showFeedback}
        isCorrect={showFeedback ? answers[currentQuestionIndex]?.isCorrect || false : null}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={questions.length}
      />

      {/* Exit Button */}
      <div className="text-center">
        <Button variant="outline" onClick={onExit}>
          Exit Quiz
        </Button>
      </div>
    </div>
  );
}

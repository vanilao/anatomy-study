import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import type { QuizQuestion } from '../types';
import { getBilingualText } from '../data/content';
import { CheckCircle2, XCircle } from 'lucide-react';

interface QuizQuestionComponentProps {
  question: QuizQuestion;
  onAnswer: (answer: string | number | boolean) => void;
  showFeedback: boolean;
  isCorrect: boolean | null;
  questionNumber: number;
  totalQuestions: number;
}

export function QuizQuestionComponent({ 
  question, 
  onAnswer, 
  showFeedback, 
  isCorrect,
  questionNumber,
  totalQuestions
}: QuizQuestionComponentProps) {
  const { language } = useLanguage();
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(null);
  const [fillInAnswer, setFillInAnswer] = useState('');

  const handleMultipleChoice = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
    onAnswer(optionIndex);
  };

  const handleTrueFalse = (answer: boolean) => {
    setSelectedAnswer(answer.toString());
    onAnswer(answer);
  };

  const handleFillInBlank = () => {
    if (fillInAnswer.trim()) {
      onAnswer(fillInAnswer.trim());
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="pb-4 sm:pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <CardTitle className="text-lg sm:text-xl">
            {language === 'en' ? 'Question' : 'คำถาม'} {questionNumber} {language === 'en' ? 'of' : 'จาก'} {totalQuestions}
          </CardTitle>
          <Badge variant="outline" className="w-fit text-xs">
            {question.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6">
        {/* Question Text */}
        <div className="text-base sm:text-lg leading-relaxed">
          {getBilingualText(question.question, language)}
        </div>

        {/* Question Options */}
        <div className="space-y-3">
          {question.type === 'multiple-choice' && (
            <div className="grid gap-2 sm:gap-3">
              {question.options?.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === index ? "default" : "outline"}
                  className={`w-full justify-start text-left h-auto p-3 sm:p-4 ${
                    showFeedback && index === question.correctAnswer 
                      ? 'bg-green-100 border-green-500 text-green-800 dark:bg-green-900 dark:text-green-200' 
                      : showFeedback && selectedAnswer === index && index !== question.correctAnswer
                      ? 'bg-red-100 border-red-500 text-red-800 dark:bg-red-900 dark:text-red-200'
                      : ''
                  }`}
                  onClick={() => handleMultipleChoice(index)}
                  disabled={showFeedback}
                >
                  <span className="flex items-center gap-2 sm:gap-3">
                    <span className="font-medium text-xs sm:text-sm">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    <span className="text-sm sm:text-base">{getBilingualText(option, language)}</span>
                  </span>
                </Button>
              ))}
            </div>
          )}

          {question.type === 'true-false' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button
                variant={selectedAnswer === 'true' ? "default" : "outline"}
                className={`h-auto p-4 sm:p-6 ${
                  showFeedback && question.correctAnswer === 1
                    ? 'bg-green-100 border-green-500 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : showFeedback && selectedAnswer === 'true' && question.correctAnswer === 0
                    ? 'bg-red-100 border-red-500 text-red-800 dark:bg-red-900 dark:text-red-200'
                    : ''
                }`}
                onClick={() => handleTrueFalse(true)}
                disabled={showFeedback}
              >
                <span className="text-sm sm:text-base font-medium">
                  {language === 'en' ? 'True' : 'จริง'}
                </span>
              </Button>
              <Button
                variant={selectedAnswer === 'false' ? "default" : "outline"}
                className={`h-auto p-4 sm:p-6 ${
                  showFeedback && question.correctAnswer === 0
                    ? 'bg-green-100 border-green-500 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : showFeedback && selectedAnswer === 'false' && question.correctAnswer === 1
                    ? 'bg-red-100 border-red-500 text-red-800 dark:bg-red-900 dark:text-red-200'
                    : ''
                }`}
                onClick={() => handleTrueFalse(false)}
                disabled={showFeedback}
              >
                <span className="text-sm sm:text-base font-medium">
                  {language === 'en' ? 'False' : 'เท็จ'}
                </span>
              </Button>
            </div>
          )}

          {question.type === 'fill-blank' && (
            <div className="space-y-3">
              <Input
                placeholder={language === 'en' ? 'Type your answer here...' : 'พิมพ์คำตอบของคุณที่นี่...'}
                value={fillInAnswer}
                onChange={(e) => setFillInAnswer(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleFillInBlank()}
                disabled={showFeedback}
                className="text-sm sm:text-base h-12"
              />
              <Button 
                onClick={handleFillInBlank} 
                disabled={!fillInAnswer.trim() || showFeedback}
                className="w-full sm:w-auto"
              >
                {language === 'en' ? 'Submit Answer' : 'ส่งคำตอบ'}
              </Button>
            </div>
          )}
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div className={`p-3 sm:p-4 rounded-lg border ${
            isCorrect 
              ? 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200'
              : 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200'
          }`}>
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 flex-shrink-0" />
              ) : (
                <XCircle className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 flex-shrink-0" />
              )}
              <div className="space-y-1 sm:space-y-2">
                <p className="font-medium text-sm sm:text-base">
                  {isCorrect 
                    ? (language === 'en' ? 'Correct!' : 'ถูกต้อง!')
                    : (language === 'en' ? 'Incorrect' : 'ไม่ถูกต้อง')
                  }
                </p>
                {question.explanation && (
                  <p className="text-xs sm:text-sm leading-relaxed">
                    {getBilingualText(question.explanation, language)}
                  </p>
                )}
                {!isCorrect && question.type === 'multiple-choice' && question.options && (
                  <p className="text-xs sm:text-sm mt-2">
                    {language === 'en' ? 'Correct answer:' : 'คำตอบที่ถูกต้อง:'} {getBilingualText(question.options[question.correctAnswer as number], language)}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

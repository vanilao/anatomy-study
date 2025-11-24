import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProgress } from '@/hooks/useProgress';
import { getBilingualText } from '@/data/content';
import type { FlashCard } from '../types';
import { Check, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface FlashCardComponentProps {
  card: FlashCard;
  onCardComplete: (cardId: string, correct: boolean) => void;
  onToggleAnswer: () => void;
  isFlipped: boolean;
}

export function FlashCardComponent({ 
  card, 
  onCardComplete, 
  onToggleAnswer,
  isFlipped 
}: FlashCardComponentProps) {
  const { language } = useLanguage();

  return (
    <div className="relative w-full h-64 sm:h-80" style={{ perspective: '1000px' }}>
      <Card 
        className={`absolute inset-0 w-full h-full cursor-pointer transition-all duration-500 transform-gpu ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        style={{ 
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
        onClick={onToggleAnswer}
      >
        {/* Front of card */}
        <CardContent 
          className="absolute inset-0 w-full h-full flex flex-col justify-between p-4 sm:p-6"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-[10px] sm:text-xs">
                {card.category}
              </Badge>
              <Badge variant={card.difficulty === 'easy' ? 'default' : card.difficulty === 'medium' ? 'secondary' : 'destructive'} className="text-[10px] sm:text-xs">
                {card.difficulty}
              </Badge>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <h3 className="text-lg sm:text-xl font-semibold text-center leading-tight">
                {getBilingualText(card.front, language)}
              </h3>
            </div>
          </div>
          <div className="text-center text-xs sm:text-sm text-muted-foreground">
            {language === 'en' ? 'Click to reveal answer' : 'คลิกเพื่อดูคำตอบ'}
          </div>
        </CardContent>

        {/* Back of card */}
        <CardContent 
          className="absolute inset-0 w-full h-full flex flex-col justify-between p-4 sm:p-6 bg-muted/50"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-[10px] sm:text-xs">
                {card.category}
              </Badge>
              <Badge variant={card.difficulty === 'easy' ? 'default' : card.difficulty === 'medium' ? 'secondary' : 'destructive'} className="text-[10px] sm:text-xs">
                {card.difficulty}
              </Badge>
            </div>
            <div className="flex-1 flex flex-col justify-center space-y-2 sm:space-y-4">
              <div className="text-center">
                <h4 className="text-sm sm:text-lg font-medium mb-1 sm:mb-2">
                  {language === 'en' ? 'Answer:' : 'คำตอบ:'}
                </h4>
                <p className="text-sm sm:text-base leading-relaxed">
                  {getBilingualText(card.back, language)}
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="destructive" 
              className="flex-1 text-xs sm:text-sm"
              onClick={(e) => {
                e.stopPropagation();
                onCardComplete(card.id, false);
              }}
            >
              <X className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              {language === 'en' ? 'Wrong' : 'ผิด'}
            </Button>
            <Button 
              size="sm" 
              className="flex-1 text-xs sm:text-sm"
              onClick={(e) => {
                e.stopPropagation();
                onCardComplete(card.id, true);
              }}
            >
              <Check className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              {language === 'en' ? 'Correct' : 'ถูกต้อง'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface StudySessionProps {
  cards: FlashCard[];
  onSessionComplete: (results: { correct: number; total: number }) => void;
  onExit: () => void;
}

export function StudySession({ cards, onSessionComplete, onExit }: StudySessionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedCards, setCompletedCards] = useState<Set<string>>(new Set());
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const { language } = useLanguage();
  const { updateProgress } = useProgress();

  const currentCard = cards[currentIndex];
  const progress = ((currentIndex + 1) / cards.length) * 100;

  const handleCardComplete = (cardId: string, correct: boolean) => {
    setCompletedCards(prev => new Set([...prev, cardId]));
    if (correct) {
      setCorrectAnswers(prev => prev + 1);
    }

    // Update progress in context
    updateProgress({
      cardsStudied: completedCards.size + 1,
      correctAnswers: correctAnswers + (correct ? 1 : 0)
    });

    // Move to next card or end session
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    } else {
      // Session complete
      onSessionComplete({ correct: correctAnswers + (correct ? 1 : 0), total: cards.length });
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setIsFlipped(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    }
  };

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="space-y-4 sm:space-y-6 p-2 sm:p-4 max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-1 sm:space-y-2">
        <h2 className="text-xl sm:text-2xl font-bold">Study Session</h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          Card {currentIndex + 1} of {cards.length}
        </p>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs sm:text-sm">
          <span>{language === 'en' ? 'Progress' : 'ความคืบหน้า'}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="w-full" />
      </div>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="w-full sm:w-auto order-2 sm:order-1"
        >
          <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
          {language === 'en' ? 'Previous' : 'ก่อนหน้า'}
        </Button>

        <div className="flex gap-2 order-1 sm:order-2">
          <Badge variant="outline" className="text-xs">
            {language === 'en' ? 'Correct:' : 'ถูกต้อง:'} {correctAnswers}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {language === 'en' ? 'Left:' : 'เหลือ:'} {cards.length - currentIndex}
          </Badge>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleNext}
          disabled={currentIndex === cards.length - 1}
          className="w-full sm:w-auto order-3"
        >
          {language === 'en' ? 'Next' : 'ถัดไป'}
          <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
        </Button>
      </div>

      {/* Flash Card */}
      <FlashCardComponent
        card={currentCard}
        onCardComplete={handleCardComplete}
        onToggleAnswer={toggleFlip}
        isFlipped={isFlipped}
      />

      {/* Exit Button */}
      <div className="text-center">
        <Button variant="outline" onClick={onExit} className="w-full sm:w-auto">
          {language === 'en' ? 'Exit Session' : 'ออกจากการเรียน'}
        </Button>
      </div>
    </div>
  );
}

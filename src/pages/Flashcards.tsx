import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProgress } from '@/hooks/useProgress';
import { flashcards } from '@/data/flashcards';
import { getBilingualText } from '@/data/content';
import { StudySession } from '@/components/FlashCard';
import { RotateCw, Check, Shuffle, Play, Filter } from 'lucide-react';

type StudyMode = 'browse' | 'study' | 'results';
type FilterCategory = 'all' | 'organs' | 'functions' | 'tricks';

interface StudyResults {
  correct: number;
  total: number;
}

export default function Flashcards() {
  const { language } = useLanguage();
  const { progress } = useProgress();
  const [studyMode, setStudyMode] = useState<StudyMode>('browse');
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('all');
  const [studyResults, setStudyResults] = useState<StudyResults | null>(null);

  // Filter cards based on selected category
  const filteredCards = selectedCategory === 'all' 
    ? flashcards 
    : flashcards.filter(card => card.category === selectedCategory);

  const handleStartSession = () => {
    setStudyMode('study');
    setStudyResults(null);
  };

  const handleSessionComplete = (results: StudyResults) => {
    setStudyResults(results);
    setStudyMode('results');
  };

  const handleExitSession = () => {
    setStudyMode('browse');
  };

  const handleShuffle = () => {
    // Shuffle logic would go here
    console.log('Shuffle cards');
  };

  const handleReset = () => {
    // Reset progress logic would go here
    console.log('Reset progress');
  };

  if (studyMode === 'study') {
    return (
      <StudySession
        cards={filteredCards}
        onSessionComplete={handleSessionComplete}
        onExit={handleExitSession}
      />
    );
  }

  if (studyMode === 'results' && studyResults) {
    const percentage = Math.round((studyResults.correct / studyResults.total) * 100);
    
    return (
      <div className="space-y-6 p-4 max-w-2xl mx-auto">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Session Complete!</h2>
          <div className="space-y-2">
            <div className="text-5xl font-bold text-primary">{percentage}%</div>
            <p className="text-muted-foreground">
              {studyResults.correct} out of {studyResults.total} cards correct
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Performance Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{studyResults.correct}</div>
                <p className="text-sm text-muted-foreground">Correct</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{studyResults.total - studyResults.correct}</div>
                <p className="text-sm text-muted-foreground">Incorrect</p>
              </div>
            </div>
            <Progress value={percentage} className="w-full" />
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button className="flex-1" onClick={handleStartSession}>
            <Play className="h-4 w-4 mr-2" />
            Study Again
          </Button>
          <Button variant="outline" className="flex-1" onClick={handleExitSession}>
            Back to Cards
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Flashcards</h1>
        <p className="text-muted-foreground">Practice with active recall</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Progress</CardTitle>
          <CardDescription>Your learning journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Cards Studied</span>
              <span>{progress.cardsStudied}/{flashcards.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Accuracy</span>
              <span>{progress.cardsStudied > 0 ? Math.round((progress.correctAnswers / progress.cardsStudied) * 100) : 0}%</span>
            </div>
            <Progress value={(progress.cardsStudied / flashcards.length) * 100} className="w-full" />
          </div>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter by Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('all')}
            >
              All ({flashcards.length})
            </Button>
            <Button
              variant={selectedCategory === 'organs' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('organs')}
            >
              Organs ({flashcards.filter(c => c.category === 'organs').length})
            </Button>
            <Button
              variant={selectedCategory === 'functions' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('functions')}
            >
              Functions ({flashcards.filter(c => c.category === 'functions').length})
            </Button>
            <Button
              variant={selectedCategory === 'tricks' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('tricks')}
            >
              Tricks ({flashcards.filter(c => c.category === 'tricks').length})
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Study Session Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Study Session</CardTitle>
          <CardDescription>Start a new practice session</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <Button className="flex-1" onClick={handleStartSession}>
                <Play className="h-4 w-4 mr-2" />
                Start Session ({filteredCards.length} cards)
              </Button>
              <Button variant="outline" onClick={handleShuffle}>
                <Shuffle className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              {selectedCategory !== 'all' && `Showing ${selectedCategory} cards only`}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Flashcard Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredCards.slice(0, 6).map((card) => (
          <Card key={card.id} className="h-48 card-hover cursor-pointer" onClick={handleStartSession}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  {card.category}
                </Badge>
                <Badge variant={card.difficulty === 'easy' ? 'default' : card.difficulty === 'medium' ? 'secondary' : 'destructive'}>
                  {card.difficulty}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col justify-between h-full">
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  {getBilingualText(card.front, language)}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {getBilingualText(card.back, language)}
                </p>
              </div>
              <div className="text-xs text-muted-foreground">
                Click to start studying
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={handleShuffle}>
              <Shuffle className="h-4 w-4 mr-2" />
              Shuffle All
            </Button>
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RotateCw className="h-4 w-4 mr-2" />
              Reset Progress
            </Button>
            <Button variant="outline" size="sm">
              <Check className="h-4 w-4 mr-2" />
              Mastered Only
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

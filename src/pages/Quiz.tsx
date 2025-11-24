import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProgress } from '@/hooks/useProgress';
import { quizQuestions } from '@/data/quizQuestions';
import { getBilingualText } from '@/data/content';
import { QuizSession } from '@/components/QuizSession';
import { RotateCcw, Clock, Play, Filter, Target } from 'lucide-react';

type QuizMode = 'browse' | 'quiz' | 'results';
type FilterCategory = 'all' | 'respiratory' | 'phonatory' | 'articulatory';
type TimeLimit = 'none' | 300 | 600; // 5 minutes, 10 minutes

interface QuizResults {
  correct: number;
  total: number;
  timeSpent: number;
}

export default function Quiz() {
  const { language } = useLanguage();
  const { progress } = useProgress();
  const [quizMode, setQuizMode] = useState<QuizMode>('browse');
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('all');
  const [timeLimit, setTimeLimit] = useState<TimeLimit>('none');
  const [quizResults, setQuizResults] = useState<QuizResults | null>(null);
  const [questionCount, setQuestionCount] = useState(10);

  // Filter questions based on selected category
  const filteredQuestions = selectedCategory === 'all' 
    ? quizQuestions 
    : quizQuestions.filter(q => q.category === selectedCategory);

  // Get questions for the quiz (random subset)
  const getQuizQuestions = () => {
    const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(questionCount, shuffled.length));
  };

  const handleStartQuiz = () => {
    setQuizMode('quiz');
    setQuizResults(null);
  };

  const handleQuizComplete = (results: QuizResults) => {
    setQuizResults(results);
    setQuizMode('results');
  };

  const handleExitQuiz = () => {
    setQuizMode('browse');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.round(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (quizMode === 'quiz') {
    return (
      <QuizSession
        questions={getQuizQuestions()}
        onSessionComplete={handleQuizComplete}
        onExit={handleExitQuiz}
        timeLimit={timeLimit === 'none' ? undefined : timeLimit}
      />
    );
  }

  if (quizMode === 'results' && quizResults) {
    const percentage = Math.round((quizResults.correct / quizResults.total) * 100);
    const recentScores = progress.quizScores || [];
    const averageScore = recentScores.length > 0 
      ? Math.round(recentScores.reduce((a, b) => a + b, 0) / recentScores.length)
      : 0;
    
    return (
      <div className="space-y-6 p-4 max-w-2xl mx-auto">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Quiz Complete!</h2>
          <div className="space-y-2">
            <div className="text-5xl font-bold text-primary">{percentage}%</div>
            <p className="text-muted-foreground">
              {quizResults.correct} out of {quizResults.total} correct
            </p>
            <p className="text-sm text-muted-foreground">
              Time: {formatTime(quizResults.timeSpent)}
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
                <div className="text-2xl font-bold text-green-600">{quizResults.correct}</div>
                <p className="text-sm text-muted-foreground">Correct</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{quizResults.total - quizResults.correct}</div>
                <p className="text-sm text-muted-foreground">Incorrect</p>
              </div>
            </div>
            <Progress value={percentage} className="w-full" />
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Average Score:</span>
                <span className="ml-2 font-medium">{averageScore}%</span>
              </div>
              <div>
                <span className="text-muted-foreground">Total Quizzes:</span>
                <span className="ml-2 font-medium">{recentScores.length}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button className="flex-1" onClick={handleStartQuiz}>
            <Play className="h-4 w-4 mr-2" />
            Try Again
          </Button>
          <Button variant="outline" className="flex-1" onClick={handleExitQuiz}>
            Back to Quiz
          </Button>
        </div>
      </div>
    );
  }

  const recentScores = progress.quizScores || [];
  const averageScore = recentScores.length > 0 
    ? Math.round(recentScores.reduce((a, b) => a + b, 0) / recentScores.length)
    : 0;

  return (
    <div className="space-y-6 p-4">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Quiz</h1>
        <p className="text-muted-foreground">Test your knowledge</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{quizQuestions.length}</div>
            <p className="text-xs text-muted-foreground">Available</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageScore}%</div>
            <p className="text-xs text-muted-foreground">Last {recentScores.length} attempts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Best Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentScores.length > 0 ? Math.max(...recentScores) : 0}%</div>
            <p className="text-xs text-muted-foreground">Personal best</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Recent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentScores.length > 0 ? recentScores[recentScores.length - 1] : 0}%</div>
            <p className="text-xs text-muted-foreground">Last attempt</p>
          </CardContent>
        </Card>
      </div>

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
              All ({quizQuestions.length})
            </Button>
            <Button
              variant={selectedCategory === 'respiratory' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('respiratory')}
            >
              Respiratory ({quizQuestions.filter(q => q.category === 'respiratory').length})
            </Button>
            <Button
              variant={selectedCategory === 'phonatory' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('phonatory')}
            >
              Phonatory ({quizQuestions.filter(q => q.category === 'phonatory').length})
            </Button>
            <Button
              variant={selectedCategory === 'articulatory' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('articulatory')}
            >
              Articulatory ({quizQuestions.filter(q => q.category === 'articulatory').length})
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quiz Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Quiz Settings</CardTitle>
          <CardDescription>Configure your quiz experience</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Number of questions</label>
                <select 
                  className="w-full p-2 border rounded-md"
                  value={questionCount}
                  onChange={(e) => setQuestionCount(Number(e.target.value))}
                >
                  <option value={5}>5 questions</option>
                  <option value={10}>10 questions</option>
                  <option value={15}>15 questions</option>
                  <option value={filteredQuestions.length}>All questions ({filteredQuestions.length})</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Time limit</label>
                <select 
                  className="w-full p-2 border rounded-md"
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(e.target.value as TimeLimit)}
                >
                  <option value="none">No time limit</option>
                  <option value="300">5 minutes</option>
                  <option value="600">10 minutes</option>
                </select>
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground">
              {selectedCategory !== 'all' && `Showing ${selectedCategory} questions only (${filteredQuestions.length} available)`}
              {selectedCategory === 'all' && `All questions available (${quizQuestions.length})`}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Start Quiz */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Start Quiz
          </CardTitle>
          <CardDescription>Ready to test your knowledge?</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <Button className="flex-1" onClick={handleStartQuiz}>
                <Play className="h-4 w-4 mr-2" />
                Start Quiz ({Math.min(questionCount, filteredQuestions.length)} questions)
              </Button>
              <Button variant="outline">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
            {timeLimit !== 'none' && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Time limit: {String(timeLimit) === '300' ? '5 minutes' : '10 minutes'}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Sample Questions */}
      <Card>
        <CardHeader>
          <CardTitle>Sample Questions</CardTitle>
          <CardDescription>Preview of quiz questions in your selected language</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredQuestions.slice(0, 3).map((question, index) => (
              <div key={question.id} className="p-4 border rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Q{index + 1}</Badge>
                  <Badge variant={question.difficulty === 'easy' ? 'default' : question.difficulty === 'medium' ? 'secondary' : 'destructive'}>
                    {question.difficulty}
                  </Badge>
                </div>
                <h4 className="font-medium">{getBilingualText(question.question, language)}</h4>
                
                {question.type === 'multiple-choice' && question.options && (
                  <div className="space-y-1">
                    {question.options.map((option, optIndex) => (
                      <div key={optIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className={optIndex === question.correctAnswer ? 'text-green-600 font-medium' : ''}>
                          {optIndex === question.correctAnswer ? '✓' : '○'}
                        </span>
                        {getBilingualText(option, language)}
                      </div>
                    ))}
                  </div>
                )}
                
                {question.type === 'true-false' && (
                  <div className="text-sm text-muted-foreground">
                    <span className={question.correctAnswer === 'true' ? 'text-green-600 font-medium' : 'text-red-600'}>
                      ✓ True
                    </span>
                    <span className="mx-2">/</span>
                    <span className={question.correctAnswer === 'false' ? 'text-green-600 font-medium' : 'text-red-600'}>
                      ✓ False
                    </span>
                  </div>
                )}
                
                <p className="text-xs text-muted-foreground italic">
                  {getBilingualText(question.explanation, language)}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

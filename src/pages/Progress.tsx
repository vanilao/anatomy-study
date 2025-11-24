import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress as ProgressComponent } from '@/components/ui/progress';
import { useProgress } from '@/hooks/useProgress';
import { TrendingUp, Award, Calendar, Target, Clock, CheckCircle } from 'lucide-react';

export default function ProgressPage() {
  const { progress } = useProgress();

  // Calculate derived statistics
  const statistics = useMemo(() => {
    const flashcardAccuracy = progress.cardsStudied > 0 
      ? Math.round((progress.correctAnswers / progress.cardsStudied) * 100)
      : 0;

    const quizAverage = progress.quizScores.length > 0
      ? Math.round(progress.quizScores.reduce((a, b) => a + b, 0) / progress.quizScores.length)
      : 0;

    const recentQuizScores = progress.quizScores.slice(-5);
    const recentQuizAverage = recentQuizScores.length > 0
      ? Math.round(recentQuizScores.reduce((a, b) => a + b, 0) / recentQuizScores.length)
      : 0;

    return {
      flashcardAccuracy,
      quizAverage,
      recentQuizAverage
    };
  }, [progress.cardsStudied, progress.correctAnswers, progress.quizScores]);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const formatDate = (date: Date | null) => {
    if (!date) return 'Never';
    // Simple format without time calculations to avoid impure functions
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-4 sm:space-y-6 p-2 sm:p-4">
      <div className="text-center space-y-1 sm:space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold">Progress</h1>
        <p className="text-muted-foreground text-sm sm:text-base">Track your learning journey</p>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-2">
              <Target className="h-3 w-3 sm:h-4 sm:w-4" />
              Study Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold">{progress.studyStreak}</div>
            <p className="text-xs text-muted-foreground">days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-2">
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
              Cards Studied
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold">{progress.cardsStudied}</div>
            <p className="text-xs text-muted-foreground">total cards</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
              Quiz Average
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold">{statistics.quizAverage}%</div>
            <p className="text-xs text-muted-foreground">score</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-2">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
              Study Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold">{formatTime(progress.totalTimeSpent)}</div>
            <p className="text-xs text-muted-foreground">total time</p>
          </CardContent>
        </Card>
      </div>

      {/* Flashcard Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Flashcard Progress
          </CardTitle>
          <CardDescription>Your flashcard study performance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Cards Studied</span>
              <span>{progress.cardsStudied}</span>
            </div>
            <ProgressComponent value={(progress.cardsStudied / Math.max(1, progress.totalCards)) * 100} className="w-full" />
            <p className="text-xs text-muted-foreground">
              {Math.round((progress.cardsStudied / Math.max(1, progress.totalCards)) * 100)}% of total cards
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Correct Answers:</span>
              <span className="ml-2 font-medium">{progress.correctAnswers}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Accuracy:</span>
              <span className="ml-2 font-medium">{statistics.flashcardAccuracy}%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quiz Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Quiz Performance
          </CardTitle>
          <CardDescription>Your quiz scores over time</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Average Score</span>
              <span className="font-medium">{statistics.quizAverage}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Recent Average (last 5)</span>
              <span className="font-medium">{statistics.recentQuizAverage}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Best Score</span>
              <span className="font-medium">{progress.quizScores.length > 0 ? Math.max(...progress.quizScores) : 0}%</span>
            </div>
          </div>

          {/* Recent Scores Visualization */}
          {progress.quizScores.length > 0 && (
            <div className="space-y-2">
              <div className="text-sm font-medium">Recent Quiz Scores</div>
              <div className="flex gap-2 flex-wrap">
                {progress.quizScores.slice(-10).map((score, index) => (
                  <Badge 
                    key={index} 
                    variant={score >= 80 ? 'default' : score >= 60 ? 'secondary' : 'destructive'}
                    className="text-xs"
                  >
                    {score}%
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {progress.quizScores.length === 0 && (
            <div className="text-center py-4 text-muted-foreground">
              No quiz attempts yet. Take your first quiz to see your progress!
            </div>
          )}
        </CardContent>
      </Card>

      {/* Study Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Study Activity
          </CardTitle>
          <CardDescription>Your recent study activity</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Last Study:</span>
              <span className="ml-2 font-medium">{formatDate(progress.lastStudyDate)}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Current Streak:</span>
              <span className="ml-2 font-medium">{progress.studyStreak} days</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">Study Streak</div>
            <div className="flex gap-1">
              {Array.from({ length: 7 }, (_, i) => (
                <div
                  key={i}
                  className={`h-8 w-8 rounded flex items-center justify-center text-xs font-medium ${
                    i < progress.studyStreak 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {i < progress.studyStreak ? '✓' : ''}
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              {progress.studyStreak} day{progress.studyStreak !== 1 ? 's' : ''} streak!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Achievement Badges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Achievements
          </CardTitle>
          <CardDescription>Your learning milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className={`p-4 border rounded-lg text-center ${
              progress.studyStreak >= 7 ? 'border-primary bg-primary/5' : 'border-muted opacity-50'
            }`}>
              <div className="text-2xl mb-2">🔥</div>
              <div className="font-medium">Week Warrior</div>
              <div className="text-xs text-muted-foreground">
                {progress.studyStreak >= 7 ? '7-day streak achieved!' : 'Study for 7 days straight'}
              </div>
            </div>

            <div className={`p-4 border rounded-lg text-center ${
              statistics.quizAverage >= 80 ? 'border-primary bg-primary/5' : 'border-muted opacity-50'
            }`}>
              <div className="text-2xl mb-2">🎯</div>
              <div className="font-medium">Quiz Master</div>
              <div className="text-xs text-muted-foreground">
                {statistics.quizAverage >= 80 ? '80%+ average achieved!' : 'Maintain 80%+ quiz average'}
              </div>
            </div>

            <div className={`p-4 border rounded-lg text-center ${
              progress.cardsStudied >= 50 ? 'border-primary bg-primary/5' : 'border-muted opacity-50'
            }`}>
              <div className="text-2xl mb-2">�</div>
              <div className="font-medium">Dedicated Learner</div>
              <div className="text-xs text-muted-foreground">
                {progress.cardsStudied >= 50 ? '50 cards studied!' : 'Study 50 flashcards'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { useState } from 'react';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { ProgressProvider } from './contexts/ProgressContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, CreditCard, CheckCircle, BarChart3, Languages } from 'lucide-react';
import Overview from './pages/Overview';
import Flashcards from './pages/Flashcards';
import Quiz from './pages/Quiz';
import ProgressPage from './pages/Progress';

function AppContent() {
  const [activeTab, setActiveTab] = useState('overview');
  const { language, setLanguage } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container flex h-14 items-center justify-between px-2 sm:px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              🎴
            </div>
            <h1 className="text-base sm:text-lg font-semibold">PhonetiCards</h1>
          </div>
          
          <div className="flex items-center gap-1 sm:gap-2">
            <Badge variant="secondary" className="hidden xs:inline-flex text-xs">
              Phonetics
            </Badge>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1 sm:gap-2 h-8 px-2 sm:px-3"
              onClick={() => {
                const nextLang = language === 'en' ? 'th' : language === 'th' ? 'both' : 'en';
                setLanguage(nextLang);
              }}
            >
              <Languages className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline text-xs">{language.toUpperCase()}</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-2 sm:px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Tab Navigation */}
          <div className="border-b bg-muted/30">
            <div className="container px-2 sm:px-4">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 bg-transparent h-auto p-0 gap-0">
                <TabsTrigger 
                  value="overview" 
                  className="flex-col gap-1 h-12 sm:h-16 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent px-1 sm:px-2"
                >
                  <BookOpen className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="text-[10px] sm:text-xs">Learn</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="flashcards" 
                  className="flex-col gap-1 h-12 sm:h-16 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent px-1 sm:px-2"
                >
                  <CreditCard className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="text-[10px] sm:text-xs">Cards</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="quiz" 
                  className="flex-col gap-1 h-12 sm:h-16 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent px-1 sm:px-2"
                >
                  <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="text-[10px] sm:text-xs">Quiz</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="progress" 
                  className="flex-col gap-1 h-12 sm:h-16 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent px-1 sm:px-2"
                >
                  <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="text-[10px] sm:text-xs">Progress</span>
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          {/* Tab Content */}
          <TabsContent value="overview" className="mt-0">
            <Overview />
          </TabsContent>
          <TabsContent value="flashcards" className="mt-0">
            <Flashcards />
          </TabsContent>
          <TabsContent value="quiz" className="mt-0">
            <Quiz />
          </TabsContent>
          <TabsContent value="progress" className="mt-0">
            <ProgressPage />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-3 sm:py-4 mt-6 sm:mt-8">
        <div className="container px-2 sm:px-4 text-center text-sm text-muted-foreground">
          <p className="text-xs sm:text-sm">© 2024 PhonetiCards - Interactive Phonetics Learning</p>
          <p className="text-[10px] sm:text-xs mt-1">Made for linguistics students worldwide 🌍</p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <ProgressProvider>
        <AppContent />
      </ProgressProvider>
    </LanguageProvider>
  );
}

export default App;

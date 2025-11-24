import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { overviewContent, speechOrgans, getBilingualText } from '@/data/content';
import { BookOpen, Info, Lightbulb } from 'lucide-react';

export default function Overview() {
  const { language } = useLanguage();

  return (
    <div className="space-y-4 sm:space-y-6 p-2 sm:p-4">
      <div className="text-center space-y-1 sm:space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold">Learn</h1>
        <p className="text-muted-foreground text-sm sm:text-base">Explore speech organs and phonetics</p>
      </div>

      <Accordion type="multiple" className="w-full space-y-3 sm:space-y-4">
        {overviewContent.map((section) => (
          <AccordionItem key={section.id} value={section.id} className="border rounded-lg">
            <AccordionTrigger className="px-3 sm:px-4 hover:no-underline py-3 sm:py-4">
              <div className="flex items-center gap-2 text-left">
                <BookOpen className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="font-semibold text-sm sm:text-base">{getBilingualText(section.title, language)}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-3 sm:px-4 pb-4">
              <div className="space-y-3 sm:space-y-4">
                <p className="text-sm leading-relaxed">
                  {getBilingualText(section.content, language)}
                </p>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    {language === 'en' ? 'Key Terms' : 'คำศัพท์สำคัญ'}
                  </h4>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {section.keyTerms.map((term, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {getBilingualText(term, language)}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            Speech Organs Reference
          </CardTitle>
          <CardDescription>
            Quick reference guide to all speech organs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {speechOrgans.map((organ) => (
              <div key={organ.id} className="space-y-2 p-3 border rounded-lg">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{getBilingualText(organ.name, language)}</h4>
                  <Badge variant="outline" className="text-xs">
                    {organ.system}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {getBilingualText(organ.location, language)}
                </p>
                <p className="text-xs">
                  {getBilingualText(organ.function, language)}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { getBilingualText } from '@/data/content';
import { BookOpen, Eye, Info } from 'lucide-react';

const speechOrgans = [
  {
    name: { en: 'Respiratory System', th: 'ระบบทางเดินหายใจ' },
    description: { 
      en: 'Power source for speech production',
      th: 'แหล่งพลังงานสำหรับการผลิตเสียงพูด'
    },
    organs: [
      { name: { en: 'Lungs', th: 'ปอด' }, function: { en: 'Air supply', th: 'แหล่งลม' } },
      { name: { en: 'Diaphragm', th: 'กล้ามเนื้อหูรูป' }, function: { en: 'Breathing control', th: 'ควบคุมการหายใจ' } },
      { name: { en: 'Trachea', th: 'หลอดลม' }, function: { en: 'Air passage', th: 'ทางผ่านลม' } },
      { name: { en: 'Bronchi', th: 'หลอดลมขนาดเล็ก' }, function: { en: 'Air distribution', th: 'การกระจายลม' } }
    ],
    icon: '💨',
    color: 'blue'
  },
  {
    name: { en: 'Phonatory System', th: 'ระบบเสียง' },
    description: { 
      en: 'Sound generation system',
      th: 'ระบบสร้างเสียง'
    },
    organs: [
      { name: { en: 'Larynx', th: 'กล่องเสียง' }, function: { en: 'Voice box', th: 'กล่องเสียง' } },
      { name: { en: 'Vocal Cords', th: 'เส้นเสียง' }, function: { en: 'Sound vibration', th: 'การสั่นสะเทือนเสียง' } },
      { name: { en: 'Glottis', th: 'แผ่นปิดเสียง' }, function: { en: 'Sound control', th: 'ควบคุมเสียง' } }
    ],
    icon: '🎵',
    color: 'green'
  },
  {
    name: { en: 'Articulatory System', th: 'ระบบการออกเสียง' },
    description: { 
      en: 'Sound shaping system',
      th: 'ระบบแต่งเสียง'
    },
    organs: [
      { name: { en: 'Tongue', th: 'ลิ้น' }, function: { en: 'Most flexible articulator', th: 'อวัยวะออกเสียงที่ยืดหยุ่นที่สุด' } },
      { name: { en: 'Lips', th: 'ริมฝีปาก' }, function: { en: 'Sound shaping', th: 'การแต่งเสียง' } },
      { name: { en: 'Teeth', th: 'ฟัน' }, function: { en: 'Contact points', th: 'จุดสัมผัส' } },
      { name: { en: 'Palate', th: 'เพดานปาก' }, function: { en: 'Sound resonance', th: 'การสะท้อนเสียง' } },
      { name: { en: 'Nasal Cavity', th: 'โพรงจมูก' }, function: { en: 'Nasal resonance', th: 'การสะท้อนเสียงนาสิก' } }
    ],
    icon: '🗣️',
    color: 'amber'
  }
];

export default function Diagram() {
  const { language } = useLanguage();

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-500 border-blue-200 text-blue-50';
      case 'green': return 'bg-green-500 border-green-200 text-green-50';
      case 'amber': return 'bg-amber-500 border-amber-200 text-amber-50';
      default: return 'bg-gray-500 border-gray-200 text-gray-50';
    }
  };

  const getBadgeColor = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'green': return 'bg-green-100 text-green-800 border-green-200';
      case 'amber': return 'bg-amber-100 text-amber-800 border-amber-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6 p-4">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Speech Organs Overview</h1>
        <p className="text-muted-foreground">
          Learn about the three main systems involved in speech production
        </p>
      </div>

      {/* Main Systems Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {speechOrgans.map((system, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className={`text-center ${getColorClasses(system.color)}`}>
              <div className="text-4xl mb-2">{system.icon}</div>
              <CardTitle className="text-xl">
                {getBilingualText(system.name, language)}
              </CardTitle>
              <CardDescription className="text-base opacity-90">
                {getBilingualText(system.description, language)}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-muted-foreground">
                  {language === 'en' ? 'Key Organs:' : 'อวัยวะหลัก:'}
                </h4>
                <div className="space-y-2">
                  {system.organs.map((organ, organIndex) => (
                    <div key={organIndex} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                      <div>
                        <div className="font-medium text-sm">
                          {getBilingualText(organ.name, language)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {getBilingualText(organ.function, language)}
                        </div>
                      </div>
                      <Badge variant="outline" className={getBadgeColor(system.color)}>
                        {organIndex + 1}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* How It Works */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            How Speech Production Works
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                <div className="text-2xl mb-2">💨</div>
                <h4 className="font-semibold text-blue-800 dark:text-blue-200">Step 1</h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  {language === 'en' 
                    ? 'Lungs provide airflow' 
                    : 'ปอดให้ลมหายใจ'
                  }
                </p>
              </div>
              <div className="text-center p-4 rounded-lg bg-green-50 dark:bg-green-950/20">
                <div className="text-2xl mb-2">🎵</div>
                <h4 className="font-semibold text-green-800 dark:text-green-200">Step 2</h4>
                <p className="text-sm text-green-700 dark:text-green-300">
                  {language === 'en' 
                    ? 'Larynx creates sound' 
                    : 'กล่องเสียงสร้างเสียง'
                  }
                </p>
              </div>
              <div className="text-center p-4 rounded-lg bg-amber-50 dark:bg-amber-950/20">
                <div className="text-2xl mb-2">🗣️</div>
                <h4 className="font-semibold text-amber-800 dark:text-amber-200">Step 3</h4>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  {language === 'en' 
                    ? 'Articulators shape sound' 
                    : 'อวัยวะออกเสียงแต่งเสียง'
                  }
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Study Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Study Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
              <div>
                <h4 className="font-medium text-sm">Visual Learning</h4>
                <p className="text-xs text-muted-foreground">
                  {language === 'en' 
                    ? 'Use flashcards to memorize organ names and functions'
                    : 'ใช้การ์ดความจำเพื่อจดจำชื่อและหน้าที่ของอวัยวะ'
                  }
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
              <div>
                <h4 className="font-medium text-sm">Practice Sounds</h4>
                <p className="text-xs text-muted-foreground">
                  {language === 'en' 
                    ? 'Make different sounds while touching the organs'
                    : 'สร้างเสียงต่างๆ ขณะสัมผัสอวัยวะ'
                  }
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
              <div>
                <h4 className="font-medium text-sm">System Approach</h4>
                <p className="text-xs text-muted-foreground">
                  {language === 'en' 
                    ? 'Study each system separately before connecting them'
                    : 'ศึกษาแต่ละระบบแยกกันก่อนเชื่อมต่อ'
                  }
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
              <div>
                <h4 className="font-medium text-sm">Self-Testing</h4>
                <p className="text-xs text-muted-foreground">
                  {language === 'en' 
                    ? 'Quiz yourself on organ locations and functions'
                    : 'ทดสอบตนเองเกี่ยวกับตำแหน่งและหน้าที่ของอวัยวะ'
                  }
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Reference */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            Quick Reference
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="p-3 rounded-lg bg-muted/50">
              <h5 className="font-medium text-sm mb-2">
                {language === 'en' ? 'Respiratory = Power' : 'ระบบทางเดินหายใจ = พลังงาน'}
              </h5>
              <p className="text-xs text-muted-foreground">
                {language === 'en' 
                  ? 'Provides the air pressure needed for sound' 
                  : 'ให้แรงดันลมที่จำเป็นสำหรับเสียง'
                }
              </p>
            </div>
            <div className="p-3 rounded-lg bg-muted/50">
              <h5 className="font-medium text-sm mb-2">
                {language === 'en' ? 'Phonatory = Sound' : 'ระบบเสียง = เสียง'}
              </h5>
              <p className="text-xs text-muted-foreground">
                {language === 'en' 
                  ? 'Creates the basic sound vibrations' 
                  : 'สร้างการสั่นสะเทือนเสียงพื้นฐาน'
                }
              </p>
            </div>
            <div className="p-3 rounded-lg bg-muted/50">
              <h5 className="font-medium text-sm mb-2">
                {language === 'en' ? 'Articulatory = Shape' : 'ระบบการออกเสียง = รูปร่าง'}
              </h5>
              <p className="text-xs text-muted-foreground">
                {language === 'en' 
                  ? 'Shapes the sound into specific speech sounds' 
                  : 'แต่งเสียงให้เป็นเสียงพูดเฉพาะ'
                }
              </p>
            </div>
            <div className="p-3 rounded-lg bg-muted/50">
              <h5 className="font-medium text-sm mb-2">
                {language === 'en' ? 'All Three = Speech' : 'ทั้งสาม = การพูด'}
              </h5>
              <p className="text-xs text-muted-foreground">
                {language === 'en' 
                  ? 'Working together to produce spoken language' 
                  : 'ทำงานร่วมกันเพื่อสร้างภาษาพูด'
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

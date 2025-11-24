import type { FlashCard } from '../types';

export const flashcards: FlashCard[] = [
  {
    id: 'fc001',
    category: 'organs',
    front: { en: 'Lungs', th: 'ปอด' },
    back: { 
      en: 'Primary respiratory organs that provide airflow for speech production. Located in the thoracic cavity.',
      th: 'อวัยวะทางเดินหายใจหลักที่ให้การไหลของอากาศสำหรับการผลิตเสียงพูด ตั้งอยู่ในช่องอก'
    },
    difficulty: 'easy',
    lastStudied: null,
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    id: 'fc002',
    category: 'organs',
    front: { en: 'Larynx', th: 'กล่องเสียง' },
    back: { 
      en: 'Voice box containing vocal folds. Located at the top of the trachea.',
      th: 'กล่องเสียงที่มีเส้นเสียง ตั้งอยู่ที่ด้านบนของหลอดลม'
    },
    difficulty: 'easy',
    lastStudied: null,
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    id: 'fc003',
    category: 'organs',
    front: { en: 'Vocal Folds', th: 'เส้นเสียง' },
    back: { 
      en: 'Two bands of muscle tissue that vibrate to produce voice. Located in the larynx.',
      th: 'กลุ่มกล้ามเนื้อสองแถวที่สั่นสะเทือนเพื่อผลิตเสียงพูด ตั้งอยู่ในกล่องเสียง'
    },
    difficulty: 'medium',
    lastStudied: null,
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    id: 'fc004',
    category: 'organs',
    front: { en: 'Tongue', th: 'ลิ้น' },
    back: { 
      en: 'Primary articulator for speech sounds. Helps shape consonants and vowels.',
      th: 'อวัยวะออกเสียงหลักสำหรับเสียงพูด ช่วยกำหนดรูปพยัญชนะและสระ'
    },
    difficulty: 'easy',
    lastStudied: null,
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    id: 'fc005',
    category: 'organs',
    front: { en: 'Teeth', th: 'ฟัน' },
    back: { 
      en: 'Used with tongue to produce fricatives and affricates. Located in upper and lower jaw.',
      th: 'ใช้ร่วมกับลิ้นเพื่อผลิตเสียงซุบและเสียงแอฟฟริเคต ตั้งอยู่ในขากรรไกรบนและล่าง'
    },
    difficulty: 'easy',
    lastStudied: null,
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    id: 'fc006',
    category: 'organs',
    front: { en: 'Lips', th: 'ริมฝีปาก' },
    back: { 
      en: 'Articulators for bilabial sounds. Can be rounded or spread.',
      th: 'อวัยวะออกเสียงสำหรับเสียงริมฝีปากสองตำแหน่ง สามารถกลมหรือแบนได้'
    },
    difficulty: 'easy',
    lastStudied: null,
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    id: 'fc007',
    category: 'organs',
    front: { en: 'Hard Palate', th: 'เพดานปากแข็ง' },
    back: { 
      en: 'Bony roof of the mouth. Used for alveolar and palatal sounds.',
      th: 'เพดานปากส่วนที่เป็นกระดูก ใช้สำหรับเสียงเหงือกและเสียงเพดาน'
    },
    difficulty: 'medium',
    lastStudied: null,
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    id: 'fc008',
    category: 'organs',
    front: { en: 'Soft Palate', th: 'เพดานปากอ่อน' },
    back: { 
      en: 'Soft tissue at the back of the mouth. Controls nasal airflow.',
      th: 'เนื้อเยื่ออ่อนที่ด้านหลังของปาก ควบคุมการไหลของอากาศทางจมูก'
    },
    difficulty: 'medium',
    lastStudied: null,
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    id: 'fc009',
    category: 'organs',
    front: { en: 'Diaphragm', th: 'กะบังลม' },
    back: { 
      en: 'Muscle below lungs that controls breathing. Essential for speech airflow.',
      th: 'กล้ามเนื้อใต้ปอดที่ควบคุมการหายใจ จำเป็นสำหรับการไหลของอากาศในการพูด'
    },
    difficulty: 'medium',
    lastStudied: null,
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    id: 'fc010',
    category: 'organs',
    front: { en: 'Trachea', th: 'หลอดลม' },
    back: { 
      en: 'Windpipe connecting larynx to lungs. Transports air for speech.',
      th: 'ท่อลมเชื่อมต่อระหว่างกล่องเสียงและปอด ขนส่งอากาศสำหรับการพูด'
    },
    difficulty: 'easy',
    lastStudied: null,
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    id: 'fc011',
    category: 'functions',
    front: { en: 'What produces voiced sounds?', th: 'อะไรที่ทำให้เกิดเสียงต้นเสียง?' },
    back: { 
      en: 'Vocal fold vibration in the larynx creates voiced sounds like /b/, /d/, /g/.',
      th: 'การสั่นสะเทือนของเส้นเสียงในกล่องเสียงสร้างเสียงต้นเสียงเช่น /b/, /d/, /g/'
    },
    difficulty: 'medium',
    lastStudied: null,
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    id: 'fc012',
    category: 'functions',
    front: { en: 'What is the primary power source for speech?', th: 'แหล่งพลังหลักสำหรับการพูดคืออะไร?' },
    back: { 
      en: 'The respiratory system (lungs and diaphragm) provides the airflow power.',
      th: 'ระบบทางเดินหายใจ (ปอดและกะบังลม) ให้พลังการไหลของอากาศ'
    },
    difficulty: 'easy',
    lastStudied: null,
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    id: 'fc013',
    category: 'functions',
    front: { en: 'Which organ shapes most consonants?', th: 'อวัยวะใดที่กำหนดรูปพยัญชนะส่วนใหญ่?' },
    back: { 
      en: 'The tongue is the primary articulator, shaping most consonant sounds.',
      th: 'ลิ้นเป็นอวัยวะออกเสียงหลัก กำหนดรูปเสียงพยัญชนะส่วนใหญ่'
    },
    difficulty: 'easy',
    lastStudied: null,
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    id: 'fc014',
    category: 'tricks',
    front: { en: 'BPT: What does this mnemonic mean?', th: 'BPT: ช่วยจำนี้หมายถึงอะไร?' },
    back: { 
      en: 'BPT = Bilabial Plosive Teeth. Remember: /p/, /b/, /t/ use lips or teeth.',
      th: 'BPT = Bilabial Plosive Teeth จำไว้: /p/, /b/, /t/ ใช้ริมฝีปากหรือฟัน'
    },
    difficulty: 'hard',
    lastStudied: null,
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    id: 'fc015',
    category: 'tricks',
    front: { en: 'Vowel tongue position: High vs Low?', th: 'ตำแหน่งลิ้นสระ: สูง vs ต่ำ?' },
    back: { 
      en: 'High vowels: tongue close to roof (/i/, /u/). Low vowels: tongue low (/a/, /æ/).',
      th: 'สระสูง: ลิ้นใกล้เพดาน (/i/, /u/). สระต่ำ: ลิ้นต่ำ (/a/, /æ/)'
    },
    difficulty: 'medium',
    lastStudied: null,
    timesCorrect: 0,
    timesIncorrect: 0,
  },
];

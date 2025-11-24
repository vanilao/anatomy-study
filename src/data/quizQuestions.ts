import type { QuizQuestion } from '../types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'qz001',
    type: 'multiple-choice',
    question: { 
      en: 'Which organ is responsible for producing voice?', 
      th: 'อวัยวะใดที่รับผิดชอบการผลิตเสียงพูด?' 
    },
    options: [
      { en: 'Lungs', th: 'ปอด' },
      { en: 'Larynx', th: 'กล่องเสียง' },
      { en: 'Tongue', th: 'ลิ้น' },
      { en: 'Teeth', th: 'ฟัน' }
    ],
    correctAnswer: 1,
    explanation: { 
      en: 'The larynx contains vocal folds that vibrate to produce voice. Lungs provide airflow, tongue shapes sounds, and teeth help with articulation.',
      th: 'กล่องเสียงมีเส้นเสียงที่สั่นสะเทือนเพื่อผลิตเสียงพูด ปอดให้การไหลของอากาศ ลิ้นกำหนดรูปเสียง และฟันช่วยในการออกเสียง'
    },
    difficulty: 'easy',
    category: 'phonatory'
  },
  {
    id: 'qz002',
    type: 'multiple-choice',
    question: { 
      en: 'What is the primary function of the diaphragm in speech?', 
      th: 'หน้าที่หลักของกะบังลมในการพูดคืออะไร?' 
    },
    options: [
      { en: 'Shape vowels', th: 'กำหนดรูปสระ' },
      { en: 'Control breathing', th: 'ควบคุมการหายใจ' },
      { en: 'Produce consonants', th: 'ผลิตพยัญชนะ' },
      { en: 'Filter sound', th: 'กรองเสียง' }
    ],
    correctAnswer: 1,
    explanation: { 
      en: 'The diaphragm controls breathing by contracting and relaxing, providing the airflow necessary for speech production.',
      th: 'กะบังลมควบคุมการหายใจโดยการหดและคลายตัว ให้การไหลของอากาศที่จำเป็นสำหรับการผลิตเสียงพูด'
    },
    difficulty: 'easy',
    category: 'respiratory'
  },
  {
    id: 'qz003',
    type: 'true-false',
    question: { 
      en: 'The tongue is the most important articulator for producing consonants.', 
      th: 'ลิ้นเป็นอวัยวะออกเสียงที่สำคัญที่สุดสำหรับการผลิตพยัญชนะ' 
    },
    correctAnswer: 'true',
    explanation: { 
      en: 'True. The tongue can move to various positions in the mouth and is involved in producing almost all consonant sounds.',
      th: 'ถูกต้อง ลิ้นสามารถเคลื่อนที่ไปยังตำแหน่งต่างๆ ในปากและมีส่วนร่วมในการผลิตเสียงพยัญชนะเกือบทั้งหมด'
    },
    difficulty: 'easy',
    category: 'articulatory'
  },
  {
    id: 'qz004',
    type: 'multiple-choice',
    question: { 
      en: 'Which sounds are produced using both lips?', 
      th: 'เสียงใดถูกผลิตโดยใช้ริมฝีปากทั้งสอง?' 
    },
    options: [
      { en: '/t/, /d/, /n/', th: '/t/, /d/, /n/' },
      { en: '/p/, /b/, /m/', th: '/p/, /b/, /m/' },
      { en: '/k/, /g/, /ŋ/', th: '/k/, /g/, /ŋ/' },
      { en: '/f/, /v/', th: '/f/, /v/' }
    ],
    correctAnswer: 1,
    explanation: { 
      en: 'Bilabial sounds like /p/, /b/, /m/ are produced using both lips. These are called bilabial consonants.',
      th: 'เสียงริมฝีปากสองตำแหน่งเช่น /p/, /b/, /m/ ถูกผลิตโดยใช้ริมฝีปากทั้งสอง เรียกว่าพยัญชนะริมฝีปากสองตำแหน่ง'
    },
    difficulty: 'medium',
    category: 'articulatory'
  },
  {
    id: 'qz005',
    type: 'fill-blank',
    question: { 
      en: 'The _____ is also known as the voice box and contains the vocal folds.', 
      th: '_____ หรือที่เรียกว่ากล่องเสียง มีเส้นเสียงอยู่ภายใน' 
    },
    correctAnswer: 'larynx',
    explanation: { 
      en: 'The larynx, commonly called the voice box, houses the vocal folds which vibrate to produce voice.',
      th: 'กล่องเสียง หรือ larynx เป็นที่อยู่ของเส้นเสียงซึ่งสั่นสะเทือนเพื่อผลิตเสียงพูด'
    },
    difficulty: 'medium',
    category: 'phonatory'
  },
  {
    id: 'qz006',
    type: 'true-false',
    question: { 
      en: 'Voiced sounds are produced without vocal fold vibration.', 
      th: 'เสียงต้นเสียงถูกผลิตโดยไม่มีการสั่นสะเทือนของเส้นเสียง' 
    },
    correctAnswer: 'false',
    explanation: { 
      en: 'False. Voiced sounds like /b/, /d/, /g/ require vocal fold vibration. Voiceless sounds like /p/, /t/, /k/ do not.',
      th: 'ผิด เสียงต้นเสียงเช่น /b/, /d/, /g/ ต้องการการสั่นสะเทือนของเส้นเสียง เสียงอดเสียงเช่น /p/, /t/, /k/ ไม่ต้องการ'
    },
    difficulty: 'medium',
    category: 'phonatory'
  },
  {
    id: 'qz007',
    type: 'multiple-choice',
    question: { 
      en: 'Where is the soft palate located?', 
      th: 'เพดานปากอ่อนตั้งอยู่ที่ใด?' 
    },
    options: [
      { en: 'Front of the mouth', th: 'ด้านหน้าของปาก' },
      { en: 'Behind the hard palate', th: 'ด้านหลังเพดานปากแข็ง' },
      { en: 'Below the tongue', th: 'ใต้ลิ้น' },
      { en: 'Inside the larynx', th: 'ภายในกล่องเสียง' }
    ],
    correctAnswer: 1,
    explanation: { 
      en: 'The soft palate is located at the back of the mouth, behind the hard palate. It can be raised or lowered to control nasal airflow.',
      th: 'เพดานปากอ่อนตั้งอยู่ที่ด้านหลังของปาก ด้านหลังเพดานปากแข็ง สามารถยกขึ้นหรือลดลงเพื่อควบคุมการไหลของอากาศทางจมูก'
    },
    difficulty: 'medium',
    category: 'articulatory'
  },
  {
    id: 'qz008',
    type: 'fill-blank',
    question: { 
      en: 'The _____ provides the power source for speech by controlling airflow.', 
      th: '_____ ให้แหล่งพลังสำหรับการพูดโดยการควบคุมการไหลของอากาศ' 
    },
    correctAnswer: 'respiratory',
    explanation: { 
      en: 'The respiratory system, including lungs and diaphragm, provides the airflow power needed for speech production.',
      th: 'ระบบทางเดินหายใจ รวมถึงปอดและกะบังลม ให้พลังการไหลของอากาศที่จำเป็นสำหรับการผลิตเสียงพูด'
    },
    difficulty: 'easy',
    category: 'respiratory'
  },
  {
    id: 'qz009',
    type: 'multiple-choice',
    question: { 
      en: 'Which of these is a place of articulation?', 
      th: 'ข้อใดเหล่านี้เป็นตำแหน่งการออกเสียง?' 
    },
    options: [
      { en: 'Voicing', th: 'การเป็นเสียงต้นเสียง' },
      { en: 'Alveolar ridge', th: 'สันเหงือก' },
      { en: 'Manner', th: 'ลักษณะการออกเสียง' },
      { en: 'Pitch', th: 'ระดับเสียง' }
    ],
    correctAnswer: 1,
    explanation: { 
      en: 'The alveolar ridge is a place of articulation where sounds like /t/, /d/, /s/, /z/ are produced. Voicing and manner are features, not places.',
      th: 'สันเหงือกเป็นตำแหน่งการออกเสียงที่ผลิตเสียงเช่น /t/, /d/, /s/, /z/ การเป็นเสียงต้นเสียงและลักษณะการออกเสียงเป็นลักษณะ ไม่ใช่ตำแหน่ง'
    },
    difficulty: 'hard',
    category: 'articulatory'
  },
  {
    id: 'qz010',
    type: 'true-false',
    question: { 
      en: 'The trachea connects the larynx to the lungs.', 
      th: 'หลอดลมเชื่อมต่อกล่องเสียงกับปอด' 
    },
    correctAnswer: 'true',
    explanation: { 
      en: 'True. The trachea, or windpipe, is the tube that carries air from the larynx down to the lungs.',
      th: 'ถูกต้อง หลอดลมหรือ windpipe เป็นท่อที่ขนส่งอากาศจากกล่องเสียงลงไปยังปอด'
    },
    difficulty: 'easy',
    category: 'respiratory'
  }
];

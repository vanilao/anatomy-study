import type { BilingualText, SpeechOrgan, ContentSection } from '../types';

export const speechOrgans: SpeechOrgan[] = [
  {
    id: 'lungs',
    name: { en: 'Lungs', th: 'ปอด' },
    location: { en: 'Thoracic cavity', th: 'ช่องอก' },
    function: { en: 'Provide airflow for speech', th: 'ให้การไหลของอากาศสำหรับการพูด' },
    description: { 
      en: 'The lungs are the primary organs of the respiratory system. They expand and contract to draw in air and expel it, providing the necessary airflow that powers speech production.',
      th: 'ปอดเป็นอวัยวะหลักของระบบทางเดินหายใจ พวกมันขยายและหดตัวเพื่อดูดอากาศเข้าและขับออก ให้การไหลของอากาศที่จำเป็นสำหรับการผลิตเสียงพูด'
    },
    system: 'respiratory'
  },
  {
    id: 'larynx',
    name: { en: 'Larynx', th: 'กล่องเสียง' },
    location: { en: 'Top of trachea', th: 'ด้านบนของหลอดลม' },
    function: { en: 'Voice production', th: 'การผลิตเสียงพูด' },
    description: { 
      en: 'The larynx, or voice box, contains the vocal folds. It\'s located at the top of the trachea and is responsible for producing voice through vocal fold vibration.',
      th: 'กล่องเสียงหรือ larynx มีเส้นเสียงอยู่ภายใน ตั้งอยู่ที่ด้านบนของหลอดลมและรับผิดชอบการผลิตเสียงพูดผ่านการสั่นสะเทือนของเส้นเสียง'
    },
    system: 'phonatory'
  },
  {
    id: 'vocal-folds',
    name: { en: 'Vocal Folds', th: 'เส้นเสียง' },
    location: { en: 'Inside larynx', th: 'ภายในกล่องเสียง' },
    function: { en: 'Sound vibration', th: 'การสั่นสะเทือนของเสียง' },
    description: { 
      en: 'Two bands of muscle tissue that vibrate when air passes through them. The vibration creates the basic sound that is then shaped by the articulators.',
      th: 'กลุ่มกล้ามเนื้อสองแถวที่สั่นสะเทือนเมื่ออากาศผ่าน การสั่นสะเทือนสร้างเสียงพื้นฐานที่ถูกกำหนดรูปโดยอวัยวะออกเสียง'
    },
    system: 'phonatory'
  },
  {
    id: 'tongue',
    name: { en: 'Tongue', th: 'ลิ้น' },
    location: { en: 'Floor of mouth', th: 'พื้นปาก' },
    function: { en: 'Primary articulator', th: 'อวัยวะออกเสียงหลัก' },
    description: { 
      en: 'The most important articulator for speech. It can move to various positions to create different vowel and consonant sounds.',
      th: 'อวัยวะออกเสียงที่สำคัญที่สุดสำหรับการพูด สามารถเคลื่อนที่ไปยังตำแหน่งต่างๆ เพื่อสร้างเสียงสระและพยัญชนะที่แตกต่างกัน'
    },
    system: 'articulatory'
  },
  {
    id: 'teeth',
    name: { en: 'Teeth', th: 'ฟัน' },
    location: { en: 'Upper and lower jaws', th: 'ขากรรไกรบนและล่าง' },
    function: { en: 'Articulation aid', th: 'ช่วยการออกเสียง' },
    description: { 
      en: 'Work with the tongue to produce fricative and affricate sounds. The upper teeth are particularly important for sounds like /f/, /v/, /θ/, /ð/.',
      th: 'ทำงานร่วมกับลิ้นเพื่อผลิตเสียงซุบและเสียงแอฟฟริเคต ฟันข้างบนมีความสำคัญอย่างยิ่งสำหรับเสียงเช่น /f/, /v/, /θ/, /ð/'
    },
    system: 'articulatory'
  },
  {
    id: 'lips',
    name: { en: 'Lips', th: 'ริมฝีปาก' },
    location: { en: 'Mouth opening', th: 'ปาก' },
    function: { en: 'Bilabial articulation', th: 'การออกเสียงริมฝีปากสองตำแหน่ง' },
    description: { 
      en: 'Can be rounded, spread, or neutral to shape different sounds. Essential for bilabial consonants like /p/, /b/, /m/ and rounded vowels.',
      th: 'สามารถกลม แบน หรือเป็นกลางเพื่อกำหนดรูปเสียงต่างๆ จำเป็นสำหรับพยัญชนะริมฝีปากสองตำแหน่งเช่น /p/, /b/, /m/ และสระปากกลม'
    },
    system: 'articulatory'
  },
  {
    id: 'hard-palate',
    name: { en: 'Hard Palate', th: 'เพดานปากแข็ง' },
    location: { en: 'Roof of mouth', th: 'เพดานปาก' },
    function: { en: 'Palatal articulation', th: 'การออกเสียงเพดาน' },
    description: { 
      en: 'The bony front part of the roof of the mouth. Used for alveolar and palatal sounds like /t/, /d/, /s/, /z/, /ʃ/, /ʒ/.',
      th: 'ส่วนหน้าของเพดานปากที่เป็นกระดูก ใช้สำหรับเสียงเหงือกและเสียงเพดานเช่น /t/, /d/, /s/, /z/, /ʃ/, /ʒ/'
    },
    system: 'articulatory'
  },
  {
    id: 'soft-palate',
    name: { en: 'Soft Palate', th: 'เพดานปากอ่อน' },
    location: { en: 'Back of mouth roof', th: 'ด้านหลังเพดานปาก' },
    function: { en: 'Nasal airflow control', th: 'การควบคุมการไหลของอากาศทางจมูก' },
    description: { 
      en: 'The soft tissue at the back of the mouth. Can be raised to block nasal airflow (oral sounds) or lowered to allow it (nasal sounds).',
      th: 'เนื้อเยื่ออ่อนที่ด้านหลังของปาก สามารถยกขึ้นเพื่อบล็อกการไหลของอากาศทางจมูก (เสียงปาก) หรือลดลงเพื่ออนุญาต (เสียงจมูก)'
    },
    system: 'articulatory'
  },
  {
    id: 'diaphragm',
    name: { en: 'Diaphragm', th: 'กะบังลม' },
    location: { en: 'Below lungs', th: 'ใต้ปอด' },
    function: { en: 'Breathing control', th: 'การควบคุมการหายใจ' },
    description: { 
      en: 'Dome-shaped muscle below the lungs. Contracts and relaxes to control breathing, providing the power source for speech.',
      th: 'กล้ามเนื้อรูปโดมใต้ปอด หดและคลายตัวเพื่อควบคุมการหายใจ ให้แหล่งพลังสำหรับการพูด'
    },
    system: 'respiratory'
  },
  {
    id: 'trachea',
    name: { en: 'Trachea', th: 'หลอดลม' },
    location: { en: 'Neck to chest', th: 'คอถึงอก' },
    function: { en: 'Air passage', th: 'ทางผ่านของอากาศ' },
    description: { 
      en: 'The windpipe connecting the larynx to the lungs. Transports air from the larynx to the lungs and vice versa.',
      th: 'ท่อลมเชื่อมต่อระหว่างกล่องเสียงและปอด ขนส่งอากาศจากกล่องเสียงไปยังปอดและในทางกลับกัน'
    },
    system: 'respiratory'
  }
];

export const overviewContent: ContentSection[] = [
  {
    id: 'introduction',
    title: { en: 'Introduction to Speech Organs', th: 'บทนำสู่อวัยวะการพูด' },
    content: { 
      en: 'Speech production involves three main systems working together: the respiratory system provides power, the phonatory system creates sound, and the articulatory system shapes that sound into specific speech sounds. Understanding these organs is essential for studying phonetics and improving pronunciation.',
      th: 'การผลิตเสียงพูดเกี่ยวข้องกับระบบหลักสามระบบที่ทำงานร่วมกัน: ระบบทางเดินหายใจให้พลัง ระบบเสียงสร้างเสียง และระบบการออกเสียงกำหนดรูปเสียงนั้นเป็นเสียงพูดเฉพาะ การเข้าใจอวัยวะเหล่านี้มีความจำเป็นสำหรับการศึกษาสัทศาสตร์และการปรับปรุงการออกเสียง'
    },
    keyTerms: [
      { en: 'Respiratory system', th: 'ระบบทางเดินหายใจ' },
      { en: 'Phonatory system', th: 'ระบบเสียง' },
      { en: 'Articulatory system', th: 'ระบบการออกเสียง' },
      { en: 'Phonetics', th: 'สัทศาสตร์' }
    ]
  },
  {
    id: 'respiratory-system',
    title: { en: 'The Respiratory System', th: 'ระบบทางเดินหายใจ' },
    content: { 
      en: 'The respiratory system serves as the power source for speech. It consists of the lungs, diaphragm, and trachea. When we speak, the diaphragm contracts, pushing air from the lungs up through the trachea to the larynx. This airflow is essential - without it, no speech sounds can be produced.',
      th: 'ระบบทางเดินหายใจทำหน้าที่เป็นแหล่งพลังสำหรับการพูด ประกอบด้วยปอด กะบังลม และหลอดลม เมื่อเราพูด กะบังลมจะหดตัว ผลักอากาศจากปอดขึ้นผ่านหลอดลมไปยังกล่องเสียง การไหลของอากาศนี้เป็นสิ่งจำเป็น - โดยไม่มีมัน ไม่สามารถผลิตเสียงพูดได้'
    },
    keyTerms: [
      { en: 'Lungs', th: 'ปอด' },
      { en: 'Diaphragm', th: 'กะบังลม' },
      { en: 'Trachea', th: 'หลอดลม' },
      { en: 'Airflow', th: 'การไหลของอากาศ' }
    ]
  },
  {
    id: 'phonatory-system',
    title: { en: 'The Phonatory System', th: 'ระบบเสียง' },
    content: { 
      en: 'The phonatory system, located in the larynx, is where sound is actually produced. The key components are the vocal folds, which can vibrate at different frequencies to create different pitches. When air passes through the vibrating vocal folds, it creates a buzzing sound that becomes the raw material for speech.',
      th: 'ระบบเสียงซึ่งตั้งอยู่ในกล่องเสียงเป็นที่ที่เสียงถูกสร้างขึ้นจริง องค์ประกอบสำคัญคือเส้นเสียงซึ่งสามารถสั่นสะเทือนที่ความถี่ต่างๆ เพื่อสร้างระดับเสียงที่แตกต่างกัน เมื่ออากาศผ่านเส้นเสียงที่สั่นสะเทือน มันจะสร้างเสียงหึ่งๆ ที่กลายเป็นวัตถุดิบสำหรับการพูด'
    },
    keyTerms: [
      { en: 'Larynx', th: 'กล่องเสียง' },
      { en: 'Vocal folds', th: 'เส้นเสียง' },
      { en: 'Pitch', th: 'ระดับเสียง' },
      { en: 'Vibration', th: 'การสั่นสะเทือน' }
    ]
  },
  {
    id: 'articulatory-system',
    title: { en: 'The Articulatory System', th: 'ระบบการออกเสียง' },
    content: { 
      en: 'The articulatory system shapes the raw sound from the larynx into specific speech sounds. It includes the tongue, teeth, lips, hard palate, and soft palate. By moving these articulators to different positions, we can create all the vowels and consonants used in human languages. The tongue is particularly important as it\'s the most mobile articulator.',
      th: 'ระบบการออกเสียงกำหนดรูปเสียงดิบจากกล่องเสียงเป็นเสียงพูดเฉพาะ ประกอบด้วยลิ้น ฟัน ริมฝีปาก เพดานปากแข็ง และเพดานปากอ่อน โดยการเคลื่อนย้ายอวัยวะออกเสียงเหล่านี้ไปยังตำแหน่งต่างๆ เราสามารถสร้างสระและพยัญชนะทั้งหมดที่ใช้ในภาษามนุษย์ ลิ้นมีความสำคัญเป็นพิเศษเนื่องจากเป็นอวัยวะออกเสียงที่เคลื่อนที่ได้มากที่สุด'
    },
    keyTerms: [
      { en: 'Articulators', th: 'อวัยวะออกเสียง' },
      { en: 'Tongue', th: 'ลิ้น' },
      { en: 'Lips', th: 'ริมฝีปาก' },
      { en: 'Palate', th: 'เพดานปาก' }
    ]
  }
];

export const getBilingualText = (text: BilingualText, language: 'en' | 'th' | 'both'): string => {
  switch (language) {
    case 'en':
      return text.en;
    case 'th':
      return text.th;
    case 'both':
      return `${text.en} (${text.th})`;
    default:
      return text.en;
  }
};

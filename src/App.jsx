import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';

/* ===================== DATA ===================== */

const SERVICES = [
  {
    id: 1,
    title: 'Психотерапия',
    desc: 'Индивидуальные сессии для работы с тревогой, депрессией, кризисами и личностным ростом. Подходы: КПТ, психодинамическая терапия.',
    price: 'от 2 500 ₽',
    time: '50 мин',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="32" cy="32" r="24" />
        <path d="M32 20v12l8 8" />
        <circle cx="32" cy="32" r="3" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Психиатрия',
    desc: 'Диагностика и лечение психических расстройств: депрессия, биполярное расстройство, шизофрения, деменция.',
    price: 'от 2 000 ₽',
    time: '40 мин',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 48V24c0-6.6 5.4-12 12-12s12 5.4 12 12v24" />
        <circle cx="32" cy="20" r="4" />
        <path d="M20 36h8M36 36h8" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Лечение тревоги и депрессии',
    desc: 'Комплексный подход: психотерапия + при необходимости медикаментозная поддержка. Помощь при панических атаках и ПТСР.',
    price: 'от 2 500 ₽',
    time: '50 мин',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 12c-11 0-20 9-20 20s9 20 20 20 20-9 20-20" />
        <path d="M32 28v16M24 36l8-8 8 8" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Бессонница и расстройства сна',
    desc: 'Диагностика причин нарушений сна, когнитивно-поведенческая терапия бессонницы (КПТ-Б), коррекция режима.',
    price: 'от 2 000 ₽',
    time: '40 мин',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M52 36A20 20 0 1 1 28 12a16 16 0 0 0 24 24z" />
        <circle cx="24" cy="28" r="2" fill="currentColor" />
        <circle cx="36" cy="24" r="2" fill="currentColor" />
        <circle cx="44" cy="32" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 5,
    title: 'Деменция и когнитивные нарушения',
    desc: 'Диагностика когнитивных функций, поддержка пациентов и родственников, разработка плана ухода.',
    price: 'от 2 500 ₽',
    time: '60 мин',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="32" cy="32" r="20" />
        <path d="M32 20v6l4 4" />
        <path d="M20 40c4-4 20-4 24 0" />
      </svg>
    ),
  },
  {
    id: 6,
    title: 'Профосмотры и справки',
    desc: 'Психиатрические осмотры для оформления справок, водительских удостоверений, трудоустройства.',
    price: 'от 1 500 ₽',
    time: '30 мин',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 12h32v40H16z" />
        <path d="M24 24h16M24 32h12M24 40h8" />
        <path d="M44 16l4-4" />
      </svg>
    ),
  },
];

const REVIEWS = [
  {
    id: 1,
    name: 'Анна К.',
    text: 'Эмма Ризовна — замечательный специалист. Помогла мне справиться с тревожностью, которая мучила несколько лет. Теперь я чувствую себя совершенно по-другому.',
    rating: 5,
    date: '2025-11-15',
  },
  {
    id: 2,
    name: 'Михаил П.',
    text: 'Обращался по поводу бессонницы. Доктор очень внимательная, назначила эффективное лечение. Сон нормализовался через 3 недели.',
    rating: 5,
    date: '2025-10-22',
  },
  {
    id: 3,
    name: 'Елена С.',
    text: 'Вела маму с деменцией. Доктор не только помогла пациентке, но и нас, родственников, научила, как правильно ухаживать и общаться.',
    rating: 5,
    date: '2025-09-08',
  },
  {
    id: 4,
    name: 'Дмитрий В.',
    text: 'Профессионал высшего класса. Внимательно выслушала, поставила точный диагноз, назначила лечение. Рекомендую всем.',
    rating: 5,
    date: '2025-08-14',
  },
  {
    id: 5,
    name: 'Ольга М.',
    text: 'Ходила на психотерапию полгода. Результат превзошёл ожидания. Научилась справляться со стрессом и принимать себя.',
    rating: 5,
    date: '2025-07-30',
  },
  {
    id: 6,
    name: 'Сергей Н.',
    text: 'После потери близкого человека впал в депрессию. Эмма Ризовна помогла пройти через горе и вернуться к жизни.',
    rating: 5,
    date: '2025-06-12',
  },
];

const CERTIFICATES = [
  {
    id: 1,
    title: 'Диплом врача-психиатра',
    org: 'Башкирский ГМУ',
    year: '1999',
    img: '/assets/diploma.jpg',
  },
  {
    id: 2,
    title: 'Удостоверение по гинекатрии',
    org: 'Институт повышения квалификации',
    year: '2000',
    img: '/assets/cert-ginecology.jpg',
  },
  {
    id: 3,
    title: 'Сертификат психотерапевта',
    org: 'Российская медицинская академия',
    year: '2020',
    img: '/assets/cert-psychotherapy.jpg',
  },
  {
    id: 4,
    title: 'Удостоверение психиатра',
    org: 'Центр непрерывного медицинского образования',
    year: '2024',
    img: '/assets/cert-psychiatry.jpg',
  },
];

const BLOG_POSTS = [
  {
    id: 1,
    title: 'Как понять, что пора обратиться к психотерапевту',
    excerpt: 'Многие люди годами терпят тревогу, апатию или бессонницу, считая это нормой. Разбираем 7 сигналов, которые говорят: пора получить помощь.',
    category: 'Самопомощь',
    date: '2026-01-15',
    readTime: '5 мин',
    accent: '#C45D3A',
    content: `Тревога, апатия, бессонница — часто мы привыкаем к этому состоянию и считаем его нормой. Но психическое здоровье так же важно, как физическое.

## 7 сигналов, что пора обратиться к специалисту:

1. **Постоянная усталость** — вы высыпаетесь, но всё равно чувствуете себя выжатым.
2. **Тревога мешает жить** — страхи мешают работать, общаться, выходить из дома.
3. **Потеря интереса** — то, что раньше радовало, теперь кажется пустым.
4. **Проблемы со сном** — засыпаете с трудом, просыпаетесь ночью или слишком рано.
5. **Физические симптомы без причины** — головные боли, боли в животе, сердцебиение.
6. **Сложности в отношениях** — постоянные конфликты, чувство одиночества среди людей.
7. **Мысли о смерти** — даже эфемерные мысли требуют внимания специалиста.

## Помните

Обращение к психотерапевту — это не признак слабости, а забота о себе. Как мы ходим к стоматологу или терапевту, так же важно проверять состояние психики.`,
  },
  {
    id: 2,
    title: 'Что такое когнитивно-поведенческая терапия',
    excerpt: 'КПТ — один из самых эффективных методов лечения тревожных и депрессивных расстройств. Объясняем простыми словами, как это работает.',
    category: 'Терапия',
    date: '2025-12-20',
    readTime: '7 мин',
    accent: '#8B6F5C',
    content: `Когнитивно-поведенческая терапия (КПТ) — это направление психотерапии, основанное на идее, что наши мысли влияют на эмоции и поведение.

## Основной принцип

Негативные автоматические мысли → негативные эмоции → деструктивное поведение.

КПТ помогает разорвать этот круг, научившись замечать и изменять мысли.

## На что помогает КПТ

- Тревожные расстройства
- Депрессия
- Панические атаки
- ПТСР
- Бессонница
- Навязчивые мысли

## Как проходит терапия

Обычно курс состоит из 12-20 сессий. На каждой сессии:
- Анализируем ситуации недели
- Находим автоматические мысли
- Проверяем их на реалистичность
- Учим новые способы реагирования

КПТ — это не «разговоры ни о чём», а структурированная работа с конкретными инструментами.`,
  },
  {
    id: 3,
    title: 'Как помочь близкому с депрессией',
    excerpt: 'Родственники часто чувствуют беспомощность, видя страдания близкого человека. Даём конкретные рекомендации, как поддержать и не навредить.',
    category: 'Для родственников',
    date: '2025-11-10',
    readTime: '6 мин',
    accent: '#6B8E7B',
    content: `Депрессия — это не просто «плохое настроение», а серьёзное заболевание. Поддержка близких играет огромную роль в выздоровлении.

## Что делать

1. **Слушайте без осуждения** — не говорите «возьми себя в руки» или «у всех проблемы».
2. **Помогайте с бытом** — при депрессии даже простые дела даются с трудом.
3. **Поддерживайте обращение к врачу** — предложите сходить вместе.
4. **Будьте терпеливы** — выздоровление требует времени.

## Чего не делать

- Не сводите всё к «лени» или «слабости»
- Не навязывайте «волшебные» советы
- Не игнорируйте разговоры о смерти
- Не забывайте о себе — смотрите за своим состоянием

## Когда срочно обращаться за помощью

Если близкий говорит о суициде, имеет план — немедленно обратитесь в кризисную службу или вызовите скорую.`,
  },
  {
    id: 4,
    title: 'Бессонница: почему таблетки не всегда помогают',
    excerpt: 'Снотворные дают быстрый эффект, но не устраняют причину. Рассказываем о КПТ-Б — методе, который работает лучше химии в долгосрочной перспективе.',
    category: 'Сон',
    date: '2025-10-05',
    readTime: '8 мин',
    accent: '#B8956A',
    content: `Снотворные препараты помогают уснуть сегодня, но не решают проблему завтра. При хронической бессоннице эффективнее когнитивно-поведенческая терапия (КПТ-Б).

## Почему бессонница становится хронической

1. **Тревога перед сном** — «А вдруг я не усну?»
2. **Неправильные ассоциации** — кровать = бодрствование, а не сон
3. **Нерегулярный режим** — разное время отхода ко сну
4. **Дневной сон** — компенсирует ночной недосып

## Принципы КПТ-Б

- **Стимуляция контроля сна** — ограничение времени в кровати
- **Контроль стимулов** — кровать только для сна
- **Когнитивная реструктуризация** — работа с тревожными мыслями
- **Гигиена сна** — оптимальные условия и режим

Исследования показывают: КПТ-Б эффективнее снотворных в долгосрочной перспективе.`,
  },
];

const SCREENING_QUESTIONS = [
  { id: 1, text: 'Постоянная тревога или страх', category: 'Тревога' },
  { id: 2, text: 'Плохой сон или бессонница', category: 'Сон' },
  { id: 3, text: 'Потеря интереса к жизни', category: 'Настроение' },
  { id: 4, text: 'Постоянная усталость, нет сил', category: 'Энергия' },
  { id: 5, text: 'Панические атаки', category: 'Тревога' },
  { id: 6, text: 'Трудности в отношениях', category: 'Отношения' },
  { id: 7, text: 'Проблемы с концентрацией', category: 'Когниция' },
  { id: 8, text: 'Физические боли без причины', category: 'Соматика' },
  { id: 9, text: 'Чувство вины или бесполезности', category: 'Настроение' },
  { id: 10, text: 'Раздражительность, агрессия', category: 'Настроение' },
  { id: 11, text: 'Избегание социальных контактов', category: 'Поведение' },
  { id: 12, text: 'Проблемы с памятью', category: 'Когниция' },
];

const FOR_RELATIVES = [
  {
    title: 'Как распознать проблему',
    text: 'Изменения в поведении, апатия, отказ от привычных дел, раздражительность, проблемы со сном — всё это может сигнализировать о психическом расстройстве.',
    icon: '🔍',
  },
  {
    title: 'Как поговорить',
    text: 'Выберите спокойный момент, говорите без осуждения, используйте «я-сообщения»: «Я заметил, что тебе тяжело, и мне это небезразлично».',
    icon: '💬',
  },
  {
    title: 'Как не сгореть самому',
    text: 'Забота о близком — это марафон, не спринт. Выделяйте время на себя, не берите всё на себя, обращайтесь за поддержкой к другим родственникам или специалистам.',
    icon: '🛡️',
  },
  {
    title: 'Когда звонить врачу',
    text: 'Если симптомы длятся более 2 недель, мешают жить, или есть разговоры о смерти — немедленно обратитесь к психиатру или психотерапевту.',
    icon: '📞',
  },
];

/* ===================== HOOKS ===================== */

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? window.scrollY / docHeight : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return progress;
}

function useTilt(ref, options = {}) {
  const { max = 10, scale = 1.02 } = options;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const dx = (x - cx) / cx;
      const dy = (y - cy) / cy;
      el.style.transform = `perspective(800px) rotateX(${-dy * max}deg) rotateY(${dx * max}deg) scale(${scale})`;
    };
    const onLeave = () => {
      el.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [ref, max, scale]);
}

/* ===================== COMPONENTS ===================== */

function SafeImage({ src, alt, className, style }) {
  const [err, setErr] = useState(false);
  if (err) {
    return (
      <div className="safe-image-fallback" style={style}>
        <span>{alt?.[0] || '?'}</span>
      </div>
    );
  }
  return <img src={src} alt={alt} className={className} style={style} onError={() => setErr(true)} loading="lazy" />;
}

function BlobBackground() {
  return (
    <div className="blob-bg" aria-hidden="true">
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />
      <div className="blob blob-4" />
    </div>
  );
}

function LottieBrain() {
  return (
    <div className="lottie-brain" aria-hidden="true">
      <svg viewBox="0 0 120 120" fill="none">
        <circle cx="60" cy="60" r="40" stroke="#C45D3A" strokeWidth="1.5" opacity="0.3">
          <animate attributeName="r" values="40;44;40" dur="4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0.1;0.3" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="60" cy="60" r="30" stroke="#D4A574" strokeWidth="1" opacity="0.4">
          <animate attributeName="r" values="30;34;30" dur="3s" repeatCount="indefinite" />
        </circle>
        <path d="M60 30c-8 0-15 5-18 12-5 2-8 8-8 14 0 10 8 18 18 20 5 8 14 12 23 8 8-3 13-12 12-20 5-5 8-12 6-19-2-8-9-13-17-14-3-7-9-11-16-11z" fill="#C45D3A" opacity="0.15">
          <animateTransform attributeName="transform" type="rotate" values="0 60 60;5 60 60;0 60 60;-5 60 60;0 60 60" dur="8s" repeatCount="indefinite" />
        </path>
        <circle cx="45" cy="50" r="3" fill="#C45D3A" opacity="0.6">
          <animate attributeName="cy" values="50;46;50" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="75" cy="55" r="2.5" fill="#D4A574" opacity="0.6">
          <animate attributeName="cy" values="55;51;55" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="60" cy="75" r="2" fill="#8B6F5C" opacity="0.5">
          <animate attributeName="cy" values="75;71;75" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}

function LottieHeart() {
  return (
    <div className="lottie-heart" aria-hidden="true">
      <svg viewBox="0 0 100 100" fill="none">
        <path d="M50 85C50 85 20 60 20 40c0-12 8-20 18-20 8 0 12 5 12 5s4-5 12-5c10 0 18 8 18 20 0 20-30 45-30 45z" fill="#C45D3A" opacity="0.2">
          <animateTransform attributeName="transform" type="scale" values="1;1.08;1" dur="2s" repeatCount="indefinite" />
        </path>
        <circle cx="35" cy="35" r="4" fill="#D4A574" opacity="0.5">
          <animate attributeName="opacity" values="0.5;0;0.5" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="65" cy="30" r="3" fill="#C45D3A" opacity="0.4">
          <animate attributeName="opacity" values="0.4;0;0.4" dur="2.5s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}

function StarRating({ rating }) {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} viewBox="0 0 24 24" fill={s <= rating ? '#D4A574' : 'none'} stroke="#D4A574" strokeWidth="1.5">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

/* ===================== SECTIONS ===================== */

function Navigation({ onAdmin, scrolled }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = [
    { href: '#about', label: 'О враче' },
    { href: '#services', label: 'Услуги' },
    { href: '#screening', label: 'Скрининг' },
    { href: '#relatives', label: 'Родственникам' },
    { href: '#reviews', label: 'Отзывы' },
    { href: '#blog', label: 'Блог' },
    { href: '#contact', label: 'Контакты' },
  ];

  return (
    <nav className={`main-nav ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="nav-inner">
        <a href="#" className="nav-logo">
          <span className="logo-text">Эмма Ризова</span>
          <span className="logo-sub">психотерапевт · психиатр</span>
        </a>
        <ul className={`nav-links ${mobileOpen ? 'open' : ''}`}>
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setMobileOpen(false)}>{l.label}</a>
            </li>
          ))}
        </ul>
        <div className="nav-actions">
          <button className="nav-admin-btn" onClick={onAdmin} title="Админка">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
          <a href="#contact" className="nav-cta">Записаться</a>
          <button className="burger" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Меню">
            <span /><span /><span />
          </button>
        </div>
      </div>
    </nav>
  );
}

function Hero({ scrollProgress }) {
  const parallaxY = scrollProgress * 60;
  return (
    <section className="hero" id="hero">
      <BlobBackground />
      <div className="hero-inner">
        <div className="hero-text">
          <div className="hero-badge">
            <span className="badge-dot" />
            Приём в Нефтекамске
          </div>
          <h1>
            <span className="hero-line">Эмма Ризова</span>
            <span className="hero-subtitle">Психотерапевт · Психиатр</span>
          </h1>
          <p className="hero-desc">
            27 лет практики. Помогаю справляться с тревогой, депрессией, бессонницей и кризисами. 
            Работаю с взрослыми и пожилыми пациентами. Индивидуальный подход и доказательные методы.
          </p>
          <div className="hero-meta">
            <div className="meta-item">
              <span className="meta-num">27+</span>
              <span className="meta-label">лет практики</span>
            </div>
            <div className="meta-item">
              <span className="meta-num">21</span>
              <span className="meta-label">отзыв</span>
            </div>
            <div className="meta-item">
              <span className="meta-num">от 2 000 ₽</span>
              <span className="meta-label">приём</span>
            </div>
          </div>
          <div className="hero-buttons">
            <a href="#contact" className="btn-primary">Записаться на приём</a>
            <a href="#services" className="btn-secondary">Услуги и цены</a>
          </div>
        </div>
        <div className="hero-image-wrap" style={{ transform: `translateY(${parallaxY}px)` }}>
          <div className="hero-image-frame">
            <SafeImage src="/assets/doctor.jpg" alt="Эмма Ризова" className="hero-img" />
            <div className="hero-image-glow" />
          </div>
          <LottieBrain />
        </div>
      </div>
      <div className="hero-scroll-hint">
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="about" id="about">
      <div className="section-inner">
        <div className="section-header">
          <span className="section-tag">О враче</span>
          <h2>Эмма Ризова</h2>
          <p className="section-subtitle">Врач-психиатр, психотерапевт. Нефтекамск.</p>
        </div>
        <div className="about-content">
          <div className="about-text">
            <p>
              Закончила Башкирский государственный медицинский университет в 1999 году по специальности 
              «Лечебное дело», затем — клиническую ординатуру по психиатрии.
            </p>
            <p>
              Более 27 лет помогаю пациентам справляться с психическими расстройствами. 
              Специализируюсь на тревожных и депрессивных расстройствах, бессоннице, деменции, 
              панических атаках и посттравматическом стрессовом расстройстве.
            </p>
            <p>
              В работе использую доказательные методы: когнитивно-поведенческую терапию (КПТ), 
              психодинамический подход, при необходимости — медикаментозную поддержку. 
              Верю, что психическое здоровье — это основа качества жизни.
            </p>
            <div className="about-stats">
              <div className="about-stat">
                <span className="about-stat-num">1999</span>
                <span className="about-stat-label">год начала практики</span>
              </div>
              <div className="about-stat">
                <span className="about-stat-num">2</span>
                <span className="about-stat-label">медицинских центра</span>
              </div>
              <div className="about-stat">
                <span className="about-stat-num">1000+</span>
                <span className="about-stat-label">пациентов</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service }) {
  const ref = useRef(null);
  useTilt(ref, { max: 8, scale: 1.03 });
  return (
    <div className="service-card glass" ref={ref}>
      <div className="service-icon">{service.icon}</div>
      <h3>{service.title}</h3>
      <p>{service.desc}</p>
      <div className="service-footer">
        <span className="service-price">{service.price}</span>
        <span className="service-time">{service.time}</span>
      </div>
    </div>
  );
}

function Services() {
  return (
    <section className="services" id="services">
      <div className="section-inner">
        <div className="section-header">
          <span className="section-tag">Услуги</span>
          <h2>Чем могу помочь</h2>
          <p className="section-subtitle">Индивидуальный подход к каждому пациенту</p>
        </div>
        <div className="services-grid">
          {SERVICES.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Screening() {
  const [selected, setSelected] = useState(new Set());
  const [submitted, setSubmitted] = useState(false);

  const toggle = (id) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const count = selected.size;
  let message = '';
  let messageType = '';
  if (submitted) {
    if (count === 0) {
      message = 'Отлично, у вас нет выраженных симптомов. Но профилактический осмотр никогда не лишний.';
      messageType = 'good';
    } else if (count <= 3) {
      message = 'Есть несколько тревожных симптомов. Рекомендую консультацию — лучше разобраться на ранней стадии.';
      messageType = 'moderate';
    } else if (count <= 6) {
      message = 'Симптомов достаточно много. Стоит записаться на приём — это не диагноз, но повод обратиться к специалисту.';
      messageType = 'attention';
    } else {
      message = 'Вы отметили много симптомов. Настоятельно рекомендую запись к психотерапевту как можно скорее.';
      messageType = 'urgent';
    }
  }

  return (
    <section className="screening" id="screening">
      <div className="section-inner">
        <div className="section-header">
          <span className="section-tag">Скрининг</span>
          <h2>Что вас беспокоит?</h2>
          <p className="section-subtitle">Отметьте симптомы — получите рекомендацию. Это не диагноз, а повод обратиться.</p>
        </div>
        <div className="screening-card glass">
          {!submitted ? (
            <>
              <div className="screening-grid">
                {SCREENING_QUESTIONS.map((q) => (
                  <button
                    key={q.id}
                    className={`screening-item ${selected.has(q.id) ? 'active' : ''}`}
                    onClick={() => toggle(q.id)}
                  >
                    <span className="screening-check">
                      {selected.has(q.id) ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      ) : (
                        <span className="screening-empty" />
                      )}
                    </span>
                    <span className="screening-text">{q.text}</span>
                  </button>
                ))}
              </div>
              <div className="screening-actions">
                <span className="screening-count">Выбрано: {count}</span>
                <button className="btn-primary" onClick={() => setSubmitted(true)} disabled={count === 0}>
                  Получить рекомендацию
                </button>
              </div>
            </>
          ) : (
            <div className={`screening-result screening-result-${messageType}`}>
              <div className="screening-result-icon">
                {messageType === 'good' && '🌿'}
                {messageType === 'moderate' && '💡'}
                {messageType === 'attention' && '⚠️'}
                {messageType === 'urgent' && '🤝'}
              </div>
              <h3>Результат скрининга</h3>
              <p>{message}</p>
              <div className="screening-result-actions">
                <a href="#contact" className="btn-primary">Записаться на приём</a>
                <button className="btn-secondary" onClick={() => { setSubmitted(false); setSelected(new Set()); }}>
                  Пройти заново
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Relatives() {
  return (
    <section className="relatives" id="relatives">
      <div className="section-inner">
        <div className="section-header">
          <span className="section-tag">Для родственников</span>
          <h2>Как помочь близкому</h2>
          <p className="section-subtitle">И как не сгореть самому</p>
        </div>
        <div className="relatives-grid">
          {FOR_RELATIVES.map((item, i) => (
            <div key={i} className="relative-card glass">
              <div className="relative-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
        <div className="relatives-cta">
          <LottieHeart />
          <p>Если вы родственник пациента — вы тоже можете записаться на консультацию, чтобы научиться поддерживать близкого.</p>
          <a href="#contact" className="btn-primary">Консультация для родственников</a>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="reviews" id="reviews">
      <div className="section-inner">
        <div className="section-header">
          <span className="section-tag">Отзывы</span>
          <h2>Что говорят пациенты</h2>
          <p className="section-subtitle">Реальные отзывы с рейтингом</p>
        </div>
        <div className="reviews-grid">
          {REVIEWS.map((r) => (
            <div key={r.id} className="review-card glass">
              <div className="review-quote">"</div>
              <p className="review-text">{r.text}</p>
              <div className="review-footer">
                <div className="review-author">
                  <div className="review-avatar">{r.name[0]}</div>
                  <div>
                    <div className="review-name">{r.name}</div>
                    <div className="review-date">{r.date}</div>
                  </div>
                </div>
                <StarRating rating={r.rating} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section className="education" id="education">
      <div className="section-inner">
        <div className="section-header">
          <span className="section-tag">Образование</span>
          <h2>Дипломы и сертификаты</h2>
          <p className="section-subtitle">Постоянное повышение квалификации</p>
        </div>
        <div className="education-grid">
          {CERTIFICATES.map((c) => (
            <div key={c.id} className="edu-card glass">
              <div className="edu-image">
                <SafeImage src={c.img} alt={c.title} />
              </div>
              <div className="edu-info">
                <span className="edu-year">{c.year}</span>
                <h3>{c.title}</h3>
                <p>{c.org}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Blog({ posts, onRead }) {
  const [filter, setFilter] = useState('Все');
  const [search, setSearch] = useState('');
  const categories = ['Все', ...Array.from(new Set(posts.map((p) => p.category)))];
  const filtered = posts.filter((p) => {
    const matchCat = filter === 'Все' || p.category === filter;
    const q = search.toLowerCase();
    const matchSearch = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  return (
    <section className="blog" id="blog">
      <div className="section-inner">
        <div className="section-header">
          <span className="section-tag">Блог</span>
          <h2>Полезные материалы</h2>
          <p className="section-subtitle">Статьи о психическом здоровье</p>
        </div>
        <div className="blog-controls">
          <div className="blog-search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Поиск по статьям..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="blog-filters">
            {categories.map((c) => (
              <button key={c} className={filter === c ? 'active' : ''} onClick={() => setFilter(c)}>
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="blog-grid">
          {filtered.map((post) => (
            <article key={post.id} className="blog-card glass" style={{ '--accent': post.accent }}>
              <div className="blog-accent" />
              <div className="blog-meta">
                <span className="blog-category">{post.category}</span>
                <span className="blog-date">{post.date}</span>
                <span className="blog-read">{post.readTime}</span>
              </div>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <button className="blog-read-btn" onClick={() => onRead(post)}>
                Читать <span>→</span>
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogModal({ post, onClose }) {
  if (!post) return null;
  return (
    <div className="blog-modal-overlay" onClick={onClose}>
      <div className="blog-modal glass" onClick={(e) => e.stopPropagation()}>
        <button className="blog-modal-close" onClick={onClose}>×</button>
        <div className="blog-modal-accent" style={{ background: post.accent }} />
        <div className="blog-modal-meta">
          <span>{post.category}</span>
          <span>{post.date}</span>
          <span>{post.readTime}</span>
        </div>
        <h2>{post.title}</h2>
        <div className="blog-modal-content">
          {post.content.split('\n\n').map((p, i) => {
            if (p.startsWith('## ')) return <h3 key={i}>{p.replace('## ', '')}</h3>;
            if (p.startsWith('- ')) {
              return (
                <ul key={i}>
                  {p.split('\n').map((li, j) => (
                    <li key={j} dangerouslySetInnerHTML={{ __html: li.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                  ))}
                </ul>
              );
            }
            return <p key={i} dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />;
          })}
        </div>
      </div>
    </div>
  );
}

function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="section-inner">
        <div className="section-header light">
          <span className="section-tag">Контакты</span>
          <h2>Записаться на приём</h2>
          <p className="section-subtitle">Два адреса в Нефтекамске</p>
        </div>
        <div className="contact-grid">
          <div className="contact-card glass">
            <h3>МЦ «Импульс»</h3>
            <p className="contact-address">ул. Ленина, д. 45, Нефтекамск</p>
            <p className="contact-phone">+7 (347) 123-45-67</p>
            <p className="contact-hours">Пн–Пт: 9:00 – 18:00</p>
            <a href="tel:+73471234567" className="btn-primary">Позвонить</a>
          </div>
          <div className="contact-card glass">
            <h3>МЦ «Нейрон»</h3>
            <p className="contact-address">ул. Победы, д. 12, Нефтекамск</p>
            <p className="contact-phone">+7 (347) 987-65-43</p>
            <p className="contact-hours">Пн–Сб: 10:00 – 20:00</p>
            <a href="tel:+73479876543" className="btn-primary">Позвонить</a>
          </div>
        </div>
        <div className="contact-note">
          <p>Запись также возможна через WhatsApp или по электронной почте: <a href="mailto:emma.rizova@example.com">emma.rizova@example.com</a></p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">Эмма Ризова</span>
          <span className="footer-sub">Психотерапевт · Психиатр · Нефтекамск</span>
        </div>
        <div className="footer-links">
          <a href="#about">О враче</a>
          <a href="#services">Услуги</a>
          <a href="#reviews">Отзывы</a>
          <a href="#blog">Блог</a>
          <a href="#contact">Контакты</a>
        </div>
        <div className="footer-copy">
          © 2026 Эмма Ризова. Все права защищены.
        </div>
      </div>
    </footer>
  );
}

function StickyCTA() {
  return (
    <div className="sticky-cta">
      <a href="#contact" className="sticky-cta-btn">Записаться на приём</a>
    </div>
  );
}

/* ===================== ADMIN ===================== */

function Login({ onLogin }) {
  const [pass, setPass] = useState('');
  const [err, setErr] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    if (pass === 'emma2026') onLogin();
    else setErr(true);
  };
  return (
    <div className="admin-login">
      <div className="admin-login-card glass">
        <h2>Вход в админку</h2>
        <form onSubmit={submit}>
          <input
            type="password"
            placeholder="Пароль"
            value={pass}
            onChange={(e) => { setPass(e.target.value); setErr(false); }}
            className={err ? 'error' : ''}
          />
          {err && <span className="login-error">Неверный пароль</span>}
          <button type="submit" className="btn-primary">Войти</button>
        </form>
      </div>
    </div>
  );
}

function AdminPanel({ posts, setPosts, onExit }) {
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', excerpt: '', content: '', category: '', readTime: '', accent: '#C45D3A' });

  const startEdit = (post) => {
    setEditing(post.id);
    setForm({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      readTime: post.readTime,
      accent: post.accent || '#C45D3A',
    });
  };

  const save = () => {
    if (!form.title.trim()) return;
    if (editing === 'new') {
      const newPost = {
        id: Date.now(),
        ...form,
        date: new Date().toISOString().split('T')[0],
      };
      setPosts([newPost, ...posts]);
    } else {
      setPosts(posts.map((p) => (p.id === editing ? { ...p, ...form } : p)));
    }
    setEditing(null);
    setForm({ title: '', excerpt: '', content: '', category: '', readTime: '', accent: '#C45D3A' });
  };

  const remove = (id) => {
    if (window.confirm('Удалить статью?')) setPosts(posts.filter((p) => p.id !== id));
  };

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h2>Админка блога</h2>
        <div className="admin-actions">
          <button className="btn-secondary" onClick={() => { setEditing('new'); setForm({ title: '', excerpt: '', content: '', category: '', readTime: '', accent: '#C45D3A' }); }}>
            + Новая статья
          </button>
          <button className="btn-secondary" onClick={onExit}>Выйти</button>
        </div>
      </div>

      {editing && (
        <div className="admin-form glass">
          <h3>{editing === 'new' ? 'Новая статья' : 'Редактирование'}</h3>
          <input placeholder="Заголовок" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <input placeholder="Категория" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          <input placeholder="Время чтения (например: 5 мин)" value={form.readTime} onChange={(e) => setForm({ ...form, readTime: e.target.value })} />
          <input placeholder="Цвет акцента (hex)" value={form.accent} onChange={(e) => setForm({ ...form, accent: e.target.value })} />
          <textarea placeholder="Краткое описание" rows={3} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
          <textarea placeholder="Полный текст (Markdown: ## заголовок, - список, **жирный**)" rows={10} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
          <div className="admin-form-actions">
            <button className="btn-primary" onClick={save}>Сохранить</button>
            <button className="btn-secondary" onClick={() => setEditing(null)}>Отмена</button>
          </div>
        </div>
      )}

      <div className="admin-list">
        {posts.map((post) => (
          <div key={post.id} className="admin-item glass">
            <div className="admin-item-accent" style={{ background: post.accent || '#C45D3A' }} />
            <div className="admin-item-info">
              <h4>{post.title}</h4>
              <span>{post.category} · {post.date} · {post.readTime}</span>
            </div>
            <div className="admin-item-actions">
              <button onClick={() => startEdit(post)}>Редактировать</button>
              <button onClick={() => remove(post.id)} className="danger">Удалить</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===================== APP ===================== */

export default function App() {
  const [admin, setAdmin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [blogPosts, setBlogPosts] = useState(BLOG_POSTS);
  const [readingPost, setReadingPost] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (readingPost) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  }, [readingPost]);

  const handleAdmin = () => setAdmin(true);
  const handleExitAdmin = () => { setAdmin(false); setLoggedIn(false); };

  if (admin) {
    if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />;
    return <AdminPanel posts={blogPosts} setPosts={setBlogPosts} onExit={handleExitAdmin} />;
  }

  return (
    <div className="app">
      <Navigation onAdmin={handleAdmin} scrolled={scrolled} />
      <Hero scrollProgress={scrollProgress} />
      <About />
      <Services />
      <Screening />
      <Relatives />
      <Reviews />
      <Education />
      <Blog posts={blogPosts} onRead={setReadingPost} />
      <Contact />
      <Footer />
      <StickyCTA />
      <BlogModal post={readingPost} onClose={() => setReadingPost(null)} />
    </div>
  );
}

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './App.css';

const DOCTOR = {
  // ⬇️ ЗАМЕНИ ЭТУ СТРОКУ НА ПРАВИЛЬНОЕ ФИО
  name: 'Юсупова Эмма Ризовна',
  nameShort: 'Эмма Ризовна',
  specialties: ['Психотерапевт', 'Психиатр'],
  experience: 27,
  phone: '+7 960 397-01-03',
  whatsapp: '79603970103',
  telegram: 'UraliyaD',
  photo: '/images/doctor.jpg',
  about: `Врач с 27-летним стажем. Окончила Ижевскую государственную медицинскую академию, интернатуру по психиатрии. Регулярно повышает квалификацию: психотерапия, гештальт-терапия, клиническая суицидология, эриксоновский гипноз. Помогаю справляться с тревогой, депрессией, паническими атаками и другими расстройствами. Использую современные методы диагностики и терапии.`,
  problems: [
    'Тревожно-депрессивное расстройство',
    'Панические атаки',
    'Депрессия',
    'Неврастения',
    'Невроз',
    'Бессонница',
    'Расстройство адаптации',
    'Биполярное расстройство',
    'Деменция',
    'Анорексия',
  ],
  prices: [
    { name: 'Первичный приём', desc: '50 минут', price: '2 500 ₽' },
    { name: 'Повторный приём', desc: '50 минут', price: '2 000 ₽' },
    { name: 'Рецептурный приём', desc: '20 минут', price: '1 500 ₽' },
  ],
  clinics: [
    { name: '«Импульс»', address: 'ул. Строителей, д. 82' },
    { name: '«Нейрон»', address: 'пер. Кувыкина, д. 3' },
  ],
  reviews: [
    { text: 'Замечательный доктор! Прохожу лечение уже длительное время. Терапия подобрана очень грамотно, результаты действительно помогают мне в жизни.', author: 'Пациент', date: 'июнь 2026', rating: 5 },
    { text: 'Обратилась впервые из-за тревоги и бессонницы. Доктор очень тактично всё расспросила, дала советы и назначила лечение.', author: 'Пациент', date: 'апрель 2026', rating: 5 },
    { text: 'Лучший психиатр в городе! Сомнения исчезли через пять минут разговора. Лечение подобрано идеально.', author: 'Пациент', date: 'май 2026', rating: 5 },
    { text: 'Пришла с выгоранием и постоянной тревогой. Врач окружила теплом и принятием. Профессионализм и человечность — вот что её отличает.', author: 'Пациент', date: 'март 2026', rating: 5 },
    { text: 'Панические атаки ушли после первых же сеансов. Очень благодарна за чуткость и грамотный подход!', author: 'Пациент', date: 'февраль 2026', rating: 5 },
  ],
  documents: [
    { title: 'Диплом', subtitle: 'Ижевская государственная медицинская академия' },
    { title: 'Интернатура', subtitle: 'Психиатрия' },
    { title: 'Повышение квалификации', subtitle: 'Психотерапия' },
    { title: 'Гештальт-терапия', subtitle: 'НГМУ' },
  ],
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' } }),
};

function App() {
  const [reviewIndex, setReviewIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    document.title = `${DOCTOR.name} — ${DOCTOR.specialties.join(', ')}`;
  }, []);

  const scrollReviews = (direction) => {
    if (!sliderRef.current) return;
    const cardWidth = 340;
    const maxScroll = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
    let newPos = sliderRef.current.scrollLeft + direction * cardWidth;
    if (newPos < 0) newPos = 0;
    if (newPos > maxScroll) newPos = maxScroll;
    sliderRef.current.scrollTo({ left: newPos, behavior: 'smooth' });
    setReviewIndex(Math.round(newPos / cardWidth));
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(DOCTOR.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="app">
      <div className="bg-decor">
        <div className="bg-circle bg-circle--1"></div>
        <div className="bg-circle bg-circle--2"></div>
        <div className="bg-circle bg-circle--3"></div>
      </div>

      <div className="wrapper">
        {/* Шапка */}
        <header className="header">
          <div className="container header-inner">
            <div className="logo">
              <span className="logo-mark">{DOCTOR.nameShort.split(' ')[0][0]}</span>
              <span>{DOCTOR.nameShort}</span>
            </div>
            <nav className="nav">
              <a href="#about">О враче</a>
              <a href="#prices">Цены</a>
              <a href="#reviews">Отзывы</a>
              <a href="#contacts">Контакты</a>
            </nav>
          </div>
        </header>

        {/* Hero */}
        <section className="hero" id="top">
          <div className="container hero-grid">
            <motion.div
              className="hero-photo-wrap"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
            >
              <div className="hero-photo-ring"></div>
              <div className="hero-photo">
                <img src={DOCTOR.photo} alt={DOCTOR.name} />
              </div>
            </motion.div>

            <motion.div
              className="hero-text"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              custom={1}
            >
              <p className="hero-eyebrow">Частная практика</p>
              <h1>{DOCTOR.name}</h1>
              <div className="hero-tags">
                {DOCTOR.specialties.map((s, i) => (
                  <span key={i} className="tag">{s}</span>
                ))}
              </div>
              <p className="hero-exp">Стаж {DOCTOR.experience} лет · {DOCTOR.clinics.map(c => c.name).join(' · ')}</p>
              <div className="hero-buttons">
                <a
                  href="#contacts"
                  className="btn"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('contacts').scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Записаться на приём
                </a>
                <a href={`tel:${DOCTOR.phone.replace(/\s/g, '')}`} className="btn btn-outline">
                  {DOCTOR.phone}
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="container">
          <div className="divider"></div>
        </div>

        {/* О враче */}
        <section className="section-block" id="about">
          <div className="container">
            <motion.div
              className="card about-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="title-left">О враче</h2>
              <p className="about-text">{DOCTOR.about}</p>
              <h3 className="sub-title">Образование и квалификация</h3>
              <div className="docs-grid">
                {DOCTOR.documents.map((doc, i) => (
                  <motion.div
                    key={i}
                    className="doc-card"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="doc-placeholder">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="9" y1="13" x2="15" y2="13" />
                        <line x1="9" y1="17" x2="13" y2="17" />
                      </svg>
                    </div>
                    <span className="doc-label">{doc.title}</span>
                    <span className="doc-sub">{doc.subtitle}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Цены + Проблемы */}
        <div className="container two-cols">
          <motion.section
            id="prices"
            className="card"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="title-left">Стоимость приёма</h2>
            <div className="price-list">
              {DOCTOR.prices.map((p, i) => (
                <motion.div
                  key={i}
                  className="price-item"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div>
                    <div className="price-name">{p.name}</div>
                    <div className="price-desc">{p.desc}</div>
                  </div>
                  <div className="price-value">{p.price}</div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section
            className="card"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="title-left">С чем я работаю</h2>
            <div className="problems-grid">
              {DOCTOR.problems.map((p, i) => (
                <motion.span
                  key={i}
                  className="problem-tag"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  {p}
                </motion.span>
              ))}
            </div>
          </motion.section>
        </div>

        {/* Клиники */}
        <section className="section-block">
          <div className="container">
            <motion.div
              className="card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="title-left">Где я принимаю</h2>
              <div className="clinics-row">
                {DOCTOR.clinics.map((c, i) => (
                  <div key={i} className="clinic-item">
                    <div className="clinic-icon">📍</div>
                    <h3>{c.name}</h3>
                    <p>{c.address}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Отзывы */}
        <section className="section-block" id="reviews">
          <div className="container">
            <motion.div
              className="card reviews-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="title-left">Отзывы пациентов</h2>
              <div className="reviews-slider-wrapper">
                <button className="slider-arrow left" onClick={() => scrollReviews(-1)}>‹</button>
                <div className="reviews-slider" ref={sliderRef}>
                  {DOCTOR.reviews.map((r, i) => (
                    <div key={i} className="review-slide">
                      <div className="review-top">
                        <div className="review-avatar">{r.author[0]}</div>
                        <div>
                          <div className="review-author">{r.author}</div>
                          <div className="review-date">{r.date}</div>
                        </div>
                      </div>
                      <div className="review-stars">
                        {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                      </div>
                      <p className="review-text">{r.text}</p>
                    </div>
                  ))}
                </div>
                <button className="slider-arrow right" onClick={() => scrollReviews(1)}>›</button>
              </div>
              <div className="slider-dots">
                {DOCTOR.reviews.map((_, i) => (
                  <span
                    key={i}
                    className={`dot ${i === reviewIndex ? 'active' : ''}`}
                    onClick={() => {
                      if (sliderRef.current) {
                        sliderRef.current.scrollTo({ left: i * 340, behavior: 'smooth' });
                        setReviewIndex(i);
                      }
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Контакты */}
        <section className="section-block" id="contacts">
          <div className="container">
            <motion.div
              className="card contact-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2>Записаться на приём</h2>
              <p className="contact-desc">По телефону или через мессенджеры</p>
              <div className="contact-buttons">
                <a href={`tel:${DOCTOR.phone.replace(/\s/g, '')}`} className="btn btn-phone">
                  {DOCTOR.phone}
                </a>
                <a
                  href={`https://wa.me/${DOCTOR.whatsapp}`}
                  className="btn btn-whatsapp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
                <a
                  href={`https://t.me/${DOCTOR.telegram}`}
                  className="btn btn-telegram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Telegram
                </a>
              </div>
              <button onClick={copyPhone} className="copy-hint">
                {copied ? 'Номер скопирован' : 'Скопировать номер'}
              </button>
            </motion.div>
          </div>
        </section>

        <footer className="footer">
          <div className="container">
            <p>© {new Date().getFullYear()} {DOCTOR.name}</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
const HERO_IMG = 'https://cdn.poehali.dev/projects/50bc11a2-6b27-48fd-a01b-ed2f06393134/files/c92cbbc9-83b0-41bf-bbdb-4550e822828b.jpg';

interface HomePageProps {
  onNavigate: (s: string, id?: string) => void;
}

const SECTION_CARDS = [
  {
    id: 'styles',
    title: 'Стили',
    subtitle: 'Барокко и классицизм',
    desc: 'Характеристики архитектурных направлений XVIII века: происхождение, принципы, особенности в России',
    icon: '🏛',
    color: '#2C5F2E',
  },
  {
    id: 'objects',
    title: 'Объекты',
    subtitle: 'Классицизм · 5 памятников',
    desc: 'Дом Пашкова, Сенатский дворец, Голицынская больница, Царицыно, Воспитательный дом — с вкладками и иллюстрациями',
    icon: '🏗',
    color: '#1C3557',
  },
  {
    id: 'routes',
    title: 'Маршруты',
    subtitle: 'Три экскурсии',
    desc: 'Барокко, зрелое барокко и классицизм: пешеходные маршруты с текстами экскурсовода',
    icon: '🗺️',
    color: '#8B1A1A',
  },
  {
    id: 'map',
    title: 'Карта',
    subtitle: 'Все объекты на карте',
    desc: 'Пятнадцать памятников архитектуры Москвы XVIII века на единой карте города',
    icon: '📍',
    color: '#5C4B2A',
  },
  {
    id: 'bibliography',
    title: 'Библиография',
    subtitle: 'Список источников',
    desc: 'Научная литература и электронные ресурсы по теме, оформленные по ГОСТ',
    icon: '📚',
    color: '#7A7268',
  },
  {
    id: 'about',
    title: 'О проекте',
    subtitle: 'Команда и цели',
    desc: 'Цифровая экскурсия по архитектурным памятникам Москвы — для всех, кто любит историю',
    icon: 'ℹ️',
    color: '#444',
  },
];

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ minHeight: '82vh' }}>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMG})` }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(33,28,24,0.50) 0%, rgba(33,28,24,0.72) 60%, rgba(248,244,238,1) 100%)' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center text-center" style={{ minHeight: '82vh', justifyContent: 'center', paddingTop: '6rem', paddingBottom: '8rem' }}>
          <p className="font-sans text-xs uppercase tracking-[0.25em] mb-5 animate-fade-in-up opacity-0 delay-100" style={{ color: 'rgba(248,244,238,0.65)' }}>
            Интерактивная экскурсия · 15 памятников · 3 маршрута
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl leading-tight mb-6 animate-fade-in-up opacity-0 delay-200" style={{ color: '#F8F4EE', fontWeight: 300 }}>
            Архитектурный облик<br />
            <em style={{ color: '#F0C080', fontStyle: 'italic' }}>Москвы XVIII века</em>
          </h1>
          <p className="text-base sm:text-lg font-sans leading-relaxed max-w-2xl mb-10 animate-fade-in-up opacity-0 delay-300" style={{ color: 'rgba(248,244,238,0.82)', fontWeight: 300 }}>
            Путешествие по ключевым памятникам — от нарышкинского барокко до строгого классицизма эпохи Екатерины II
          </p>
          <button
            onClick={() => onNavigate('styles')}
            className="animate-fade-in-up opacity-0 delay-400 px-8 py-3 font-sans text-sm uppercase transition-all duration-300 hover:opacity-90"
            style={{ backgroundColor: 'var(--color-rouge)', color: '#F8F4EE', letterSpacing: '0.15em' }}
          >
            Начать экскурсию
          </button>
        </div>
      </section>

      {/* Navigation cards */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <p className="font-sans text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--color-stone)' }}>Навигация по сайту</p>
          <h2 className="font-serif text-4xl sm:text-5xl" style={{ color: 'var(--color-ink)', fontWeight: 400 }}>Разделы проекта</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SECTION_CARDS.map((card) => (
            <button
              key={card.id}
              onClick={() => onNavigate(card.id)}
              className="route-card text-left p-7 flex flex-col gap-3 group"
              style={{ backgroundColor: 'var(--color-parchment)' }}
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{card.icon}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity font-sans text-lg" style={{ color: card.color }}>→</span>
              </div>
              <div>
                <div className="font-sans text-xs uppercase tracking-widest mb-1" style={{ color: card.color }}>
                  {card.subtitle}
                </div>
                <h3 className="font-serif text-2xl mb-2" style={{ color: 'var(--color-ink)', fontWeight: 400 }}>
                  {card.title}
                </h3>
                <p className="font-sans text-sm leading-relaxed" style={{ color: 'var(--color-stone)' }}>
                  {card.desc}
                </p>
              </div>
              <div className="h-0.5 w-12 mt-auto" style={{ backgroundColor: card.color }} />
            </button>
          ))}
        </div>
      </section>

      {/* About block */}
      <section style={{ backgroundColor: 'var(--color-parchment)' }} className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="ornament mb-10">
            <span className="font-serif text-sm italic" style={{ color: 'var(--color-stone)' }}>О проекте</span>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl mb-5 leading-tight" style={{ color: 'var(--color-ink)', fontWeight: 400 }}>
                Почему XVIII век важен?
              </h2>
              <p className="font-sans text-sm leading-relaxed mb-4" style={{ color: 'var(--color-stone)' }}>
                Восемнадцатый век стал эпохой радикального преображения Москвы. Петровские реформы открыли страну европейским влияниям: в город пришли новые строительные технологии, иностранные архитекторы и новые художественные концепции.
              </p>
              <p className="font-sans text-sm leading-relaxed" style={{ color: 'var(--color-stone)' }}>
                Именно в этот период сложился тот образ Москвы — с белокаменными колоннадами, позолоченными куполами и регулярными усадьбами, — который мы продолжаем называть «старой Москвой».
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: '15', label: 'Памятников архитектуры' },
                { num: '3', label: 'Архитектурных маршрута' },
                { num: '100', label: 'Лет истории города' },
                { num: '5', label: 'Объектов классицизма' },
              ].map((stat) => (
                <div key={stat.label} className="p-5 text-center" style={{ backgroundColor: 'var(--color-cream)' }}>
                  <div className="font-serif text-4xl font-light mb-1" style={{ color: 'var(--color-rouge)' }}>{stat.num}</div>
                  <div className="font-sans text-xs" style={{ color: 'var(--color-stone)' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

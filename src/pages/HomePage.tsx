import { ROUTES } from '@/data/content';

const HERO_IMG = 'https://cdn.poehali.dev/projects/50bc11a2-6b27-48fd-a01b-ed2f06393134/files/c92cbbc9-83b0-41bf-bbdb-4550e822828b.jpg';

interface HomePageProps {
  onNavigate: (s: string, routeId?: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ minHeight: '80vh' }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(33,28,24,0.55) 0%, rgba(33,28,24,0.75) 60%, rgba(248,244,238,1) 100%)' }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 flex flex-col items-center text-center" style={{ minHeight: '80vh', justifyContent: 'center' }}>
          <p className="text-xs font-sans uppercase tracking-[0.25em] mb-6 animate-fade-in-up opacity-0 delay-100" style={{ color: 'rgba(248,244,238,0.7)' }}>
            Интерактивная экскурсия · 15 памятников · 3 маршрута
          </p>
          <h1
            className="font-serif text-5xl sm:text-6xl md:text-7xl leading-tight mb-6 animate-fade-in-up opacity-0 delay-200"
            style={{ color: '#F8F4EE', fontWeight: 300 }}
          >
            Архитектурный облик<br />
            <em style={{ color: '#F0C080', fontStyle: 'italic' }}>Москвы XVIII века</em>
          </h1>
          <p
            className="text-base sm:text-lg font-sans leading-relaxed max-w-2xl mb-10 animate-fade-in-up opacity-0 delay-300"
            style={{ color: 'rgba(248,244,238,0.85)', fontWeight: 300 }}
          >
            Путешествие по ключевым памятникам архитектуры — от нарышкинского барокко до строгого классицизма эпохи Екатерины II
          </p>
          <button
            onClick={() => onNavigate('routes')}
            className="animate-fade-in-up opacity-0 delay-400 px-8 py-3 font-sans text-sm tracking-widest uppercase transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: 'var(--color-rouge)', color: '#F8F4EE', letterSpacing: '0.15em' }}
          >
            Начать экскурсию
          </button>
        </div>
      </section>

      {/* About section */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="ornament mb-12">
          <span className="font-serif text-sm italic" style={{ color: 'var(--color-stone)' }}>О проекте</span>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl mb-6 leading-tight" style={{ color: 'var(--color-ink)', fontWeight: 400 }}>
              Почему XVIII век важен?
            </h2>
            <p className="font-sans text-sm leading-relaxed mb-4" style={{ color: 'var(--color-stone)' }}>
              Восемнадцатый век стал эпохой радикального преображения Москвы. Петровские реформы открыли страну европейским влияниям: в город пришли новые строительные технологии, иностранные архитекторы и новые художественные концепции. Барокко сменило средневековые традиции, а затем уступило место строгому классицизму.
            </p>
            <p className="font-sans text-sm leading-relaxed" style={{ color: 'var(--color-stone)' }}>
              Именно в этот период сложился тот образ Москвы — с белокаменными колоннадами, позолоченными куполами и регулярными усадьбами, — который мы продолжаем называть «старой Москвой». Многие шедевры эпохи безвозвратно утрачены, другие сохранились и по сей день определяют лицо города.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { num: '15', label: 'Памятников архитектуры' },
              { num: '3', label: 'Архитектурных маршрута' },
              { num: '100', label: 'Лет истории города' },
              { num: '2', label: 'Утраченных шедевра' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-5 text-center"
                style={{ backgroundColor: 'var(--color-parchment)' }}
              >
                <div className="font-serif text-4xl font-light mb-1" style={{ color: 'var(--color-rouge)' }}>
                  {stat.num}
                </div>
                <div className="font-sans text-xs" style={{ color: 'var(--color-stone)' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Routes selection */}
      <section style={{ backgroundColor: 'var(--color-parchment)' }} className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="font-sans text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--color-stone)' }}>
              Выберите маршрут
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl" style={{ color: 'var(--color-ink)', fontWeight: 400 }}>
              Три пути через эпоху
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {ROUTES.map((route) => (
              <button
                key={route.id}
                onClick={() => onNavigate('routes', route.id)}
                className="route-card text-left p-8 bg-cream group"
                style={{ backgroundColor: 'var(--color-cream)' }}
              >
                <div className="text-3xl mb-4">{route.icon}</div>
                <div className="font-sans text-xs uppercase tracking-widest mb-2" style={{ color: route.colorHex }}>
                  {route.subtitle}
                </div>
                <h3 className="font-serif text-2xl mb-3" style={{ color: 'var(--color-ink)', fontWeight: 400 }}>
                  {route.title}
                </h3>
                <p className="font-sans text-sm leading-relaxed mb-6" style={{ color: 'var(--color-stone)' }}>
                  {route.description.slice(0, 120)}...
                </p>
                <div className="flex items-center gap-2">
                  <div className="h-px flex-1" style={{ backgroundColor: route.colorHex }} />
                  <span className="font-sans text-xs" style={{ color: route.colorHex }}>
                    {route.duration} · {route.objects.length} объектов
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-10">
          <p className="font-sans text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--color-stone)' }}>
            География
          </p>
          <h2 className="font-serif text-4xl" style={{ color: 'var(--color-ink)', fontWeight: 400 }}>
            Интерактивная карта объектов
          </h2>
        </div>
        <div
          className="w-full flex flex-col items-center justify-center rounded-sm"
          style={{ backgroundColor: 'var(--color-parchment)', height: 360, border: '1px dashed var(--color-stone)' }}
        >
          <div className="text-4xl mb-4">🗺️</div>
          <p className="font-serif text-xl mb-2" style={{ color: 'var(--color-ink)' }}>Карта в разработке</p>
          <p className="font-sans text-sm" style={{ color: 'var(--color-stone)' }}>
            Здесь будут показаны все 15 объектов экскурсии на карте Москвы
          </p>
        </div>
      </section>
    </div>
  );
}

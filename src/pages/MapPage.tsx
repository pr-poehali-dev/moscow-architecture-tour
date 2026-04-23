import { OBJECTS, ROUTES } from '@/data/content';

const STYLE_COLORS: Record<string, string> = {
  baroque: '#8B1A1A',
  'mature-baroque': '#1C3557',
  classicism: '#2C5F2E',
};

export default function MapPage() {
  const allObjects = Object.values(OBJECTS);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-12">
        <p className="font-sans text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--color-stone)' }}>
          Навигация
        </p>
        <h1 className="font-serif text-5xl mb-4" style={{ color: 'var(--color-ink)', fontWeight: 400 }}>
          Интерактивная карта
        </h1>
        <p className="font-sans text-sm leading-relaxed max-w-2xl" style={{ color: 'var(--color-stone)' }}>
          На карте показаны все объекты экскурсии. Памятники сгруппированы по архитектурным маршрутам и обозначены цветом. Красный — барокко, синий — зрелое барокко, зелёный — классицизм.
        </p>
      </div>

      {/* Map placeholder */}
      <div
        className="w-full rounded-sm flex flex-col items-center justify-center mb-12"
        style={{ height: 480, backgroundColor: 'var(--color-parchment)', border: '1px dashed var(--color-stone)' }}
      >
        <div className="text-5xl mb-4">🗺️</div>
        <p className="font-serif text-2xl mb-2" style={{ color: 'var(--color-ink)' }}>Карта в разработке</p>
        <p className="font-sans text-sm text-center max-w-xs" style={{ color: 'var(--color-stone)' }}>
          Здесь появится интерактивная карта Москвы с маркерами всех 15 объектов экскурсии
        </p>
      </div>

      {/* Legend */}
      <div className="mb-10">
        <p className="font-sans text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--color-stone)' }}>
          Условные обозначения
        </p>
        <div className="flex flex-wrap gap-4">
          {ROUTES.map((r) => (
            <div key={r.id} className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: r.colorHex }} />
              <span className="font-sans text-sm" style={{ color: 'var(--color-ink)' }}>{r.title}</span>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border-2" style={{ borderColor: '#7A7268', backgroundColor: 'transparent' }} />
            <span className="font-sans text-sm" style={{ color: 'var(--color-ink)' }}>Утраченные объекты</span>
          </div>
        </div>
      </div>

      {/* Object list */}
      <div className="ornament mb-8">
        <span className="font-serif text-sm italic" style={{ color: 'var(--color-stone)' }}>Полный список объектов</span>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {allObjects.map((obj) => {
          const color = STYLE_COLORS[obj.styleId] || '#8B1A1A';
          return (
            <div
              key={obj.id}
              className="flex items-start gap-3 p-4"
              style={{ backgroundColor: 'var(--color-parchment)' }}
            >
              <div
                className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1.5"
                style={{ backgroundColor: obj.lost ? '#7A7268' : color }}
              />
              <div>
                <p className="font-sans text-sm font-medium leading-tight" style={{ color: 'var(--color-ink)' }}>
                  {obj.name}
                  {obj.lost && <span className="text-xs ml-1" style={{ color: '#7A7268' }}>(утрачен)</span>}
                </p>
                <p className="font-sans text-xs" style={{ color }}>
                  {obj.year}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

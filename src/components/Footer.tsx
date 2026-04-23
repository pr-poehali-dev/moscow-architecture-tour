type Section = 'home' | 'routes' | 'objects' | 'styles' | 'map' | 'about' | 'team' | 'bibliography';

interface FooterProps {
  onNavigate: (s: Section) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer
      className="mt-20 py-12 border-t"
      style={{
        borderColor: 'var(--color-parchment)',
        backgroundColor: 'var(--color-cream)',
      }}
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid sm:grid-cols-3 gap-8 mb-10">
          <div>
            <h3 className="font-serif text-xl mb-3" style={{ color: 'var(--color-ink)', fontWeight: 400 }}>
              Москва XVIII века
            </h3>
            <p className="font-sans text-xs leading-relaxed" style={{ color: 'var(--color-stone)' }}>
              Цифровая интерактивная экскурсия по архитектурным памятникам. Три маршрута, 15 объектов.
            </p>
          </div>
          <div>
            <p className="font-sans text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--color-stone)' }}>
              Маршруты
            </p>
            <ul className="space-y-1">
              {['Барокко', 'Зрелое барокко', 'Классицизм'].map((r) => (
                <li key={r}>
                  <button
                    onClick={() => onNavigate('routes')}
                    className="font-sans text-sm transition-opacity hover:opacity-60"
                    style={{ color: 'var(--color-ink)' }}
                  >
                    {r}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-sans text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--color-stone)' }}>
              Разделы
            </p>
            <ul className="space-y-1">
              {[
                { id: 'objects' as Section, label: 'Каталог объектов' },
                { id: 'styles' as Section, label: 'Архитектурные стили' },
                { id: 'map' as Section, label: 'Карта' },
                { id: 'about' as Section, label: 'О проекте' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className="font-sans text-sm transition-opacity hover:opacity-60"
                    style={{ color: 'var(--color-ink)' }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="ornament mb-6">
          <span />
        </div>
        <p className="font-sans text-xs text-center" style={{ color: 'var(--color-stone)' }}>
          © 2024 · Образовательный проект «Архитектурный облик Москвы XVIII века»
        </p>
      </div>
    </footer>
  );
}

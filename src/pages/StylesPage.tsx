import { STYLES } from '@/data/content';

export default function StylesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-16">
        <p className="font-sans text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--color-stone)' }}>
          Архитектуроведение
        </p>
        <h1 className="font-serif text-5xl mb-4" style={{ color: 'var(--color-ink)', fontWeight: 400 }}>
          Архитектурные стили
        </h1>
        <p className="font-sans text-sm leading-relaxed max-w-2xl" style={{ color: 'var(--color-stone)' }}>
          Архитектура Москвы XVIII века прошла путь от пышного барокко, унаследовавшего черты русского средневековья, до строгого классицизма эпохи Просвещения. Каждый стиль — отражение своего времени, своих политических и культурных идеалов.
        </p>
      </div>

      <div className="space-y-20">
        {STYLES.map((style, idx) => (
          <div key={style.id}>
            <div className="grid md:grid-cols-2 gap-10 items-start">
              {/* Text */}
              <div className={idx % 2 === 1 ? 'md:order-2' : ''}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full" style={{ backgroundColor: style.colorHex }} />
                  <div>
                    <p className="font-sans text-xs uppercase tracking-widest" style={{ color: style.colorHex }}>
                      {style.period}
                    </p>
                  </div>
                </div>
                <h2 className="font-serif text-4xl mb-4" style={{ color: 'var(--color-ink)', fontWeight: 400 }}>
                  {style.title}
                </h2>
                <p className="font-sans text-sm leading-relaxed mb-6" style={{ color: 'var(--color-stone)' }}>
                  {style.description}
                </p>

                <div className="mb-6">
                  <p className="font-sans text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--color-stone)' }}>
                    Характерные признаки
                  </p>
                  <ul className="space-y-2">
                    {style.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <div
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                          style={{ backgroundColor: style.colorHex }}
                        />
                        <span className="font-sans text-sm" style={{ color: 'var(--color-stone)' }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="font-sans text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--color-stone)' }}>
                    Примеры в Москве
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {style.examples.map((ex) => (
                      <span
                        key={ex}
                        className="font-sans text-xs px-3 py-1.5"
                        style={{ backgroundColor: 'var(--color-parchment)', color: 'var(--color-ink)', border: `1px solid ${style.colorHex}30` }}
                      >
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Visual placeholder */}
              <div
                className={`rounded-sm flex items-center justify-center ${idx % 2 === 1 ? 'md:order-1' : ''}`}
                style={{
                  height: 360,
                  backgroundColor: style.colorHex + '12',
                  border: `1px solid ${style.colorHex}30`,
                }}
              >
                <div className="text-center p-8">
                  <div className="font-serif text-8xl font-light mb-4" style={{ color: style.colorHex + '40' }}>
                    {idx === 0 ? 'Б' : idx === 1 ? 'ЗБ' : 'К'}
                  </div>
                  <p className="font-serif text-2xl italic mb-2" style={{ color: style.colorHex }}>
                    {style.title}
                  </p>
                  <p className="font-sans text-xs" style={{ color: 'var(--color-stone)' }}>
                    {style.period}
                  </p>
                </div>
              </div>
            </div>

            {idx < STYLES.length - 1 && (
              <div className="mt-20 ornament">
                <span />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
